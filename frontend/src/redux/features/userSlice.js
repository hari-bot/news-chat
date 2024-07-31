import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    error: null,
    token: localStorage.getItem("token") || null,
    userName: localStorage.getItem("username") || null,
    description: localStorage.getItem("description") || "Add Description",
    email: localStorage.getItem("email") || null,
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.userInfo = action.payload.name;
      state.error = null;
      state.token = action.payload.token;
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.description = action.payload.description;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.name);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("description", action.payload.description);
    },
    registerFail: (state, action) => {
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      state.userInfo = action.payload.name;
      state.error = null;
      state.token = action.payload.token;
      state.userName = action.payload.name;
      state.email = action.payload.email;
      state.description = action.payload.description;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.name);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("description", action.payload.description);
    },
    loginFail: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("description");
    },
    updateBio: (state, action) => {
      state.description = action.payload;
      localStorage.setItem("description", action.payload);
    },
  },
});

export const {
  registerSuccess,
  registerFail,
  loginSuccess,
  loginFail,
  logout,
  updateBio,
} = userSlice.actions;

export default userSlice.reducer;
