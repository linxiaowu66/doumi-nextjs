import * as React from "react";
import styles from "./index.module.css";

function TitleItem(props: { title: string; children: React.ReactElement[] }) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{props.title}</div>
      {props.children}
    </div>
  );
}

export default TitleItem;
