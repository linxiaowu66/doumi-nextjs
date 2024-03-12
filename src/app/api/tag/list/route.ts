import { getDataSource } from "@/database";
import { Tag } from "@/database/entities";
import { NextResponse } from "next/server";

export async function GET() {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Tag);

  const result = await repo.find({ relations: ["articles"] });

  return NextResponse.json(
    result.map((item) => ({
      id: item.id,
      name: item.name,
      articlesCount: item.articles.length,
    }))
  );
}
export const dynamic = "force-dynamic";
