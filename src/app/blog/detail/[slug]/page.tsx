import React from "react";
import {
  CalendarToday,
  Update,
  Category,
  FavoriteBorder,
  DescriptionOutlined,
} from "@mui/icons-material";
import dayjs from "dayjs";
import BlogContainer from "@/features/BlogContainer";
import "progress-catalog/src/progress-catalog.css";
import Image from "next/image";
import "./page.css";
import { getArticleDetail } from "@/service/article";
import CatalogComponent from "./Catalog";
import Link from "next/link";
import BlogPreview from "@/features/BlogPreview";
import BlogComment from "@/features/BlogComment";
import { Metadata, ResolvingMetadata } from "next";

interface Prop {
  params: {
    slug: string;
  };
}

const BlogDetail: React.FC<Prop> = async (props) => {
  const { slug } = props.params;

  const response = await getArticleDetail(slug, true);

  return (
    <BlogContainer contentClass="blog-detail-wrapper">
      <h1>{response.title}</h1>
      <section className="blog-info">
        <div className="info-item">
          <CalendarToday className="icon" />
          <span>
            发表于 {dayjs(new Date(response.createdAt)).format("YYYY-MM-DD")}
          </span>
        </div>
        <div className="info-item">
          <Update className="icon" />
          <span>
            更新于 {dayjs(new Date(response.updatedAt)).format("YYYY-MM-DD")}
          </span>
        </div>
        <div className="info-item">
          <Category className="icon" />
          <span>
            分类于{" "}
            <Link
              href={`/blog/list?queryCat=${response.catId}`}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              {response.category}
            </Link>
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
        <BlogPreview content={response.content} />
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
            href="https://github.com/linxiaowu66/doumi-nextjs"
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
      <CatalogComponent />
      <BlogComment />
    </BlogContainer>
  );
};

export async function generateMetadata(
  { params }: Prop,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  const response = await getArticleDetail(slug, true);

  return {
    openGraph: {
      title: response.title,
    },
    description: response.digest,
  };
}

export default BlogDetail;
