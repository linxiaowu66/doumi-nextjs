"use client";
import Giscus from "@giscus/react";
const BlogComment = () => {
  return (
    <Giscus
      id="comments"
      repo="linxiaowu66/doumi-blog-comments"
      repoId="MDEwOlJlcG9zaXRvcnkyMjMwNTk4MzQ="
      category="Announcements"
      categoryId="DIC_kwDODUufes4Cd6ZO"
      mapping="og:title"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="eager"
    />
  );
};

export default BlogComment;
