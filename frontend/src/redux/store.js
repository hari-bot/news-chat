import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import chatReducer from "./features/chatSlice";
import newsReducer from "./features/newsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    news: newsReducer,
  },
});

export default store;
