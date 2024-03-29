"use client";
import * as React from "react";
import {
  Select,
  TextField,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Drawer,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styles from "./index.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setArticle, setSetting } from "@/lib/features/editor/editorSlice";
import dayjs from "dayjs";

interface BlogConfigProps {
  tags: string[];
  cats: string[];
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function BlogConfig(props: BlogConfigProps) {
  const article = useAppSelector((state) => state.editor.article);
  const isOpen = useAppSelector((state) => state.editor.showSetting);
  const dispatch = useAppDispatch();

  const handleChange = (data: Record<string, any>) => {
    dispatch(
      setArticle({
        article: {
          ...article,
          ...data,
        },
      })
    );
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => dispatch(setSetting({ showSetting: false }))}
      >
        <div className={styles.root}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="YYYY-MM-DD"
              label="归档时间"
              value={
                article.archiveTime === ""
                  ? dayjs()
                  : dayjs(article.archiveTime)
              }
              onChange={(newValue) => handleChange({ archiveTime: newValue })}
            />
          </LocalizationProvider>
          <TextField
            className={styles.formControl}
            id="outlined-basic"
            label="首页图片"
            variant="outlined"
            value={article.illustration}
            fullWidth
            onChange={(e) => handleChange({ illustration: e.target.value })}
            inputProps={{ maxLength: 200 }}
            placeholder="最多200个字符"
          />
          <TextField
            className={styles.formControl}
            multiline
            id="outlined-basic"
            label="文章摘要"
            variant="outlined"
            rows={10}
            value={article.digest}
            fullWidth
            onChange={(e) => handleChange({ digest: e.target.value })}
            inputProps={{ maxLength: 300 }}
            placeholder="最多300个字符"
          />
          <FormControl className={styles.formControl} fullWidth>
            <InputLabel id="demo-mutiple-name-label">文章标签</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple
              value={article.tags || []}
              onChange={(event) => handleChange({ tags: event.target.value })}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {props.tags.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  //   style={getStyles(name, props.tags, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={styles.formControl} fullWidth>
            <InputLabel id="demo-mutiple-name-label">文章分类</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              value={article.category}
              onChange={(event) =>
                handleChange({ category: event.target.value })
              }
              input={<Input />}
              MenuProps={MenuProps}
            >
              {props.cats.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  // style={getStyles(name, props.cats, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Drawer>
    </div>
  );
}
