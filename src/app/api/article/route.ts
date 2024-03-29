import { Article } from "@/database/entities";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { createOrUpdateArticle, queryArticles } from "@/service/article";
import { logger } from "@/logger";

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

  const res = await queryArticles(
    +currentPage,
    +pageSize,
    order,
    queryTag,
    queryArch,
    queryCat,
    articleStatus
  );

  return NextResponse.json(res);
}

// 新建文章
export async function POST(request: NextRequest) {
  const article = await request.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      status: 0,
      data: {
        msg: "请先登录",
      },
    });
  }
  try {
    const result = await createOrUpdateArticle(article, session.user.email);

    return NextResponse.json({
      status: 1,
      data: {
        msg: article.articleStatus === "draft" ? "保存草稿成功" : "发布成功",
        slug: (result as Article).slug,
      },
    });
  } catch (err) {
    logger.error(`新建【${article?.title}】文章失败，${err}`);
    return NextResponse.json({
      status: 0,
      data: null,
      message: "新建文章失败",
    });
  }
}

// 编辑文章
export async function PUT(request: NextRequest) {
  const article = await request.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      status: 0,
      data: {
        msg: "请先登录",
      },
    });
  }

  try {
    await createOrUpdateArticle(article, session.user.email, true);

    return NextResponse.json({
      status: 1,
      data: {
        msg:
          article.articleStatus === "draft" ? "更新草稿成功" : "更新发布成功",
      },
    });
  } catch (err) {
    logger.error(`更新【${article?.title}】文章失败，${err}`);
    return NextResponse.json({
      status: 0,
      data: null,
      message: "更新文章失败",
    });
  }
}

export const dynamic = "force-dynamic";
