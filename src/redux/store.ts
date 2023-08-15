import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import loadingReducer from "./loadingSlice"
export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      loading:loadingReducer
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;