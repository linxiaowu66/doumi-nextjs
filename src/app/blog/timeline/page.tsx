import { getDataSource } from "@/database";
import { Archive } from "@/database/entities";
import BlogContainer from "@/features/BlogContainer";
import styles from "./page.module.css";
import React from "react";
import ArticleGroup from "@/features/ArticleGroup";

const ArchiveList = async () => {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Archive);

  const result = await repo.find({
    relations: ["articles"],
    order: { createdAt: "DESC", articles: { createdAt: "DESC" } },
  });

  const formatResult = Object.values(
    result.reduce((acc: Record<string, Archive>, obj) => {
      const year = obj.archiveTime.split("-")[0];
      if (!acc[year]) {
        acc[year] = {
          archiveTime: year,
          articles: [],
          id: +year,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
      acc[year].articles.push(...obj.articles);
      return acc;
    }, {})
  ).sort((a: Archive, b: Archive) =>
    b.archiveTime.localeCompare(a.archiveTime)
  );

  return (
    <BlogContainer>
      <div className={styles.catListWrapper}>
        <header className={styles.title}>时间线</header>
        <main className={styles.mainContainer}>
          {formatResult.map((item) => (
            // 解决：Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
            <ArticleGroup
              item={JSON.parse(JSON.stringify(item))}
              key={item.id}
              type="archive"
            />
          ))}
        </main>
      </div>
    </BlogContainer>
  );
};

export default ArchiveList;
