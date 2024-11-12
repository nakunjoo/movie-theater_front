import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PathData = {
  path: string;
  mainTitle: string;
  mainUrl: string;
  subTitle: string;
};

const initialState = {
  path: "/manager/reservation",
  mainTitle: "상영영화 관리",
  mainUrl: "/manager/reservation",
  subTitle: "",
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
