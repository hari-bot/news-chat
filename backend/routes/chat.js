const express = require("express");
const {
  createChatRoom,
  sendMessage,
  getMessages,
  getChatRooms,
} = require("../controllers/chat");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/chatroom", auth, createChatRoom);
router.post("/message", auth, sendMessage);
router.get("/messages/:chatRoomId", auth, getMessages);
router.get("/chatrooms", getChatRooms);

module.exports = router;
