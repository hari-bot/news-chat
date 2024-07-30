import {
  CHAT_MESSAGE_RECEIVED,
  CHAT_MESSAGE_SENT,
  CHAT_ROOM_JOINED,
  CHAT_ROOM_LEFT,
} from "./types";

export const receiveMessage = (message) => (dispatch) => {
  dispatch({
    type: CHAT_MESSAGE_RECEIVED,
    payload: message,
  });
};

export const sendMessage = (message) => (dispatch) => {
  dispatch({
    type: CHAT_MESSAGE_SENT,
    payload: message,
  });
};

export const joinChatRoom = (room) => (dispatch) => {
  dispatch({
    type: CHAT_ROOM_JOINED,
    payload: room,
  });
};

export const leaveChatRoom = () => (dispatch) => {
  dispatch({
    type: CHAT_ROOM_LEFT,
  });
};
