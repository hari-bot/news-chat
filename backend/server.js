const express = require("express");
const connectDB = require("./config");
const userRoutes = require("./routes/user");
const newsRoutes = require("./routes/news");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
