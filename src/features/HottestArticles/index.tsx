import { DouMiBlog } from "@/interface";
import { Container } from "@mui/material";
import styles from "./index.module.css";
import { Article } from "@/database/entities";

function HottestArticles(props: {
  list: DouMiBlog.ArticleBrief[];
  hottestList: Array<Article | null>;
}) {
  return (
    <Container className={styles.root} component="section">
      <div className={styles.section}>
        <h2>文章排行榜</h2>
        <ul>
          {props.list.map((item) => (
            <li key={item.slug}>
              <a href={`/blog/detail/${item.slug}`}>
                <span>{item.title}</span>
                <time>{item.archiveTime}</time>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h2>最近热门文章</h2>
        <ul>
          {props.hottestList
            .filter((item) => !!item)
            .map((item) => (
              <li key={item?.slug}>
                <a href={`/blog/detail/${item?.slug}`}>
                  <span>{item?.title}</span>
                  <time>{item?.fullArchiveTime}</time>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </Container>
  );
}

export default HottestArticles;
