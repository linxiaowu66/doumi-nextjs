"use client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import { DouMiBlog } from "@/interface";
import BlogItemCard from "../BlogItemCard";
import { useAppDispatch } from "@/lib/hooks";
import { setContent } from "@/lib/features/admin/adminSlice";

export default function InfiniteList({
  initialPosts,
}: {
  initialPosts: {
    list: DouMiBlog.ArticleBrief[];
    currentPage: number;
    pageCount: number;
  };
}) {
  const [blogList, setBlogList] = useState<DouMiBlog.ArticleBrief[]>(
    initialPosts.list
  );
  const [pageCount, setPageCount] = useState(initialPosts.pageCount);
  const [currentPage, setCurrentPage] = useState(initialPosts.currentPage);
  const [selectedArticle, setSelectedArticle] = useState<string>(
    initialPosts.list[0].slug
  );
  const dispatch = useAppDispatch();

  const fetchBlogList = async (currentPage: number) => {
    const result = await axios.get<DouMiBlog.ArticleList>("/api/article", {
      params: {
        currentPage,
        pageSize: 12,
      },
    });
    if (result !== undefined) {
      setBlogList([...blogList, ...result.data.list]);
      setPageCount(result.data.pageCount);
      setCurrentPage(result.data.currentPage);

      return;
    }
  };

  const loadMore = async () => {
    // 这里的loadMore貌似没有什么作用，页面加载好了之后会一次性拉取所有的数据！

    await fetchBlogList(+currentPage + 1);
  };

  const renderBlogItem = () => {
    return blogList.map((item) => {
      return (
        <BlogItemCard
          key={item.slug}
          {...item}
          selectedArticle={selectedArticle}
          onClick={() => {
            setSelectedArticle(item.slug);
            dispatch(setContent({ articleContent: item.content }));
          }}
          onEdit={(slug: string) => {
            window.open(`${location.origin}/admin/editor?slug=${slug}`);
          }}
        />
      );
    });
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
