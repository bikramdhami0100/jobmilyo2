import {configureStore} from "@reduxjs/toolkit";
import SignupInfo from "./Slice";

export const store = configureStore({
  reducer: {
     signupinfo:SignupInfo
  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch