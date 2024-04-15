"use client";
import * as React from "react";
import { Search } from "@mui/icons-material";
import { InputBase, ClickAwayListener } from "@mui/material";
import styles from "./index.module.css";
import { DouMiBlog } from "@/interface";
import axios from "axios";
import { debounce } from "lodash-es";
import { useAppDispatch } from "@/lib/hooks";
import { setSearchArticleName } from "@/lib/features/admin/adminSlice";

const BlogSearch = (props: { isLogin: boolean }) => {
  const { isLogin } = props;
  const [keyword, setKeyword] = React.useState("");
  const [list, setList] = React.useState<DouMiBlog.ArticleBrief[]>([]);
  const [showList, setShowList] = React.useState(false);
  const dispatch = useAppDispatch();
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

  const handleJumpToDetail = (slug: string, title: string) => {
    if (!isLogin) {
      window.open(`${location.origin}/blog/detail/${slug}`, "_blank");
      return;
    }
    dispatch(setSearchArticleName({ searchArticleName: title }));
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
          inputProps={{ "aria-label": "search", type: "search" }}
          onInput={debounce((e) => {
            setKeyword((e.target as any).value);
          }, 500)}
        />
        {keyword ? (
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
                  onClick={() => handleJumpToDetail(item.slug, item.title)}
                >
                  ”{item.title}“
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export default BlogSearch;
