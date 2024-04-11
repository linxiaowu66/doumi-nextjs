"use client";
import axios from "axios";
import {
  TextField,
  Button,
  Menu,
  MenuItem,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    setLoading(true);

    if (
      !article.archiveTime ||
      !article.category ||
      !article.digest ||
      !article.illustration ||
      !article.tags
    ) {
      setMessage("博文配置信息请补全后再提交");
      setLoading(false);
      return;
    }

    if (!article.title) {
      setMessage("博文标题必填");
      setLoading(false);
      return;
    }

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
      setMessage("博文保存成功");
      if (!editMode) {
        setTimeout(() => (location.href = "/admin"), 3000);
      }
    } else {
      setMessage(`博文保存失败: ${result.data.message}`);
    }
    setLoading(false);
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
        required
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={message.includes("成功") ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </header>
  );
};

export default EditorHeader;
