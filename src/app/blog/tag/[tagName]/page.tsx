import { getDataSource } from "@/database";
import { Archive, Article, ArticleStatus, Tag } from "@/database/entities";
import BlogContainer from "@/features/BlogContainer";
import styles from "./page.module.css";
import React from "react";
import ArticleGroup from "@/features/ArticleGroup";
import { groupByYearsForArticle } from "@/utils";

interface Prop {
  params: {
    tagName: string;
  };
}

const SpecificTag: React.FC<Prop> = async (props) => {
  const { tagName } = props.params;
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Tag);

  const decodeName = decodeURIComponent(decodeURIComponent(tagName));

  const result = await repo.find({
    where: {
      name: decodeName,
      articles: { articleStatus: ArticleStatus.PUBLISHED },
    },
    relations: ["articles"],
    order: { articles: { createdAt: "DESC" } },
  });

  const formatResult = groupByYearsForArticle(result);

  return (
    <BlogContainer>
      <div className={styles.catListWrapper}>
        <header className={styles.title}>{decodeName}</header>
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
