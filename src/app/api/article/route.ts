import { getDataSource } from "@/database";
import { Archive, Article, Category, Tag, User } from "@/database/entities";
import { DouMiBlog } from "@/interface";
import { logger } from "@/logger";
import { updateWebsiteStatistics } from "@/service/statistics";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// 查询所有文章列表
// 支持查询最热门的文章：
/**
 * (1, limit, {
      pv: 'DESC'
    })
 */
export async function GET(request: NextRequest) {
  const order = request.nextUrl.searchParams.get("order");
  const currentPage = request.nextUrl.searchParams.get("currentPage") || 1;
  const pageSize = request.nextUrl.searchParams.get("pageSize") || 10;
  const queryTag = request.nextUrl.searchParams.get("queryTag");
  const queryCat = request.nextUrl.searchParams.get("queryCat");
  const queryArch = request.nextUrl.searchParams.get("queryArch");
  const articleStatus = request.nextUrl.searchParams.get("articleStatus");
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Article);

  const baseQuery = {
    order: order
      ? (JSON.parse(order) as {})
      : {
          createdAt: "DESC",
        },
    take: +pageSize,
    skip: (+currentPage - 1) * +pageSize, // think this needs to be page * limit
    relations: ["tags", "archiveTime", "category", "author"],
  };

  let whereQuery = {};
  let list: Article[] = [];
  let count = 0;

  if (currentPage === 1) {
    await updateWebsiteStatistics();
  }

  if (queryTag) {
    // 多对多的关系比较特殊，find不能不满足需求
    let orderField = "article.createdAt";
    let orderDef: "ASC" | "DESC" = "DESC";
    if (order) {
      // 排序字段仅支持1个字段
      Object.keys(order).forEach((item) => {
        orderField = `article.${item}`;
        orderDef = order[item];
      });
    }
    const queryBuilder = repo.createQueryBuilder("article");
    if (articleStatus) {
      queryBuilder.where("article.articleStatus = :status", {
        status: articleStatus,
      });
    }
    [list, count] = await queryBuilder
      .innerJoin("article.tags", "tag", "tag.id IN (:...tagId)", {
        tagId: queryTag,
      })
      .skip((+currentPage - 1) * +pageSize)
      .take(+pageSize)
      .orderBy(orderField, orderDef)
      .innerJoinAndSelect("article.tags", "tags")
      .innerJoinAndSelect("article.category", "category")
      .innerJoinAndSelect("article.archiveTime", "archiveTime")
      .innerJoinAndSelect("article.author", "author")
      .getManyAndCount();
  } else if (queryCat) {
    whereQuery = {
      where: { category: queryCat },
    };
  } else if (queryArch) {
    whereQuery = {
      where: { archiveTime: queryArch },
    };
  }
  if (articleStatus) {
    whereQuery = {
      where: {
        ...(whereQuery as any).where,
        articleStatus: articleStatus,
      },
    };
  }

  const finalQuery = { ...baseQuery, ...whereQuery };

  logger.info(
    `search blog list with query condition: ${JSON.stringify(finalQuery)}`
  );

  if (!queryTag) {
    [list, count] = await repo.findAndCount(finalQuery);
  }

  const res = {
    list: list.map((item) => ({
      ...item,
      tags: item.tags.map((it) => it.name),
      category: item.category.name,
      archiveTime: item.fullArchiveTime,
      author: item.author.username,
    })),
    pageCount: Math.ceil(count / +pageSize),
    currentPage,
  };
  return NextResponse.json(res);
}

// 新建文章
export async function POST(request: NextRequest, response: NextResponse) {
  const article = await request.json();
  const session = await getServerSession(request, response, authOptions);
  console.log(session);
  const result = await createOrUpdateArticle(
    article,
    "linxiaowu" // TODO: 从session中获取
  );

  return NextResponse.json({
    status: 1,
    data: {
      msg: article.articleStatus === "draft" ? "保存草稿成功" : "发布成功",
      slug: (result as Article).slug,
    },
  });
}

// 编辑文章
export async function PATCH(request: NextRequest) {
  const article = await request.json();
  await createOrUpdateArticle(article, "linxiaowu", true);

  return NextResponse.json({
    status: 1,
    data: {
      msg: article.articleStatus === "draft" ? "更新草稿成功" : "更新发布成功",
    },
  });
}

const createOrUpdateArticle = async (
  article: DouMiBlog.ArticleDetail,
  username: string,
  isUpdate = false
) => {
  const { tags, category, archiveTime } = article;
  const AppDataSource = await getDataSource();

  const tagRepo = AppDataSource.getRepository(Tag);
  const catRepo = AppDataSource.getRepository(Category);
  const archiveRepo = AppDataSource.getRepository(Archive);
  const userRepo = AppDataSource.getRepository(User);

  const loadTags = await tagRepo.find({ name: In(tags) });
  const loadCat = await catRepo.find({ name: category });
  const loadUser = await userRepo.find({ email: username });
  let loadArch = await archiveRepo.findOne({
    archiveTime: archiveTime.substr(0, 7),
  });
  const repo = AppDataSource.getRepository(Article);

  if (!loadArch) {
    loadArch = new Archive();
    loadArch.archiveTime = archiveTime.substr(0, 7);

    await archiveRepo.save(loadArch);
  }

  let articleIns;
  if (!isUpdate) {
    articleIns = new Article();
  } else {
    articleIns = await repo.findOne({ slug: article.slug });

    if (!articleIns) {
      throw new Error("对应博文不存在，请重新确认");
    }
  }
  articleIns.archiveTime = loadArch;
  articleIns.fullArchiveTime = archiveTime;
  articleIns.tags = loadTags;
  articleIns.category = loadCat[0];
  articleIns.articleStatus = article.articleStatus as ArticleStatus;
  articleIns.content = article.content.replace(
    /http:\/\/blogimages2016/g,
    "https://blogimages2016"
  );
  articleIns.digest = article.digest;
  articleIns.illustration = article.illustration.replace(
    /http:\/\//,
    "https://"
  );
  articleIns.title = article.title;
  articleIns.author = loadUser[0];

  if (!isUpdate) {
    articleIns.slug = Date.now().toString();
    articleIns.pv = 0;
  } else {
    articleIns.slug = article.slug;
  }

  const result = await repo.save(articleIns);

  // 这里不能用update!https://github.com/typeorm/typeorm/issues/4197
  // if (!isUpdate) {
  // result = await repo.save(articleIns)
  // } else {
  //   result = await repo.update({ slug: article.slug }, articleIns)
  // }
  return result;
};
