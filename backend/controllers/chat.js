const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");

exports.createChatRoom = async (req, res) => {
  const { name, userIds, isGroup } = req.body;

  try {
    const chatRoom = new ChatRoom({ name, users: userIds, isGroup });
    await chatRoom.save();
    res.json(chatRoom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.sendMessage = async (req, res) => {
  const { chatRoomId, message } = req.body;

  try {
    const newMessage = new Message({
      sender: req.user.id,
      chatRoom: chatRoomId,
      message,
    });

    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getMessages = async (req, res) => {
  const { chatRoomId } = req.params;

  try {
    const messages = await Message.find({ chatRoom: chatRoomId }).sort({
      timestamp: 1,
    });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find();
    res.json(chatRooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
