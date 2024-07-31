import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    savedArticles: [],
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    saveArticle: (state, action) => {
      state.savedArticles.push(action.payload);
    },
    setSavedArticles: (state, action) => {
      state.savedArticles = action.payload;
    },
  },
});

export const { setArticles, saveArticle, setSavedArticles } = newsSlice.actions;

export default newsSlice.reducer;
