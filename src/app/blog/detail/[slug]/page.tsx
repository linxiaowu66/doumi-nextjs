"use client";
import React, { useState, useEffect } from "react";
import { CircularProgress, Backdrop } from "@mui/material";
import {
  CalendarToday,
  Update,
  Category,
  FavoriteBorder,
  DescriptionOutlined,
} from "@mui/icons-material";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import Catalog from "progress-catalog";
import BlogContainer from "@/features/BlogContainer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "progress-catalog/src/progress-catalog.css";
import Image from "next/image";
import { useParams } from "next/navigation";
import "./page.css";
import axios from "axios";

interface Prop {
  match: {
    params: {
      slug: string;
    };
  };
}

interface State {
  open: boolean;
  isOpenSnackbar: boolean;
  snackbarMsg: string;
  slug: string;
  response: any; // Adjust type accordingly
}

const BlogDetail: React.FC<Prop> = (props) => {
  const params = useParams<{ slug: string }>();
  const [state, setState] = useState<State>({
    open: true,
    isOpenSnackbar: false,
    snackbarMsg: "",
    slug: "",
    response: null,
  });

  const fetchArticleDetail = async (slug: string) => {
    try {
      const response = await axios.get("/api/article/detail", {
        params: { slug, shouldBeUpdateStats: true },
      });
      setState({
        ...state,
        response: response.data.data,
        open: false,
        slug,
      });
    } catch (err) {
      console.error(err);
      setState({
        ...state,
        isOpenSnackbar: true,
        snackbarMsg: "获取博文详情失败，请稍后再试",
        open: false,
      });
    }
  };

  useEffect(() => {
    const slug = params.slug;
    fetchArticleDetail(slug);
    setTimeout(() => {
      new Catalog({
        contentEl: "blog-detail",
        catalogEl: "catalog-content-wrapper",
        selector: ["h2", "h3", "h4", "h5"],
        topMargin: 70,
      });
    }, 1000);
  }, [params]);

  const handleJumpToList = (catId: number) => {
    location.hash = `/blog/list?queryCat=${catId}`;
  };

  const { response, open, isOpenSnackbar, snackbarMsg } = state;

  return (
    <BlogContainer
      contentClass="blog-detail-wrapper"
      isOpenSnackbar={isOpenSnackbar}
      snackbarMsg={snackbarMsg}
    >
      {response ? (
        <>
          <h1>{response.title}</h1>
          <section className="blog-info">
            <div className="info-item">
              <CalendarToday className="icon" />
              <span>
                发表于{" "}
                {dayjs(new Date(response.createdAt)).format("YYYY-MM-DD")}
              </span>
            </div>
            <div className="info-item">
              <Update className="icon" />
              <span>
                更新于{" "}
                {dayjs(new Date(response.updatedAt)).format("YYYY-MM-DD")}
              </span>
            </div>
            <div className="info-item">
              <Category className="icon" />
              <span>
                分类于{" "}
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => handleJumpToList(response.catId)}
                >
                  {response.category}
                </span>
              </span>
            </div>
            <div className="info-item">
              <FavoriteBorder className="icon" />
              <span>阅读量 {response.pv}</span>
            </div>
            <div className="info-item">
              <DescriptionOutlined className="icon" />
              <span>字数统计 {response.content.length}</span>
            </div>
          </section>
          <section id="blog-detail">
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
              className="blog-detail"
            >
              {response.content}
            </ReactMarkdown>
          </section>
          <section className="micro-program">
            <h4>小程序关注一波~</h4>
            <Image
              src="https://blogimages2016.oss-cn-hangzhou.aliyuncs.com/homePage/xiaochengxu.jpeg"
              alt="微信小程序"
              width={710}
              height={202}
            />
          </section>
          <section className="comments">
            <h4>关于评论和留言</h4>
            <p>
              如果对本文 <a>{response.title}</a>{" "}
              的内容有疑问，请在下面的评论系统中留言，谢谢。
            </p>
          </section>
          <blockquote className="github">
            <p>
              网站源码：
              <a
                href="https://github.com/linxiaowu66/doumi-blog"
                target="__blank"
              >
                linxiaowu66 · 豆米的博客
              </a>
            </p>
            <p>
              Follow：
              <a href="https://github.com/linxiaowu66" target="__blank">
                linxiaowu66 · Github
              </a>
            </p>
          </blockquote>
        </>
      ) : (
        <Backdrop className="loading" open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div id="gitalk-container" />
      <div id="catalog-content-wrapper" />
    </BlogContainer>
  );
};

export default BlogDetail;
