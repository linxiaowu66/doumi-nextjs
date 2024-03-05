"use client";
import React, { useState, useEffect } from "react";
import BlogItemCard from "@/features/BlogItemCard";
import BlogContainer from "@/features/BlogContainer";
import ReactMarkdown from "react-markdown";
import InfiniteScroll from "react-infinite-scroller";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import axios from "axios";
import { DouMiBlog } from "@/interface";
import "./page.css";

interface Prop {}

interface State {
  blogList: any[];
  pageCount: number;
  currentPage: number;
  isOpenSnackbar: boolean;
  snackbarMsg: string;
  blogContent: string;
}

const BlogAdmin: React.FC<Prop> = (props) => {
  const [blogList, setBlogList] = useState<State["blogList"]>([]);
  const [pageCount, setPageCount] = useState<State["pageCount"]>(1);
  const [currentPage, setCurrentPage] = useState<State["currentPage"]>(1);
  const [isOpenSnackbar, setIsOpenSnackbar] =
    useState<State["isOpenSnackbar"]>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<State["snackbarMsg"]>("");
  const [blogContent, setBlogContent] = useState<State["blogContent"]>("");

  const fetchBlogList = async (currentPage: number) => {
    const result = await axios.get<DouMiBlog.ArticleList>("/api/article", {
      params: {
        currentPage,
      },
    });
    if (result !== undefined) {
      setBlogList((prevBlogList) => [...prevBlogList, ...result.data.list]);
      setPageCount(result.data.pageCount);
      setCurrentPage(result.data.currentPage);
      if (result.data.list.length > 0 && +currentPage === 1) {
        setBlogContent(result.data.list[0].content);
      }
      return;
    }
    setIsOpenSnackbar(true);
    setSnackbarMsg("获取博客列表失败，请稍后重试");
  };

  const loadMore = async () => {
    await fetchBlogList(currentPage + 1);
  };

  const renderBlogItem = () => {
    return blogList.map((item) => (
      <BlogItemCard
        key={item.slug}
        {...item}
        onClick={() => setBlogContent(item.content)}
        onEdit={(slug: string) => {
          window.open(`${location.host}/admin/editor?slug=${slug}`);
        }}
      />
    ));
  };

  useEffect(() => {
    async function fetchData() {
      await fetchBlogList(currentPage);
    }
    fetchData();
  }, []);

  return (
    <BlogContainer
      isLogin
      contentClass="blog-admin-container"
      isOpenSnackbar={isOpenSnackbar}
      snackbarMsg={snackbarMsg}
    >
      <div className="blog-admin-wrapper">
        <section className="blog-list-container">
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
        </section>
        <section className="blog-content">
          <ReactMarkdown
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...(rest as any)}
                    PreTag="div"
                    language={match[1]}
                    style={atomDark}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
              a(props) {
                return (
                  <a href={props.href} target="__blank">
                    {props.children}
                  </a>
                );
              },
            }}
            className="blog-preview-text"
          >
            {blogContent}
          </ReactMarkdown>
        </section>
      </div>
    </BlogContainer>
  );
};

export default BlogAdmin;
