const express = require("express");
const {
  createChatRoom,
  sendMessage,
  getMessages,
} = require("../controllers/chat");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/chatroom", auth, createChatRoom);
router.post("/message", auth, sendMessage);
router.get("/messages/:chatRoomId", auth, getMessages);

module.exports = router;
