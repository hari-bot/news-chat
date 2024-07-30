import {
  NEWS_FETCH_SUCCESS,
  NEWS_FETCH_FAIL,
  NEWS_SAVE_SUCCESS,
  NEWS_SAVE_FAIL,
  NEWS_SAVED_ARTICLES_FETCH_SUCCESS,
  NEWS_SAVED_ARTICLES_FETCH_FAIL,
} from "../actions/types";

const newsInitialState = {
  articles: [],
  savedArticles: [],
  error: null,
};

export const newsReducer = (state = newsInitialState, action) => {
  switch (action.type) {
    case NEWS_FETCH_SUCCESS:
      return { ...state, articles: action.payload, error: null };
    case NEWS_FETCH_FAIL:
      return { ...state, articles: [], error: action.payload };
    case NEWS_SAVE_SUCCESS:
      return {
        ...state,
        savedArticles: [...state.savedArticles, action.payload],
        error: null,
      };
    case NEWS_SAVE_FAIL:
      return { ...state, error: action.payload };
    case NEWS_SAVED_ARTICLES_FETCH_SUCCESS:
      return { ...state, savedArticles: action.payload, error: null };
    case NEWS_SAVED_ARTICLES_FETCH_FAIL:
      return { ...state, savedArticles: [], error: action.payload };
    default:
      return state;
  }
};
