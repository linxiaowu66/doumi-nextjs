import * as React from "react";
import { Search } from "@mui/icons-material";
import { InputBase, ClickAwayListener } from "@mui/material";
import styles from "./index.module.css";
import { DouMiBlog } from "@/interface";
import axios from "axios";
import { debounce } from "lodash-es";

const BlogSearch = () => {
  const [keyword, setKeyword] = React.useState("");
  const [list, setList] = React.useState<DouMiBlog.ArticleBrief[]>([]);
  const [showList, setShowList] = React.useState(false);

  const handleSearch = async () => {
    const result = await axios.get("/api/article/search", {
      params: { keyword },
    });

    if (result.data !== undefined) {
      setList(result.data);
      setShowList(true);
    }
  };

  React.useEffect(() => {
    if (keyword) {
      handleSearch();
    } else {
      setList([]);
    }
  }, [keyword]);

  const handleJumpToDetail = (slug: string) => {
    window.open(`${location.origin}/blog/detail/${slug}`, "_blank");
  };

  return (
    <ClickAwayListener onClickAway={() => setShowList(false)}>
      <div className={styles.blogSearch}>
        <div className={styles.searchIcon}>
          <Search />
        </div>
        <InputBase
          placeholder="搜索关键词"
          classes={{
            root: styles.inputRoot,
            input: styles.input,
          }}
          onFocus={() => {
            if (keyword) {
              setShowList(true);
            }
          }}
          inputProps={{ "aria-label": "search" }}
          onInput={debounce((e) => {
            setKeyword((e.target as any).value);
          }, 500)}
        />
        <div
          className={
            showList
              ? `${styles.searchResult} ${styles.show}`
              : styles.searchResult
          }
        >
          {
            <div className={styles.resultTip}>
              {list.length === 0 ? "搜索不到" : ""}包含关键词
              <span>“{keyword}”</span>的文章{list.length ? "如下：" : ""}
            </div>
          }
          <ul>
            {list.map((item) => (
              <li
                key={item.slug}
                className={styles.articleItem}
                onClick={() => handleJumpToDetail(item.slug)}
              >
                ”{item.title}“
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default BlogSearch;
