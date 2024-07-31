import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    chatRooms: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setChatRooms: (state, action) => {
      state.chatRooms = action.payload;
    },
  },
});

export const { addMessage, setMessages, setChatRooms } = chatSlice.actions;

export default chatSlice.reducer;
