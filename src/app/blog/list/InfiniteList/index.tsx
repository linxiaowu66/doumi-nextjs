"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import BlogItem from "@/features/BlogItem";
import axios from "axios";
import { DouMiBlog } from "@/interface";

export default function InfiniteList({
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
  queryArch: string | null;
  queryCat: string | null;
  queryTag: string | null;
}) {
  const [blogList, setBlogList] = useState<
    { title: string; digest: string; slug: string; illustration: string }[]
  >(initialPosts.list);
  const [pageCount, setPageCount] = useState(initialPosts.pageCount);
  const [currentPage, setCurrentPage] = useState(initialPosts.currentPage);

  const fetchBlogList = async (currentPage: number) => {
    const result = await axios.get<DouMiBlog.ArticleList>("/api/article", {
      params: {
        currentPage,
        queryArch,
        queryCat,
        queryTag,
        articleStatus: "published",
      },
    });
    if (result !== undefined) {
      setBlogList([...blogList, ...result.data.list]);
      setPageCount(result.data.pageCount);
      setCurrentPage(result.data.currentPage);

      if (currentPage === result.data.pageCount) {
        const top = window.localStorage.getItem("doumi-blog-list");
        if (top) {
          window.scrollTo({ top: +top, behavior: "smooth" });
        }
        window.addEventListener("scroll", bindScroll);
      }
      return;
    }
  };

  const initData = async () => {
    await fetchBlogList(currentPage);
  };

  const bindScroll = (event: any) => {
    // 滚动的高度
    const scrollTop = event.srcElement.documentElement.scrollTop;
    window.localStorage.setItem("doumi-blog-list", scrollTop);
  };

  useEffect(() => {
    initData();
    return () => {
      window.removeEventListener("scroll", bindScroll);
    };
  }, []);

  const loadMore = async () => {
    // 这里的loadMore貌似没有什么作用，页面加载好了之后会一次性拉取所有的数据！

    await fetchBlogList(+currentPage + 1);
  };

  const renderBlogItem = () => {
    return blogList.map((item) => (
      <BlogItem
        key={item.slug}
        title={item.title}
        mediaUrl={item.illustration}
        slug={item.slug}
        digest={item.digest}
      />
    ));
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={currentPage < pageCount}
      loader={
        <div className="loader" key={0}>
          努力加载中 ...
        </div>
      }
      useWindow={false}
    >
      {renderBlogItem()}
    </InfiniteScroll>
  );
}
