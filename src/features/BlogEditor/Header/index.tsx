"use client";
import axios from "axios";
import { TextField, Button, Menu, MenuItem } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setArticle,
  setEditMode,
  setSetting,
} from "@/lib/features/editor/editorSlice";
import { DouMiBlog } from "@/interface";

const EditorHeader = (props: {
  initalArticle: DouMiBlog.ArticleBrief | null;
  editMode: boolean;
}) => {
  const { initalArticle, editMode: initalEditMode } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) => state.editor.article);
  const editMode = useAppSelector((state) => state.editor.editMode);

  useEffect(() => {
    if (initalArticle) {
      dispatch(setArticle({ article: initalArticle }));
    }
    dispatch(setEditMode({ editMode: initalEditMode }));
  }, []);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleSubmit = async (actionType: "published" | "draft") => {
    try {
      const result = editMode
        ? await axios.put(
            `/api/article`,
            { ...article, slug: article.slug, articleStatus: actionType },
            { withCredentials: true }
          )
        : await axios.post(
            `/api/article`,
            { ...article, articleStatus: actionType },
            {
              withCredentials: true,
            }
          );

      if (result.data.status && result.data.data) {
        setTimeout(() => (location.href = "/admin"), 3000);
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <header className="blog-title">
      <TextField
        id="outlined-helperText"
        label="文章标题"
        type="text"
        variant="outlined"
        fullWidth
        value={article.title}
        onChange={(e) => {
          dispatch(
            setArticle({ article: { ...article, title: e.target.value } })
          );
        }}
      />
      <Settings
        className="toggle-setting"
        onClick={() => dispatch(setSetting({ showSetting: true }))}
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
        <MenuItem onClick={() => handleSubmit("published")}>发布博文</MenuItem>
        <MenuItem>删除博文</MenuItem>
      </Menu>
    </header>
  );
};

export default EditorHeader;
