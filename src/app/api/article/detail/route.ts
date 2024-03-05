import { getDataSource } from "@/database";
import { Article } from "@/database/entities";
import { updateArticleStatictics } from "@/service/statistics";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Article);
  const slug = req.nextUrl.searchParams.get("slug");
  const shouldBeUpdateStats = req.nextUrl.searchParams.get(
    "shouldBeUpdateStats"
  );

  if (!slug) {
    return NextResponse.json({ code: 400, message: "缺少参数", data: null });
  }

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

  return NextResponse.json({
    code: 200,
    data: {
      ...result,
      tags: result.tags.map((it) => it.name),
      category: result.category.name,
      catId: result.category.id,
      archiveTime: result.fullArchiveTime,
      author: result.author.username,
    },
    message: "",
  });
}
