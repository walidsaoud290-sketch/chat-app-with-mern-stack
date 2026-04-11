import { configureStore } from "@reduxjs/toolkit";
import  chatSlice  from "./indexSlice.js";

export const store = configureStore({
  reducer: {
    chat_data: chatSlice,
  },
});
