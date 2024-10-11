import { configureStore } from "@reduxjs/toolkit";
import pathTitleReducer from "./slices/manager/pathTitle-slices";
import lineDataReducer from "./slices/manager/linesData-slices";

export const store = configureStore({
  reducer: { pathTitleReducer, lineDataReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
