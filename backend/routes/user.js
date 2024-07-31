const express = require("express");
const { register, login, updateBio } = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/update-bio", auth, updateBio);

module.exports = router;
