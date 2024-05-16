import { getDataSource } from "@/database";
import { Tag } from "@/database/entities";
import BlogContainer from "@/features/BlogContainer";
import styles from "./page.module.css";
import React from "react";
import Link from "next/link";

const TagList = async () => {
  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Tag);

  const result = await repo.find();

  // eslint-disable-next-line max-len
  const svgPath =
    "m22.1 22.9l1.5-5.8h-5.7l-1.4 5.8h5.6z m17.2-11.3l-1.3 5q-0.1 0.5-0.7 0.5h-7.3l-1.4 5.8h6.9q0.4 0 0.6 0.2 0.2 0.3 0.1 0.7l-1.2 5q-0.1 0.5-0.7 0.5h-7.3l-1.8 7.3q-0.2 0.5-0.7 0.5h-5q-0.4 0-0.6-0.2-0.2-0.3-0.1-0.6l1.7-7h-5.7l-1.8 7.3q-0.1 0.5-0.7 0.5h-5q-0.3 0-0.5-0.2-0.2-0.3-0.2-0.6l1.8-7h-7q-0.3 0-0.5-0.3-0.2-0.2-0.2-0.6l1.3-5q0.1-0.5 0.7-0.5h7.3l1.4-5.8h-6.9q-0.4 0-0.6-0.2-0.2-0.3-0.1-0.6l1.2-5q0.1-0.6 0.7-0.6h7.3l1.8-7.3q0.2-0.5 0.7-0.5h5q0.4 0 0.6 0.2 0.2 0.3 0.1 0.7l-1.7 6.9h5.7l1.8-7.3q0.1-0.5 0.7-0.5h5q0.3 0 0.5 0.2 0.2 0.3 0.2 0.7l-1.8 6.9h7q0.3 0 0.5 0.3 0.2 0.3 0.2 0.6z";

  return (
    <BlogContainer>
      <div className={styles.tagListWrapper}>
        <header className={styles.title}>标签</header>
        <main className={styles.mainContainer}>
          {result.map((item) => (
            <div key={item.id} className={styles.tagItem}>
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
              <Link href={`/blog/tag/${encodeURIComponent(item.name)}`}>
                {item.name}
              </Link>
            </div>
          ))}
        </main>
      </div>
    </BlogContainer>
  );
};

export default TagList;
