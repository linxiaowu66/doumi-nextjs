import * as React from "react";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import styles from "./index.module.css";
import { getWebsiteSummaryData } from "@/service/statistics";

async function FootPrint() {
  const res = await getWebsiteSummaryData();
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + "w";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num.toString();
    }
  };
  return (
    <footer className={styles.footer}>
      <div>
        Copyright © <a href="/">豆米博客</a>. 2024 • All rights reserved. |{" "}
        <a href="https://beian.miit.gov.cn">浙ICP备15041819号-1</a>
      </div>
      <div>本站竟然运行了{res.operationDays}</div>
      <div className={styles.data}>
        <div style={{ marginRight: "20px" }}>
          <GroupOutlinedIcon style={{ marginRight: "5px" }} />
          {formatNumber(res.totalUv)}
        </div>
        <div>
          <RemoveRedEyeOutlinedIcon style={{ marginRight: "5px" }} />
          {formatNumber(res.totalPv)}
        </div>
      </div>
    </footer>
  );
}

export default FootPrint;
