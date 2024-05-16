import { getDataSource } from "@/database";
import { Category } from "@/database/entities";
import BlogContainer from "@/features/BlogContainer";
import styles from "./page.module.css";
import React from "react";
import ArticleGroup from "@/features/ArticleGroup";

const CatList = async () => {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Category);

  const result = await repo.find({
    relations: ["articles"],
    order: { articles: { createdAt: "DESC" } },
  });

  return (
    <BlogContainer>
      <div className={styles.catListWrapper}>
        <header>分类</header>
        <main className={styles.mainContainer}>
          {result.map((item) => (
            // 解决：Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
            <ArticleGroup
              item={JSON.parse(JSON.stringify(item))}
              key={item.id}
              type="cat"
            />
          ))}
        </main>
      </div>
    </BlogContainer>
  );
};

export default CatList;
