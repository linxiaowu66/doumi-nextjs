"use client";
import * as React from "react";
import { TagFaces, MoodBad } from "@mui/icons-material";
import styles from "./index.module.css";
import {
  Chip,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

interface BlogItemCardProps {
  title: string;
  archiveTime: string;
  category: string;
  tags: string[];
  slug: string;
  articleStatus: string;
  selectedArticle: string;
  onClick: () => void;
  onEdit: (slug: string) => void;
}

export default function BlogItemCard(props: BlogItemCardProps) {
  const {
    title,
    archiveTime,
    category,
    tags,
    articleStatus,
    selectedArticle,
    slug,
  } = props;

  // eslint-disable-next-line max-len
  const svgPath =
    "m39.4 0.2q0.7 0.6 0.6 1.5l-5.7 34.3q-0.1 0.6-0.7 1-0.4 0.1-0.7 0.1-0.3 0-0.6-0.1l-10.1-4.1-5.4 6.6q-0.4 0.5-1.1 0.5-0.3 0-0.5-0.1-0.4-0.1-0.7-0.5t-0.2-0.8v-7.8l19.3-23.7-23.9 20.7-8.8-3.6q-0.8-0.3-0.9-1.3 0-0.8 0.7-1.3l37.2-21.4q0.3-0.2 0.7-0.2 0.4 0 0.8 0.2z";

  // eslint-disable-next-line max-len
  const svgPath1 =
    "m22.1 22.9l1.5-5.8h-5.7l-1.4 5.8h5.6z m17.2-11.3l-1.3 5q-0.1 0.5-0.7 0.5h-7.3l-1.4 5.8h6.9q0.4 0 0.6 0.2 0.2 0.3 0.1 0.7l-1.2 5q-0.1 0.5-0.7 0.5h-7.3l-1.8 7.3q-0.2 0.5-0.7 0.5h-5q-0.4 0-0.6-0.2-0.2-0.3-0.1-0.6l1.7-7h-5.7l-1.8 7.3q-0.1 0.5-0.7 0.5h-5q-0.3 0-0.5-0.2-0.2-0.3-0.2-0.6l1.8-7h-7q-0.3 0-0.5-0.3-0.2-0.2-0.2-0.6l1.3-5q0.1-0.5 0.7-0.5h7.3l1.4-5.8h-6.9q-0.4 0-0.6-0.2-0.2-0.3-0.1-0.6l1.2-5q0.1-0.6 0.7-0.6h7.3l1.8-7.3q0.2-0.5 0.7-0.5h5q0.4 0 0.6 0.2 0.2 0.3 0.1 0.7l-1.7 6.9h5.7l1.8-7.3q0.1-0.5 0.7-0.5h5q0.3 0 0.5 0.2 0.2 0.3 0.2 0.7l-1.8 6.9h7q0.3 0 0.5 0.3 0.2 0.3 0.2 0.6z";

  return (
    <Card
      className={
        selectedArticle === slug
          ? `${styles.card} ${styles.active}`
          : styles.card
      }
      onClick={() => props.onClick()}
    >
      <CardContent>
        <Typography className={styles.time} color="textSecondary" gutterBottom>
          {archiveTime}
        </Typography>
        <Typography className={styles.title} variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={styles.pos} color="textSecondary">
          <ul className={styles.cat}>
            <li>
              <svg
                fill="currentColor"
                preserveAspectRatio="xMidYMid meet"
                height="1em"
                width="1em"
                viewBox="0 0 40 40"
                style={{ verticalAlign: "middle" }}
              >
                <g>
                  <path d={svgPath} />
                </g>
              </svg>
              {category}
            </li>
          </ul>
          <ul className={styles.tags}>
            {tags.map((item, idx) => (
              <li key={idx}>
                <svg
                  fill="currentColor"
                  preserveAspectRatio="xMidYMid meet"
                  height="1em"
                  width="1em"
                  viewBox="0 0 40 40"
                  style={{ verticalAlign: "middle" }}
                >
                  <g>
                    <path d={svgPath1} />
                  </g>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </Typography>
        <Typography variant="body2" component="div">
          <Chip
            icon={articleStatus === "published" ? <TagFaces /> : <MoodBad />}
            label={articleStatus === "published" ? "已发布" : "草稿中"}
            color={articleStatus === "published" ? "primary" : "secondary"}
            className={styles.chip}
            size="small"
          />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.onEdit(props.slug)}>
          编辑
        </Button>
        <Button size="small">删除</Button>
      </CardActions>
    </Card>
  );
}
