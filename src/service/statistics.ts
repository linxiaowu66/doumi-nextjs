import { AwesomeHelp } from "awesome-js";
import { headers } from "next/headers";
import { getDataSource } from "@/database";
import { Reader, Website } from "@/database/entities";
import { logger } from "@/logger";
import dayjs from "dayjs";

export const updateArticleStatictics = async (slug: string) => {
  const header = headers();
  const reqIp = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
  const now = AwesomeHelp.convertDate(new Date(), "YYYY-MM-DD");
  const AppDataSource = await getDataSource();
  const readerRepo = AppDataSource.getRepository(Reader);

  // 现根据日期查找，如果没有任何该日期的条目，就表示需要删除7天之外的数据
  const hasTodayItems = await readerRepo.find({ where: { date: now } });

  if (!hasTodayItems.length) {
    const beyond7Days = new Date().getTime() - 7 * 24 * 3600 * 1000;
    const results = await readerRepo.find({
      where: {
        date: AwesomeHelp.convertDate(new Date(beyond7Days), "YYYY-MM-DD"),
      },
    });
    if (results.length) {
      await readerRepo.delete(results.map((it) => it.id));
    }
  }

  const reader = await readerRepo.findOne({
    where: { date: now, articleSlug: slug },
  });

  if (reader) {
    if (!reader.ips.includes(reqIp)) {
      reader.ips.push(reqIp);
      readerRepo.save(reader);
    }
  } else {
    const newReader = new Reader();
    newReader.articleSlug = slug;
    newReader.date = now;
    newReader.ips = [reqIp];
    readerRepo.save(newReader);
  }

  await updateWebsiteStatistics();
};

export const updateWebsiteStatistics = async () => {
  const header = headers();
  const reqIp = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

  if (!reqIp) {
    logger.info("[statService]: can not get client ip, ignore it!");
    return;
  }
  const AppDataSource = await getDataSource();
  const now = AwesomeHelp.convertDate(new Date(), "YYYY-MM-DD");

  const repo = AppDataSource.getRepository(Website);

  // 查找数据库中是否存在今天的数据
  // TODO: 从这里到后面的新建表如何控制并发，目前出现过0点的同时有访问过来，导致多创建了同日期的一行数据
  const website = await repo.findOne({ where: { date: now } });

  if (website) {
    if (!website.todayIps.includes(reqIp)) {
      website.todayIps.push(reqIp);
      website.todayPv = +website.todayPv + 1;
      website.todayUv = +website.todayUv + 1;
    } else {
      website.todayPv = +website.todayPv + 1;
    }
    repo.save(website);
  } else {
    const newData = new Website();
    newData.todayIps = [reqIp];
    newData.todayPv = 1;
    newData.todayUv = 1;
    // 历史数据初始化，忽略即可
    newData.yesterdayPv = 0;
    newData.yesterdayUv = 0;
    newData.totalPv = 0;
    newData.totalUv = 0;
    newData.date = now;
    await repo.save(newData);
  }
};

export async function getWebsiteSummaryData() {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Website);

  const websiteSince = new Date(2016, 7, 8); // 博客开始时期

  const operationDays = dayjs().diff(websiteSince, "day");
  const totalPv = await repo
    .createQueryBuilder("website")
    .select("SUM(todayPv)", "sum")
    .getRawOne();
  const totalUv = await repo
    .createQueryBuilder("website")
    .select("SUM(todayUv)", "sum")
    .getRawOne();

  return {
    operationDays: `${operationDays}天`,
    totalPv: totalPv.sum,
    totalUv: totalUv.sum,
  };
}
