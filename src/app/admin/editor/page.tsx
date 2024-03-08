"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Menu, MenuItem } from "@mui/material";
import { Settings } from "@mui/icons-material";
import qs from "query-string";
import BlogContainer from "@/features/BlogContainer";
import BlogConfig from "@/features/BlogConfig";
import { DouMiBlog } from "@/interface";
import "./page.css";
import BlogPreview from "@/features/BlogPreview";

const initData = { tags: [], categories: [] };

const BlogAdminEditor = () => {
  const [blogContent, setBlogContent] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSetting, setShowSetting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [slug, setSlug] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogIllustration, setBlogIllustration] = useState("");
  const [blogDigest, setBlogDigest] = useState("");
  const [blogTags, setBlogTags] = useState<string[]>([]);
  const [blogArchiveTime, setBlogArchiveTime] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogStatus, setBlogStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { slug: searchSlug } = qs.parse(window.location.search);

        const [tagsList, catList] = await Promise.all([
          axios.get<DouMiBlog.TagsItem[]>("/api/tag/list"),
          axios.get<DouMiBlog.CategoryItem[]>("/api/category/list"),
        ]);

        setTags(tagsList.data.map((item) => item.name));
        setCategories(catList.data.map((item) => item.name));

        if (searchSlug) {
          setEditMode(true);
          setSlug(searchSlug as string);
          await fetchBlogDetail(searchSlug as string);
        }
      } catch (err) {
        console.error(err);
        setIsOpenSnackbar(true);
        setSnackbarMsg("获取博客信息失败，请稍后再试");
      }
    };

    fetchData();
  }, [window.location.search]);

  useEffect(() => {
    const fetchData = async () => {
      const { slug: searchSlug } = qs.parse(window.location.search);
      if (slug !== searchSlug) {
        await fetchBlogDetail(searchSlug as string);
      }
    };

    fetchData();
  }, [window.location.search]);

  const fetchBlogDetail = async (slug: string) => {
    try {
      const result = await axios.get<
        DouMiBlog.CommonResponse<DouMiBlog.ArticleDetail>
      >("/api/article/detail", { params: { slug } });
      const data = result.data.data;

      setBlogContent(data.content);
      setBlogTitle(data.title);
      setBlogIllustration(data.illustration);
      setBlogDigest(data.digest);
      setBlogTags(data.tags);
      setBlogArchiveTime(data.archiveTime);
      setBlogCategory(data.category);
      setBlogStatus(data.articleStatus);
    } catch (err) {
      console.error(err);
      setIsOpenSnackbar(true);
      setSnackbarMsg("获取博客详情失败，请稍后再试");
    }
  };

  const handleSubmit = async (actionType: "published" | "draft") => {
    const postBody = {
      title: blogTitle,
      content: blogContent,
      archiveTime: blogArchiveTime,
      tags: blogTags,
      category: blogCategory,
      digest: blogDigest,
      illustration: blogIllustration,
      articleStatus: actionType,
    };

    try {
      const result = editMode
        ? await axios.put(
            `/api/article`,
            { ...postBody, slug: slug },
            { withCredentials: true }
          )
        : await axios.post(`/api/article`, postBody, {
            withCredentials: true,
          });

      if (result.data.status && result.data.data) {
        setIsOpenSnackbar(true);
        setSnackbarMsg(result.data.data.msg);
        setTimeout(() => (location.href = "/admin"), 3000);
      } else {
        setIsOpenSnackbar(true);
        setSnackbarMsg("保存博文失败，请稍后再试");
      }
    } catch (err) {
      console.error(err);
      setIsOpenSnackbar(true);
      setSnackbarMsg("保存博文失败，请稍后再试");
    }
  };

  const handleChange = (event: any) => {
    setBlogContent(event.target.value);
  };

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSaveConfig = (data: {
    archiveTime: string;
    illustration: string;
    category: string;
    tags: string[];
    digest: string;
  }) => {
    setBlogArchiveTime(data.archiveTime);
    setShowSetting(false);
    setBlogIllustration(data.illustration);
    setBlogCategory(data.category);
    setBlogTags(data.tags);
    setBlogDigest(data.digest);
  };

  return (
    <BlogContainer isLogin contentClass="blog-editor-wrapper">
      <header className="blog-title">
        <TextField
          id="outlined-helperText"
          label="文章标题"
          type="text"
          variant="outlined"
          fullWidth
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
        <Settings
          className="toggle-setting"
          onClick={() => setShowSetting(true)}
          color="primary"
        />
        <Button
          className="toggle-menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu}
          variant="contained"
          color="primary"
        >
          博文操作
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => handleSubmit("draft")}>保存草稿</MenuItem>
          <MenuItem onClick={() => handleSubmit("published")}>
            发布博文
          </MenuItem>
          <MenuItem>删除博文</MenuItem>
        </Menu>
      </header>
      <div className="blog-editor-container">
        <section className="blog-editor">
          <textarea
            spellCheck="true"
            value={blogContent}
            className="markdown-realtext"
            onChange={handleChange}
          />
        </section>
        <section className="blog-preview">
          <BlogPreview content={blogContent} />
        </section>
      </div>
      <BlogConfig
        isOpen={showSetting}
        closeCb={handleSaveConfig}
        tags={tags}
        cats={categories}
        initData={{
          tags: blogTags,
          cat: blogCategory,
          archiveTime: blogArchiveTime,
          illustration: blogIllustration,
          digest: blogDigest,
        }}
      />
    </BlogContainer>
  );
};

export default BlogAdminEditor;
