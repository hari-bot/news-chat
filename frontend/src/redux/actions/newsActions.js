import axios from "axios";
import {
  NEWS_FETCH_SUCCESS,
  NEWS_FETCH_FAIL,
  NEWS_SAVE_SUCCESS,
  NEWS_SAVE_FAIL,
  NEWS_SAVED_ARTICLES_FETCH_SUCCESS,
  NEWS_SAVED_ARTICLES_FETCH_FAIL,
} from "./types";

export const fetchNews = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/news/fetch");
    dispatch({
      type: NEWS_FETCH_SUCCESS,
      payload: data.articles,
    });
  } catch (error) {
    dispatch({
      type: NEWS_FETCH_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const saveArticle = (article) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/news/save", article, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: NEWS_SAVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEWS_SAVE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const fetchSavedArticles = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/news/saved", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: NEWS_SAVED_ARTICLES_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEWS_SAVED_ARTICLES_FETCH_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};
