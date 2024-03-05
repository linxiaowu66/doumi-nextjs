import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

import {
  Visibility,
  Comment,
  AccessTime,
  Description,
  TrendingUp,
} from "@mui/icons-material";

import styles from "./index.module.css";
import { DouMiBlog } from "@/interface";

const key2Name: { [key: string]: string } = {
  totalPv: "访问次数",
  commentsNum: "评论总数",
  operationDays: "运行天数",
  articleCount: "文章总数",
  articlesWordsNum: "文章字数",
};

const key2Icon: { [key: string]: JSX.Element } = {
  totalPv: <Visibility />,
  commentsNum: <Comment />,
  operationDays: <AccessTime />,
  articleCount: <Description />,
  articlesWordsNum: <TrendingUp />,
};

export default function BlogSummary(props: { data: DouMiBlog.SummaryStats }) {
  const transferData = Object.keys(props.data).map((key) => ({
    name: key2Name[key],
    value: props.data[key],
    icon: key2Icon[key],
  }));

  return (
    <div className={styles.root}>
      <Paper elevation={3}>
        <div className={styles.title}>博客信息</div>
        <List dense>
          {transferData.map((item) => (
            <ListItem key={item.name}>
              <ListItemAvatar>
                <Avatar className={styles.small}>{item.icon}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} className={styles.name} />
              <ListItemText primary={item.value} className={styles.value} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}
