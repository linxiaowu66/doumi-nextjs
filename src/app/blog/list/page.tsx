import BlogContainer from "@/features/BlogContainer";
import styles from "./page.module.css";
import InfiniteList from "@/features/InfiniteList";
import { queryArticles } from "@/service/article";
import { headers } from "next/headers";

const BlogList = async () => {
  const heads = headers();
  const url = heads.get("x-url");
  const urlObject = new URL(url || "http://localhost:3000");
  const searchParams = urlObject.searchParams;
  const queryArch = searchParams.get("queryArch");
  const queryCat = searchParams.get("queryCat");
  const queryTag = searchParams.get("queryTag");
  const result = await queryArticles(
    1,
    12,
    null,
    queryTag,
    queryArch,
    queryCat,
    "published"
  );

  return (
    <BlogContainer contentClass={styles.blogListWrapper}>
      <section
        className={styles.blogListContainer}
        //   ref={(ref) => (blogListContainer = ref)}
      >
        <InfiniteList
          initialPosts={result}
          queryArch={queryArch}
          queryCat={queryCat}
          queryTag={queryTag}
        />
      </section>
    </BlogContainer>
  );
};

export default BlogList;
