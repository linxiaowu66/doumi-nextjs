import { Article } from "@/database/entities";

export const yAxisLabelFormatter = (isScale100: boolean) => (value: number) => {
  if (isScale100) {
    return value * 100;
  }
  return value >= 10000 ? `${value / 10000}万` : value;
};
export const tooltipPercent = (params: any) => {
  let relVal = params[0].name;
  params.forEach(({ marker, seriesName, value }: any) => {
    relVal += `<br/>${marker}${seriesName} : ${(value * 100).toFixed(2)}%`;
  });
  return relVal;
};

export const groupByYearsForArticle = (result: any) => {
  const formatResult: Record<
    string,
    { id: string; archiveTime: string; articles: Article[] }
  > = {};
  result.forEach((item: any) => {
    item.articles.forEach((article: Article) => {
      const year = article.createdAt.getFullYear().toString();
      if (!formatResult[year]) {
        formatResult[year] = { archiveTime: year, articles: [], id: year };
      }
      formatResult[year].articles.push(article);
    });
  });
  return Object.values(formatResult).sort(
    (
      a: { id: string; archiveTime: string; articles: Article[] },
      b: { id: string; archiveTime: string; articles: Article[] }
    ) => b.archiveTime.localeCompare(a.archiveTime)
  );
};
