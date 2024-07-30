import {
  CHAT_MESSAGE_RECEIVED,
  CHAT_MESSAGE_SENT,
  CHAT_ROOM_JOINED,
  CHAT_ROOM_LEFT,
} from "../actions/types";

const initialState = {
  messages: [],
  currentRoom: null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_MESSAGE_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case CHAT_MESSAGE_SENT:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case CHAT_ROOM_JOINED:
      return {
        ...state,
        currentRoom: action.payload,
      };
    case CHAT_ROOM_LEFT:
      return {
        ...state,
        currentRoom: null,
        messages: [],
      };
    default:
      return state;
  }
};
