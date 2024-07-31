import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setChatRooms } from "../redux/features/chatSlice";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const dispatch = useDispatch();
  const { messages, chatRooms } = useSelector((state) => state.chat);
  const [username, setUsername] = useState(""); // Add a username state

  // Fetch chat rooms
  const fetchChatRooms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/chats/chatrooms"
      );
      dispatch(setChatRooms(response.data));
    } catch (error) {
      console.error("Failed to fetch chat rooms:", error);
    }
  };

  useEffect(() => {
    const name = prompt("Enter your username:"); // Ask user for their username
    setUsername(name);
    fetchChatRooms();

    socket.on("message", (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    return () => {
      socket.off("message");
    };
  }, [dispatch]);

  // Handle room change
  const handleRoomChange = (room) => {
    setSelectedRoom(room);
    socket.emit("joinRoom", { room: room._id, username });
  };

  const sendMessage = () => {
    if (selectedRoom && message.trim()) {
      const newMessage = { text: message, room: selectedRoom._id, username };
      socket.emit("sendMessage", newMessage);
      setMessage("");
    } else {
      console.error("Room is not selected or message is empty.");
    }
  };

  const handleCreateRoom = async () => {
    const newRoom = prompt("Enter the name for the new room:");
    if (newRoom) {
      try {
        await axios.post("http://localhost:5000/api/chats/chatroom", {
          name: newRoom,
        });
        fetchChatRooms();
      } catch (error) {
        console.error("Failed to create room:", error);
      }
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Rooms</h1>
          <button
            onClick={handleCreateRoom}
            className="text-white bg-indigo-500 px-4 py-2 rounded-md"
          >
            Create Room
          </button>
        </header>

        {/* Chat Rooms List */}
        <div className="overflow-y-auto h-screen p-3">
          {chatRooms.map((room) => (
            <div
              key={room._id}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              onClick={() => handleRoomChange(room)}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="Room Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{room.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700 border-b border-gray-300">
          <h1 className="text-2xl font-semibold">
            {selectedRoom ? selectedRoom.name : "Select a Room"}
          </h1>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages
            .filter((msg) => msg.room === selectedRoom?._id)
            .map((msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  msg.username === username ? "justify-end" : ""
                }`}
              >
                <div
                  className={`flex max-w-96 p-3 rounded-lg ${
                    msg.username === username
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                  <img
                    src={
                      msg.avatarUrl ||
                      "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    }
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              </div>
            ))}
        </div>

        {/* Chat Input */}
        <footer className="bg-white border-tmario border-gray-300 p-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
