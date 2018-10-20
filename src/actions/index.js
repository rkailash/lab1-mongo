import * as types from "./types";
import axios from "axios";

const registerSuccess = data => {
  return {
    type: types.REGISTER_SUCCESS,
    data
  };
};

const registerFailure = data => {
  return {
    type: types.REGISTER_FAILURE,
    data
  };
};

const loginSuccess = data => {
  return {
    type: types.LOGIN_SUCCESS,
    data
  };
};

const loginFailure = data => {
  return {
    type: types.LOGIN_FAILURE,
    data
  };
};

const logoutSuccess = data => {
  return {
    type: types.LOGOUT_SUCCESS,
    data
  };
};

const logoutFailure = data => {
  return {
    type: types.LOGOUT_FAILURE,
    data
  };
};

export const handleLoginChange = data => {
  return {
    type: types.HANDLE_LOGIN_CHANGE,
    data
  };
};

export const submitMessage = message => {
  return {
    type: types.SUBMIT_MESSAGE,
    message
  };
};
export const fetchMessages = id => {
  return {
    type: types.FETCH_MESSAGES,
    id
  };
};

export const handleLogin = data => {
  return dispatch => {
    axios.defaults.withCredentials = true;
    return axios.post("http://localhost:3001/Login", data).then(
      res => {
        dispatch(loginSuccess(res.data));
      },
      err => {
        dispatch(loginFailure());
      }
    );
  };
};

export const handleLogout = () => {
  return dispatch => {
    return axios.get("http://localhost:3001/Logout").then(
      () => {
        dispatch(logoutSuccess());
      },
      () => {
        dispatch(logoutFailure());
      }
    );
  };
};

export const registerUser = data => {
  return dispatch => {
    axios.defaults.withCredentials = true;
    return axios.post("http://localhost:3001/Register", data).then(
      res => {
        dispatch(registerSuccess(response.data));
      },
      err => {
        dispatch(registerFailure());
      }
    );
  };
};
