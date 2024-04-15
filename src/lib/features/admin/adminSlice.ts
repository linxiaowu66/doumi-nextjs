/* eslint import/no-cycle: 0 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface adminState {
  articleContent: string;
  searchArticleName?: string;
}
const initialState: adminState = {
  articleContent: "",
  searchArticleName: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // 不要直接修改state，修改会无效，需要取它的key依次赋值
    setContent: (state, action: PayloadAction<adminState>) => {
      state.articleContent = action.payload.articleContent;
    },
    setSearchArticleName: (
      state,
      action: PayloadAction<Pick<adminState, "searchArticleName">>
    ) => {
      state.searchArticleName = action.payload.searchArticleName;
    },
  },
});

export const selectAdmin = (state: RootState) => state.admin;
export const { setContent, setSearchArticleName } = adminSlice.actions;
export default adminSlice.reducer;
