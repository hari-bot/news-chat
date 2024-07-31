import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setArticles, saveArticle } from "../redux/features/newsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const News = ({ type = "default" }) => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.news);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const endpoint = type === "saved" ? "saved" : "fetch";
        const response = await axios.get(
          `http://localhost:5000/api/news/${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setArticles(response.data));
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, [dispatch, token, type]);

  const handleSaveArticle = async (article) => {
    try {
      await axios.post("http://localhost:5000/api/news/save", article, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(saveArticle(article));
      toast.success("Article saved!");
    } catch (error) {
      console.error("Failed to save article:", error);
      toast.error("Failed to save article.");
    }
  };

  const handleShare = (url) => {
    navigator.clipboard.writeText(url).then(
      () => {
        toast.success("Link copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy link:", err);
        toast.error("Failed to copy link.");
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8 text-center">
        {type === "saved" ? "Saved News Stories" : "Trending News Stories"}
      </h1>
      {articles.length === 0 ? (
        <p className="text-center text-gray-700">No articles available.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="relative flex flex-col bg-white shadow-md rounded-xl w-full sm:w-96"
            >
              <div className="relative h-56 overflow-hidden rounded-t-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h5 className="text-xl font-semibold mb-3 text-blue-gray-900">
                  {article.title}
                </h5>
                <p className="text-base font-light text-gray-700 mb-4 flex-grow">
                  {article.description}
                </p>
                <div className="mt-auto flex gap-4">
                  <a
                    href={article.url}
                    className="inline-block px-6 py-3 text-xs font-bold uppercase text-white bg-gray-900 rounded-lg shadow-md transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    type="button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                  {type !== "saved" && (
                    <button
                      onClick={() => handleSaveArticle(article)}
                      className="inline-flex items-center px-4 py-2 text-xs font-bold uppercase text-white bg-gray-900 rounded-lg shadow-md transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <FontAwesomeIcon icon={faBookmark} className="mr-2" />
                      Save
                    </button>
                  )}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <FontAwesomeIcon
                  icon={faShareAlt}
                  onClick={() => handleShare(article.url)}
                  className="text-gray-900 hover:text-gray-600 cursor-pointer"
                  size="lg"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
