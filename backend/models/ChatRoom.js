const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isGroup: { type: Boolean, default: false },
});

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);
