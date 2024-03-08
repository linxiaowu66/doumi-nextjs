import { DouMiBlog } from "@/interface";
import { Container, Typography } from "@mui/material";
import styles from "./index.module.css";

function HottestArticles(props: { list: DouMiBlog.ArticleBrief[] }) {
  return (
    <Container className={styles.root} component="section">
      <Typography variant="h4" align="center" component="h2">
        热门文章
      </Typography>
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
    </Container>
  );
}

export default HottestArticles;
