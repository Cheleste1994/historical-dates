import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./slice/date.slice";

export const store = configureStore({
  reducer: {
    dateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
