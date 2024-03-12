import { NextResponse } from "next/server";
import { getDataSource } from "@/database";
import { Category } from "@/database/entities";

export async function GET() {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Category);

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
