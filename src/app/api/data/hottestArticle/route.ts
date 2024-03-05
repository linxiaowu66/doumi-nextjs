import { getDataSource } from "@/database";
import { Article, Reader } from "@/database/entities";
import { NextResponse } from "next/server";

/**
 * 查询最近最热门的文章，最多可查7天
 */
export async function GET() {
  const AppDataSource = await getDataSource();
  const readerRepo = AppDataSource.getRepository(Reader);

  const reader = await readerRepo.find();

  const result: { slug: string; count: number }[] = [];

  reader.forEach((item: Reader) => {
    const index = result.findIndex((it) => it.slug === item.articleSlug);
    if (index !== -1) {
      result[index].count = result[index].count + item.ips.length;
    } else {
      result.push({ count: item.ips.length, slug: item.articleSlug });
    }
  });

  // 取出排名前10的文章
  const sortResult = result.sort((a, b) => b.count - a.count).slice(0, 9);

  const articleRepo = AppDataSource.getRepository(Article);

  const articles = await Promise.all(
    sortResult.map((it) => articleRepo.findOne({ where: { slug: it.slug } }))
  );

  const finalRes = sortResult.map((item, idx) => ({
    ...item,
    name: articles[idx]!.title,
  }));

  return NextResponse.json(finalRes);
}
