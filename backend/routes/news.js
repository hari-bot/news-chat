const express = require("express");
const {
  fetchNews,
  saveArticle,
  getSavedArticles,
} = require("../controllers/news");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/fetch", fetchNews);
router.post("/save", auth, saveArticle);
router.get("/saved", auth, getSavedArticles);

module.exports = router;
