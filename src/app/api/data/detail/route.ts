import { getDataSource } from "@/database";
import { Website } from "@/database/entities";
import { pick } from "lodash-es";
import { NextResponse } from "next/server";

export async function GET() {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Website);

  const results = await repo.find();

  return results.map((item) => {
    const partial = pick(item, ["todayPv", "todayUv", "totalPv", "date"]);

    const pvGrowthRate = +(
      ((item.totalPv - item.yesterdayPv) / item.yesterdayPv) *
      100
    ).toFixed(2);
    const uvGrowthRate = +(
      ((item.totalUv - item.yesterdayUv) / item.yesterdayUv) *
      100
    ).toFixed(2);

    return NextResponse.json({
      ...partial,
      todayPv: +partial.todayPv,
      todayUv: +partial.todayUv,
      totalPv: +partial.totalPv, // 这里强转有精度丢失的风险，考虑到目前还不会达到那么大的数目
      pvGrowthRate,
      uvGrowthRate,
    });
  });
}
export const dynamic = "force-dynamic";
