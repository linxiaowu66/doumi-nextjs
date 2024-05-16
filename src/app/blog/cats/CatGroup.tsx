"use client";
import { Category } from "@/database/entities";
import dayjs from "dayjs";
import styles from "./page.module.css";
import { useState } from "react";

// eslint-disable-next-line max-len
const svgPath =
  "m39.4 0.2q0.7 0.6 0.6 1.5l-5.7 34.3q-0.1 0.6-0.7 1-0.4 0.1-0.7 0.1-0.3 0-0.6-0.1l-10.1-4.1-5.4 6.6q-0.4 0.5-1.1 0.5-0.3 0-0.5-0.1-0.4-0.1-0.7-0.5t-0.2-0.8v-7.8l19.3-23.7-23.9 20.7-8.8-3.6q-0.8-0.3-0.9-1.3 0-0.8 0.7-1.3l37.2-21.4q0.3-0.2 0.7-0.2 0.4 0 0.8 0.2z";

const CatGroup = (props: { item: Category }) => {
  const { item } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div key={item.id} className={styles.catGroup}>
      <header
        className={styles.catName}
        onClick={() => setIsOpen((pre) => !pre)}
      >
        <svg
          fill="currentColor"
          preserveAspectRatio="xMidYMid meet"
          height="1em"
          width="1em"
          viewBox="0 0 40 40"
          style={{ verticalAlign: "middle" }}
        >
          <g>
            <path d={svgPath} />
          </g>
        </svg>
        <span>{item.name}</span>
        <span className={styles.count}>{item.articles.length}篇</span>
      </header>
      <main
        className={
          isOpen ? `${styles.articleList} ${styles.open}` : styles.articleList
        }
      >
        {item.articles.map((article) => (
          <div key={article.id} className={styles.articleItem}>
            <span className={styles.articleTime}>
              {dayjs(new Date(article.createdAt)).format("YYYY-MM-DD")}
            </span>
            <span>{article.title}</span>
          </div>
        ))}
      </main>
    </div>
  );
};

export default CatGroup;
