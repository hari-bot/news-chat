const express = require("express");
const connectDB = require("./config");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const newsRoutes = require("./routes/news");
const fileUpload = require("./middlewares/fileUpload");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/news", newsRoutes);

app.post("/upload", fileUpload.single("file"), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);

    socket.broadcast
      .to(room)
      .emit("message", `${username} has joined the chat`);

    socket.on("chatMessage", (msg) => {
      io.to(room).emit("message", msg);
    });

    socket.on("disconnect", () => {
      io.to(room).emit("message", `${username} has left the chat`);
    });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
