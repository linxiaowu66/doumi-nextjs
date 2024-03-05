import * as React from "react";
import styles from "./index.module.css";

interface TimeItemProps {
  subTitle: string;
  time: string;
  desc: string;
}

function Timeline(props: { title: string; timeList: TimeItemProps[] }) {
  const { title, timeList } = props;
  return (
    <div className={styles.root}>
      <h3>{title}</h3>
      {timeList.map((item, index) => (
        <React.Fragment key={index}>
          <p>{item.subTitle}</p>
          <i>{item.time}</i>
          <span>{item.desc}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Timeline;
