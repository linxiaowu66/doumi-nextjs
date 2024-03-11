"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import { DouMiBlog } from "@/interface";
import BlogItemCard from "../BlogItemCard";
import BlogItem from "../BlogItem";
import { useAppDispatch } from "@/lib/hooks";
import { setContent } from "@/lib/features/admin/adminSlice";

export default function InfiniteList({
  initialPosts,
  queryArch,
  queryCat,
  queryTag,
  isLogin = false,
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
  const [selectedArticle, setSelectedArticle] = useState<string>(
    initialPosts.list[0].slug
  );
  const dispatch = useAppDispatch();

  const fetchBlogList = async (currentPage: number) => {
    const result = await axios.get<DouMiBlog.ArticleList>("/api/article", {
      params: {
        currentPage,
        pageSize: 12,
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
    return blogList.map((item) => {
      return isLogin ? (
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
      ) : (
        <BlogItem key={item.slug} {...item} />
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
