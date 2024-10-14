import { configureStore } from "@reduxjs/toolkit";
import pathTitleReducer from "./slices/manager/pathTitle-slices";

export const store = configureStore({
  reducer: { pathTitleReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
