import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessages } from "../redux/features/chatSlice";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Update with your server URL

const Chat = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const dispatch = useDispatch();
  const { messages, chatRooms } = useSelector((state) => state.chat);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    return () => {
      socket.off("message");
    };
  }, [dispatch]);

  const sendMessage = () => {
    socket.emit("sendMessage", { message, room });
    setMessage("");
  };

  return (
    <div>
      <h1>Chat</h1>
      <select onChange={(e) => setRoom(e.target.value)} value={room}>
        <option value="">Select Room</option>
        {chatRooms.map((room, index) => (
          <option key={index} value={room}>
            {room}
          </option>
        ))}
      </select>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
