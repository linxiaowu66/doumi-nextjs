import { getDataSource } from "@/database";
import { Website } from "@/database/entities";
import { syncWithVisitCitiesData } from "@/service/statistics";
import { NextResponse } from "next/server";

// 数据补偿
export async function GET() {
  // 数据补偿完成，注释掉~
  // const AppDataSource = await getDataSource();

  // const websiteRepo = AppDataSource.getRepository(Website);

  // const results = await websiteRepo.find();

  // for (let i = 0; i < results.length; i++) {
  //   for (let j = 0; j < results[i].todayIps.length; j++) {
  //     const ip = results[i].todayIps[j];
  //     await syncWithVisitCitiesData(ip);
  //   }
  // }

  return NextResponse.json({
    message: "success",
  });
}
export const dynamic = "force-dynamic";
