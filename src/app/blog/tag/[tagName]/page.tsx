import { getDataSource } from "@/database";
import { Archive, Tag } from "@/database/entities";
import BlogContainer from "@/features/BlogContainer";
import styles from "./page.module.css";
import React from "react";
import ArticleGroup from "@/features/ArticleGroup";

interface Prop {
  params: {
    tagName: string;
  };
}

const SpecificTag: React.FC<Prop> = async (props) => {
  const { tagName } = props.params;
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Tag);

  const result = await repo.find({
    where: { name: tagName },
    relations: ["articles"],
    order: { articles: { createdAt: "DESC" } },
  });

  const formatResult = Object.values(
    result.reduce((acc: Record<string, Archive>, obj) => {
      const year = obj.createdAt.getFullYear();
      if (!acc[year]) {
        acc[year] = {
          archiveTime: year.toString(),
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
        <header>{tagName}</header>
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

export default SpecificTag;
