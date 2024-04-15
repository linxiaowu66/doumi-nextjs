"use client";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const BlogPreview = (props: { content: string; className?: string }) => {
  const { content, className } = props;
  const [article, setArticle] = useState(content);

  const articleContent = useAppSelector((state) => state.admin.articleContent);

  useEffect(() => {
    if (articleContent) {
      setArticle(articleContent);
    }
  }, [articleContent]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
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
              showLineNumbers
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
      className={`${styles.articleMarkdownContent} ${className} markdown-body`}
    >
      {article}
    </ReactMarkdown>
  );
};

export default BlogPreview;
