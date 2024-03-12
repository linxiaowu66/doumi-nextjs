import { getDataSource } from "@/database";
import { Article } from "@/database/entities";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// 查询文字标题或者内容包含关键词的文章
export async function GET(req: NextRequest) {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Article);
  const keyword = req.nextUrl.searchParams.get("keyword");

  const result = await repo
    .createQueryBuilder("article")
    .where("article.title like :title", { title: `%${keyword}%` })
    .orWhere("article.content like :content", { content: `%${keyword}%` })
    .getMany();

  return NextResponse.json(result);
}
export const dynamic = "force-dynamic";
