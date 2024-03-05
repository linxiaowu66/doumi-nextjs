import { getDataSource } from "@/database";
import { Archive } from "@/database/entities";
import { NextResponse } from "next/server";

export async function GET() {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Archive);

  const result = await repo.find({ relations: ["articles"] });

  return NextResponse.json(
    result
      .map((item) => ({
        id: item.id,
        archiveTime: item.archiveTime,
        name: "", // fix lint error
        articlesCount: item.articles.length,
      }))
      .sort(
        (a, b) =>
          new Date(b.archiveTime).getTime() - new Date(a.archiveTime).getTime()
      )
  );
}
