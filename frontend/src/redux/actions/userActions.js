import axios from "axios";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "./types";

export const register = (username, email, password) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/users/register",
      { username, email, password },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};
