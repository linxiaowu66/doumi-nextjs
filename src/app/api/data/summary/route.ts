import { getDataSource } from "@/database";
import { Article, Website } from "@/database/entities";
import { AwesomeHelp } from "awesome-js";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function GET() {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Website);

  const articleRepo = AppDataSource.getRepository(Article);

  const websiteSince = new Date(2016, 7, 8); // 博客开始时期

  const now = AwesomeHelp.convertDate(new Date(), "YYYY-MM-DD");

  const website = await repo.findOne({ where: { date: now } });
  const articles = await articleRepo.find();

  let articlesWordsNum = 0;
  articles.map((article) => (articlesWordsNum += article.content.length));

  const operationDays = dayjs().diff(websiteSince, "day");
  let totalPv = 0;

  if (website) {
    totalPv = website.totalPv;
  } else {
    const yesterday = new Date().getTime() - 24 * 3600 * 1000;
    const yes = AwesomeHelp.convertDate(new Date(yesterday), "YYYY-MM-DD");
    const otherWebsite = await repo.findOne({ where: { date: yes } });
    totalPv = otherWebsite!.totalPv;
  }
  return NextResponse.json({
    operationDays: `${operationDays}天`,
    totalPv: totalPv > 10000 ? `${(totalPv / 10000).toFixed(1)}万` : totalPv,
    articleCount: articles.length,
    articlesWordsNum:
      articlesWordsNum > 10000
        ? `${(articlesWordsNum / 10000).toFixed(1)}万`
        : articlesWordsNum,
    commentsNum: 1,
  });
}
