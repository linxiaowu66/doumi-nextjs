import { AwesomeHelp } from "awesome-js";
import parser from "xml2js";
import { headers } from "next/headers";
import { getDataSource } from "@/database";
import { Archive, Reader, Tag, Website } from "@/database/entities";
import { logger } from "@/logger";
import dayjs from "dayjs";
import { MoreThanOrEqual } from "typeorm";
import { Category } from "@/database/entities";
import { VisitCity } from "@/database/entities/visitcity";

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

  await syncWithVisitCitiesData(reqIp);

  // create a new query runner
  const queryRunner = AppDataSource.createQueryRunner();

  // establish real database connection using our new query runner
  await queryRunner.connect();

  // now we can execute any queries on a query runner, for example:
  const website = await queryRunner.manager.findOne(Website, {
    where: { date: now },
  });

  // lets now open a new transaction:
  await queryRunner.startTransaction();

  // 避免并发操作
  logger.info(
    `${reqIp} visit and the record of website is exist? ${website?.id}`
  );

  try {
    if (website) {
      if (!website.todayIps.includes(reqIp)) {
        website.todayIps.push(reqIp);
        website.todayPv = +website.todayPv + 1;
        website.todayUv = +website.todayUv + 1;
      } else {
        website.todayPv = +website.todayPv + 1;
      }
      await queryRunner.manager.update(Website, website.id, website);
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
      await queryRunner.manager.save(Website, newData);
    }

    // commit transaction now:
    await queryRunner.commitTransaction();
  } catch (err) {
    // since we have errors let's rollback changes we made
    await queryRunner.rollbackTransaction();
  } finally {
    // you need to release query runner which is manually created:
    await queryRunner.release();
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

export async function fetchWebsiteStatistics() {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Website);
  const archiveRepo = AppDataSource.getRepository(Archive);
  const catRepo = AppDataSource.getRepository(Category);
  const tagRepo = AppDataSource.getRepository(Tag);
  const visitCityRepo = AppDataSource.getRepository(VisitCity);

  const [results, archiveResult, catRes, tagRes, visitCities] =
    await Promise.all([
      repo.find({
        where: {
          // 查询最近7天的数据
          createdAt: MoreThanOrEqual(dayjs().subtract(15, "day").toDate()),
        },
      }),
      archiveRepo.find({
        where: {
          // 查询最近一年的数据
          createdAt: MoreThanOrEqual(dayjs().subtract(365, "day").toDate()),
        },
        relations: ["articles"],
      }),
      catRepo.find({ relations: ["articles"] }),
      // 查询tag最多的前十个
      tagRepo.find({ relations: ["articles"] }),
      visitCityRepo.find(),
    ]);

  return {
    visitCities: visitCities.map((item) => ({
      name: item.cityName,
      value: item.count,
    })),
    visitData: results,
    catData: catRes.map((item) => ({
      id: item.id,
      name: item.name,
      value: item.articles.length,
    })),
    archiveData: archiveResult
      .map((item) => ({
        id: item.id,
        archiveTime: item.archiveTime,
        name: "", // fix lint error
        articlesCount: item.articles.length,
      }))
      .sort(
        (a, b) =>
          new Date(a.archiveTime).getTime() - new Date(b.archiveTime).getTime()
      ),
    tagData: tagRes
      .map((item) => ({
        id: item.id,
        name: item.name,
        value: item.articles.length,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6),
  };
}

export async function syncWithVisitCitiesData(ip: string) {
  if (ip.includes("::1") || ip.includes("localhost") || ip.includes("127")) {
    return;
  }
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(VisitCity);
  const res = await fetch(
    `https://restapi.amap.com/v3/ip?ip=${ip}&output=xml&key=${process.env.AMAP_KEY}`
  );

  const text = await res.text();

  await parser.parseStringPromise(text, { explicitArray: false }).then(
    async (data: {
      response: {
        status: string;
        info: string;
        infocode: string;
        province: string;
        city: string;
        adcode: string;
        rectangle: string;
      };
    }) => {
      if (data.response && data.response.city) {
        logger.info(`[statService]: ${ip} visit from ${data.response.city}`);
        const matchRecord = await repo.findOne({
          where: { cityName: data.response.city },
        });

        if (matchRecord) {
          matchRecord.count++;
          await repo.save(matchRecord);
        } else {
          const newRecord = new VisitCity();
          newRecord.cityName = data.response.city;
          newRecord.count = 1;
          await repo.save(newRecord);
        }
      }
    }
  );
}
