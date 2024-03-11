import React from "react";

import BlogContainer from "@/features/BlogContainer";
import BlogConfig from "@/features/BlogConfig";
import "./page.css";
import BlogPreview from "@/features/BlogPreview";
import EditorHeader from "@/features/BlogEditor/Header";
import { getArticleDetail } from "@/service/article";
import { headers } from "next/headers";
import { getDataSource } from "@/database";
import Textarea from "@/features/BlogEditor/Textarea";
import { Category, Tag } from "@/database/entities";
import { omit } from "lodash-es";

const BlogAdminEditor = async () => {
  const heads = headers();
  const url = heads.get("x-url");
  const urlObject = new URL(url || "http://localhost:3000");
  const searchParams = urlObject.searchParams;
  const querySlug = searchParams.get("slug");
  let article = null;
  if (querySlug) {
    article = await getArticleDetail(querySlug!);
  }

  const AppDataSource = await getDataSource();
  const repo = AppDataSource.getRepository(Tag);
  const catRepo = AppDataSource.getRepository(Category);

  const [tags, categories] = await Promise.all([
    repo.find({ relations: ["articles"] }),
    catRepo.find({ relations: ["articles"] }),
  ]);

  return (
    <BlogContainer isLogin contentClass="blog-editor-wrapper">
      <EditorHeader
        initalArticle={
          article ? omit(article, ["createdAt", "updatedAt"]) : null
        }
        editMode={!!querySlug}
      />
      <div className="blog-editor-container">
        <section className="blog-editor">
          <Textarea />
        </section>
        <section className="blog-preview">
          <BlogPreview
            content={article ? article.content : ""}
            className={"preview-overflow"}
          />
        </section>
      </div>
      <BlogConfig
        tags={tags.map((item) => item.name)}
        cats={categories.map((item) => item.name)}
      />
    </BlogContainer>
  );
};

export default BlogAdminEditor;
