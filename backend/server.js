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
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

// Route handlers
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/news", newsRoutes);

app.post("/upload", fileUpload.single("file"), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// WebSocket connection
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.on("joinRoom", ({ room, username }) => {
    socket.join(room);
    socket.broadcast.to(room).emit("message", {
      text: `${username} has joined the chat`,
      room,
      username,
      isMine: false,
    });

    socket.on("sendMessage", (message) => {
      io.to(message.room).emit("message", {
        ...message,
        isMine: false,
      });
    });

    socket.on("disconnect", () => {
      io.to(room).emit("message", {
        text: `${username} has left the chat`,
        room,
        username,
        isMine: false,
      });
    });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
