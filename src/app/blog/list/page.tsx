"use client";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Backdrop, CircularProgress } from "@mui/material";
import BlogContainer from "@/features/BlogContainer";
import BlogItem from "@/features/BlogItem";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import BlogSummary from "@/features/BlogSummary";
import { DouMiBlog } from "@/interface";
import styles from "./page.module.css";

const initialState = {
  blogList: [],
  pageCount: 1,
  currentPage: 1,
  isOpenSnackbar: false,
  snackbarMsg: "",
  open: true,
  data: {
    totalPv: 0,
    commentsNum: 0,
    operationDays: "",
    articleCount: 0,
    articlesWordsNum: "",
  },
};

const BlogList = () => {
  const [blogList, setBlogList] = useState<
    { title: string; digest: string; slug: string; illustration: string }[]
  >(initialState.blogList);
  const [pageCount, setPageCount] = useState(initialState.pageCount);
  const [currentPage, setCurrentPage] = useState(initialState.currentPage);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(
    initialState.isOpenSnackbar
  );
  const [snackbarMsg, setSnackbarMsg] = useState(initialState.snackbarMsg);
  const [open, setOpen] = useState(initialState.open);

  const searchParams = useSearchParams();

  const fetchBlogList = async (currentPage: number) => {
    const queryArch = searchParams.get("queryArch");
    const queryCat = searchParams.get("queryCat");
    const queryTag = searchParams.get("queryTag");

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
      setOpen(false);

      if (currentPage === result.data.pageCount) {
        const top = window.localStorage.getItem("doumi-blog-list");
        if (top) {
          window.scrollTo({ top: +top, behavior: "smooth" });
        }
        window.addEventListener("scroll", bindScroll);
      }
      return;
    }
    setIsOpenSnackbar(true);
    setSnackbarMsg("获取列表失败，请稍后重试");
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
    <BlogContainer
      contentClass={styles.blogListWrapper}
      isOpenSnackbar={isOpenSnackbar}
      snackbarMsg={snackbarMsg}
    >
      {!open ? (
        <section
          className={styles.blogListContainer}
          //   ref={(ref) => (blogListContainer = ref)}
        >
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
      ) : (
        <Backdrop className="loading" open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </BlogContainer>
  );
};

export default BlogList;
