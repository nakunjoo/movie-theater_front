import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PathData = {
  path: string;
  mainTitle: string;
  mainUrl: string;
  subTitle: string | null;
};

const initialState = {
  path: "/manager/theater",
  mainTitle: "상영관 관리",
  mainUrl: "/manager/theater",
  subTitle: null,
} as PathData;

export const pathTitle = createSlice({
  name: "path-title",
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<PathData>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setPath } = pathTitle.actions;

export default pathTitle.reducer;
