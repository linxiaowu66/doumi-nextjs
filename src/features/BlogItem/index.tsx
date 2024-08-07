"use client";
import * as React from "react";
import {
  CardActionArea,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import styles from "./index.module.css";
import Link from "next/link";
import WxShare from "./WxShare";
import { DouMiBlog } from "@/interface";

export default function BlogItem(props: DouMiBlog.ArticleBrief) {
  // eslint-disable-next-line max-len
  const sinaLink = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(
    `https://blog.5udou.cn/blog/detail/${props.slug}`
  )}&title=${props.title}&pic=${encodeURIComponent(props.illustration)}`;

  return (
    <Card className={styles.card}>
      <CardActionArea
        className={styles.content}
        onClick={() => window.open(`/blog/detail/${props.slug}`, "_blank")}
      >
        <CardMedia
          className={styles.media}
          image={props.illustration}
          title="blog illustration"
        />
        <CardContent>
          <h2 className={styles.title}>{props.title}</h2>
          <p className={styles.digest}>{props.digest}</p>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.listAction}>
        <div className={styles.btnGroup}>
          <Button
            size="small"
            color="primary"
            style={{ lineHeight: 1 }}
            className={styles.shareBtn}
          >
            <Link href={sinaLink} target="__blank">
              {/* eslint-disable-next-line max-len */}
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                width="17"
                height="17"
              >
                <path
                  fill="#FB6622"
                  d="M15.518 3.06c8.834-.854 7.395 7.732 7.394 7.731-.625 1.439-1.673.309-1.673.309.596-7.519-5.692-6.329-5.692-6.329-.898-1.067-.029-1.711-.029-1.711zm4.131 6.985c-.661 1.01-1.377.126-1.376.126.205-3.179-2.396-2.598-2.396-2.598-.719-.765-.091-1.346-.091-1.346 4.882-.551 3.863 3.818 3.863 3.818zM5.317 7.519s4.615-3.86 6.443-1.328c0 0 .662 1.08-.111 2.797.003-.003 3.723-1.96 5.408.159 0 0 .848 1.095-.191 2.649 0 0 2.918-.099 2.918 2.715 0 2.811-4.104 6.44-9.315 6.44-5.214 0-8.026-2.092-8.596-3.102 0 0-3.475-4.495 3.444-10.33zm10.448 7.792s.232-4.411-5.71-4.207c-6.652.231-6.579 4.654-6.579 4.654.021.39.097 3.713 5.842 3.713 5.98 0 6.447-4.16 6.447-4.16zm-9.882.86s-.059-3.632 3.804-3.561c3.412.06 3.206 3.165 3.206 3.165s-.026 2.979-3.684 2.979c-3.288 0-3.326-2.583-3.326-2.583zm2.528 1.037c.672 0 1.212-.447 1.212-.998 0-.551-.543-.998-1.212-.998-.672 0-1.215.447-1.215.998 0 .551.546.998 1.215.998z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </Link>
          </Button>
          <WxShare slug={props.slug} />
        </div>
        <Link
          href={`/blog/detail/${props.slug}`}
          target="__blank"
          onClick={(e) => e.stopPropagation()}
        >
          阅读全文
        </Link>
      </CardActions>
    </Card>
  );
}
