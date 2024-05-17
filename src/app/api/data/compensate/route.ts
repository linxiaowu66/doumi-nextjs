import { getDataSource } from "@/database";
import { Website } from "@/database/entities";
import { VisitCity } from "@/database/entities/visitcity";
import { syncWithVisitCitiesData } from "@/service/statistics";
import { NextResponse } from "next/server";

export async function GET() {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(VisitCity);

  const websiteRepo = AppDataSource.getRepository(Website);

  const results = await websiteRepo.find();

  for (let i = 0; i < results.length; i++) {
    for (let j = 0; j < results[i].todayIps.length; j++) {
      const ip = results[i].todayIps[j];
      await syncWithVisitCitiesData(ip);
    }
  }

  return NextResponse.json({
    message: "success",
  });
}
