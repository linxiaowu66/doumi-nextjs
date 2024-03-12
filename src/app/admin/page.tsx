import React from "react";
import BlogContainer from "@/features/BlogContainer";
import "./page.css";
import InfiniteList from "@/features/InfiniteList";
import { queryArticles } from "../api/article/route";
import BlogPreview from "@/features/BlogPreview";
import styles from "./index.module.css";

const BlogAdmin: React.FC<void> = async () => {
  const result = await queryArticles(1, 12);

  return (
    <BlogContainer isLogin contentClass="blog-admin-container">
      <div className="blog-admin-wrapper">
        <section className="blog-list-container">
          <InfiniteList initialPosts={result} isLogin />
        </section>
        <section className="blog-content">
          <BlogPreview
            content={result.list[0].content}
            className={styles.overflow}
          />
        </section>
      </div>
    </BlogContainer>
  );
};

export default BlogAdmin;
export const dynamic = "force-dynamic";
