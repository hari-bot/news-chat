const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: { type: String, default: "" },
  role: { type: String, default: "user" },
});

module.exports = mongoose.model("User", UserSchema);
