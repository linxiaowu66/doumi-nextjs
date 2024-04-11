import { getDataSource } from "@/database";
import {
  Archive,
  Article,
  ArticleStatus,
  Category,
  Tag,
  User,
} from "@/database/entities";
import {
  updateArticleStatictics,
  updateWebsiteStatistics,
} from "@/service/statistics";
import { DouMiBlog } from "@/interface";
import { logger } from "@/logger";
import { In } from "typeorm";

export async function getArticleDetail(
  slug: string,
  shouldBeUpdateStats = false
) {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Article);

  const result = await repo.findOne({
    where: { slug: slug as string },
    relations: ["tags", "archiveTime", "category", "author"],
  });

  if (!result) {
    throw new Error("找不到对应文章");
  }

  if (shouldBeUpdateStats) {
    await updateArticleStatictics(slug as string);
  }

  // 对该文章的pv数自增1
  result.pv = +result.pv + 1;

  await repo.save(result);

  return {
    ...result,
    tags: result.tags.map((it) => it.name),
    category: result.category.name,
    catId: result.category.id,
    archiveTime: result.fullArchiveTime,
    author: result.author.username,
  };
}
export const queryArticles = async (
  currentPage: number,
  pageSize: number,
  order?: string | null,
  queryTag?: string | null,
  queryArch?: string | null,
  queryCat?: string | null,
  articleStatus?: string | null
) => {
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
      const orderObject = JSON.parse(order);
      // 排序字段仅支持1个字段
      Object.keys(orderObject).forEach((item: string) => {
        orderField = `article.${item}`;
        orderDef = orderObject[item];
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
      where: { category: { id: +queryCat } },
    };
  } else if (queryArch) {
    whereQuery = {
      where: { archiveTime: { archiveTime: queryArch } },
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

  logger.info(`match the query result count: ${count}`);

  return {
    list: list.map((item) => ({
      ...item,
      tags: item.tags && item.tags.map((it) => it.name),
      category: item.category && item.category.name,
      archiveTime: item.fullArchiveTime,
      author: item.author.username,
    })),
    pageCount: Math.ceil(count / +pageSize),
    currentPage,
  };
};

export const createOrUpdateArticle = async (
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

  const loadTags = await tagRepo.find({ where: { name: In(tags) } });
  const loadCat = await catRepo.find({ where: { name: category } });
  const loadUser = await userRepo.find({ where: { email: username } });
  let loadArch = await archiveRepo.findOne({
    where: {
      archiveTime: archiveTime.substr(0, 7),
    },
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
    articleIns = await repo.findOne({ where: { slug: article.slug } });

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
