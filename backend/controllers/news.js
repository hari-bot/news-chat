const axios = require("axios");
const Article = require("../models/Article");

exports.fetchNews = async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`
    );

    const articles = response.data.articles.map((article) => ({
      ...article,
      description: article.description || "No description available",
      urlToImage:
        article.urlToImage ||
        "https://via.placeholder.com/150?text=No+Image+Source",
    }));

    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.saveArticle = async (req, res) => {
  const { title, description, url, source, urlToImage } = req.body;

  try {
    const article = new Article({
      title,
      description,
      url,
      source,
      urlToImage,
      user: req.user.id,
    });

    await article.save();
    res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getSavedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ user: req.user.id });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
