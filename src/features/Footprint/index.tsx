import * as React from "react";
import styles from "./index.module.css";
function FootPrint() {
  return (
    <footer className={styles.footer}>
      <div>
        Copyright © <a href="/">豆米博客</a>. 2024 • All rights reserved. |{" "}
        <a href="https://beian.miit.gov.cn">浙ICP备15041819号-1</a>
      </div>
    </footer>
  );
}

export default FootPrint;
