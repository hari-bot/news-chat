import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    error: null,
    token: localStorage.getItem("token") || null,
    userName: localStorage.getItem("username") || null,
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.userInfo = action.payload.name;
      state.error = null;
      state.token = action.payload.token;
      state.userName = action.payload.name;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.name);
    },
    registerFail: (state, action) => {
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      state.userInfo = action.payload.name;
      state.error = null;
      state.token = action.payload.token;
      state.userName = action.payload.name;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.name);
    },
    loginFail: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  registerSuccess,
  registerFail,
  loginSuccess,
  loginFail,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
