"use client";
import * as React from "react";
import { Typography, Container, ButtonBase } from "@mui/material";
import styles from "./index.module.css";

function DouMiLinks() {
  const images = [
    {
      url: "https://blogimage.5udou.cn/homePage/%E6%96%AD%E6%A1%A5%E6%AE%8B%E9%9B%AA.jpeg?x-oss-process=style/addWaterMarkBottom",
      title: "断桥残雪",
      link: "/blog/list",
    },
    {
      url: "https://blogimage.5udou.cn/homePage/%E8%A5%BF%E6%BA%AA%E6%B9%BF%E5%9C%B0.jpg?x-oss-process=style/addWaterMarkBottom",
      title: "西溪湿地",
      link: "/blog/tags",
    },
    {
      url: "https://blogimage.5udou.cn/homePage/%E4%B9%9D%E6%BA%AA%E7%83%9F%E6%A0%91.jpg?x-oss-process=style/addWaterMarkBottom",
      title: "九溪烟树",
      link: "/about/timeline",
    },
    {
      url: "https://blogimage.5udou.cn/homePage/%E8%8B%8F%E5%A0%A4.jpeg?x-oss-process=style/addWaterMarkBottom",
      title: "苏堤春晓",
      link: "/about/cats",
    },
    {
      url: "https://blogimage.5udou.cn/homePage/%E6%B9%98%E6%B9%96.jpg?x-oss-process=style/addWaterMarkBottom",
      title: "湘湖",
      link: "/about/blog",
    },
    {
      url: "https://blogimage.5udou.cn/homePage/douMi.jpg?x-oss-process=style/addWaterMarkBottom",
      title: "豆米",
      link: "/about/doumi",
    },
  ];

  return (
    <Container className={styles.linkContainer} component="section">
      <Typography variant="h4" align="center" component="h2">
        杭州美景
        <span className={styles.baseLine} />
      </Typography>
      <div className={styles.imageContainer}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={styles.imageWrapper}
            onClick={() => (location.href = image.link)}
          >
            <div
              className={styles.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={styles.imageBackdrop} />
            <div className={styles.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={styles.imageTitle}
              >
                {image.title}
                <div className={styles.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

export default DouMiLinks;
