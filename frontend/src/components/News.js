import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setArticles, saveArticle } from "../redux/features/newsSlice";

const News = () => {
  const dispatch = useDispatch();
  const { articles, savedArticles } = useSelector((state) => state.news);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await axios.get("http://localhost:5000/api/news/saved");
      dispatch(setArticles(data.articles));
    };

    fetchArticles();
  }, [dispatch]);

  const handleSaveArticle = (article) => {
    dispatch(saveArticle(article));
  };

  return (
    <div>
      <h1>News</h1>
      <div>
        {articles.map((article, index) => (
          <div key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <button onClick={() => handleSaveArticle(article)}>
              Save Article
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
