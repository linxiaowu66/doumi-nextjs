"use client";
import { DouMiBlog } from "@/interface";
import { Pagination } from "@mui/material";
import { useState } from "react";
import BlogItem from "../BlogItem";
import axios from "axios";
import styles from "./index.module.css";

export default function BlogPagination({
  initialPosts,
  queryArch,
  queryCat,
  queryTag,
}: {
  initialPosts: {
    list: DouMiBlog.ArticleBrief[];
    currentPage: number;
    pageCount: number;
  };
  isLogin?: boolean;
  queryArch?: string | null;
  queryCat?: string | null;
  queryTag?: string | null;
}) {
  const [blogList, setBlogList] = useState<DouMiBlog.ArticleBrief[]>(
    initialPosts.list
  );
  const [pageCount, setPageCount] = useState(initialPosts.pageCount);
  const [currentPage, setCurrentPage] = useState(initialPosts.currentPage);

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const result = await axios.get<DouMiBlog.ArticleList>("/api/article", {
      params: {
        currentPage: value,
        pageSize: 6,
        queryArch,
        queryCat,
        queryTag,
        articleStatus: "published",
      },
    });
    if (result !== undefined) {
      setBlogList(result.data.list);
      setPageCount(result.data.pageCount);
      setCurrentPage(result.data.currentPage);

      return;
    }
  };

  return (
    <>
      <section className={styles.blogListContainer}>
        {blogList.map((item) => (
          <BlogItem key={item.slug} {...item} />
        ))}
      </section>
      <div className={styles.pagination}>
        <Pagination
          count={pageCount}
          color="standard"
          onChange={handleChange}
        />
      </div>
    </>
  );
}
