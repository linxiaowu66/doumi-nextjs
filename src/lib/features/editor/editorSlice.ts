/* eslint import/no-cycle: 0 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { DouMiBlog } from "@/interface";
import { omit } from "lodash-es";
import dayjs from "dayjs";

interface editorState {
  article: Omit<DouMiBlog.ArticleBrief, "createdAt" | "updatedAt">;
  editMode: boolean;
  showSetting: boolean;
}
const initialState: editorState = {
  editMode: false,
  article: {
    content: "",
    digest: "",
    title: "",
    illustration: "",
    tags: [],
    category: "",
    archiveTime: dayjs().format("YYYY-MM-DD"),
    slug: "",
    articleStatus: "draft" as "draft",
  },
  showSetting: false,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    // 不要直接修改state，修改会无效，需要取它的key依次赋值
    setArticle: (
      state,
      action: PayloadAction<Pick<editorState, "article">>
    ) => {
      state.article = action.payload.article;
    },
    setSetting: (
      state,
      action: PayloadAction<Pick<editorState, "showSetting">>
    ) => {
      state.showSetting = action.payload.showSetting;
    },
    setEditMode: (
      state,
      action: PayloadAction<Pick<editorState, "editMode">>
    ) => {
      state.editMode = action.payload.editMode;
    },
  },
});

export const selectEditor = (state: RootState) => state.editor;
export const { setArticle, setSetting, setEditMode } = editorSlice.actions;
export default editorSlice.reducer;
