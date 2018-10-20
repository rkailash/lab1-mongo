import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import * as types from "actions/types";
import _ from "lodash";

const loginInit = {
  account: { email: "", password: "" },
  authFlag: false,
  showLoginError: false,
  userInfo: undefined
};
const login = (state = loginInit, action) => {
  switch (action.type) {
    case types.HANDLE_LOGIN_CHANGE:
      const account = { ...state.account };
      const e = action.data;
      account[e.currentTarget.name] = e.currentTarget.value;
      return { ...state, account };
    case types.LOGIN_SUCCESS:
      return { ...state, authFlag: true, userInfo: action.data };
    case types.LOGIN_FAILURE:
      return { ...state, authFlag: false, showLoginError: true };
    default:
      return state;
  }
};

const logout = (state = { isLogoutSuccess: undefined }, action) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS:
      return { isLogoutSuccess: true };
    case types.LOGOUT_FAILURE:
      return { isLogoutSuccess: false };
    default:
      return state;
  }
};

const messageObj = [
  {
    id: "1",
    ownerId: "1",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    timestamp: {
      date: "11/1/17",
      time: "00:00"
    }
  },
  {
    id: "2",
    ownerId: "1",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolore. Ut enim ad minim veniam.",
    timestamp: {
      date: "11/1/17",
      time: "00:00"
    }
  }
];

const createMessage = (message, messages) => {
  const d = new Date();
  return {
    id: messages.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1,
    ownerId: "1",
    message,
    timestamp: {
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString()
    }
  };
};

const messagesInit = {
  messages: []
};

export const messages = (state = messagesInit, action) => {
  switch (action.type) {
    case types.SUBMIT_MESSAGE:
      const msgObject = createMessage(action.message, state.messages);
      return {
        ...state,
        messages: _.concat(state.messages, msgObject)
      };
    case types.FETCH_MESSAGES:
      const messages = messageObj.map(item => {
        return {
          id: item.id,
          ownerId: item.ownerId,
          message: item.message,
          timestamp: item.timestamp
        };
      });
      return {
        ...state,
        messages
      };
    default:
      return state;
  }
};

const registerInit = {
  isRegistered: false
};

export const register = (state = registerInit, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return { ...state, isRegistered: true };
    case types.REGISTER_FAILURE:
      return { ...state, isRegistered: false };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  messages,
  login,
  logout,
  register,
  toastr: toastrReducer
});

export default rootReducer;
