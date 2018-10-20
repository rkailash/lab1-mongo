import * as types from "actions/types";
import axios from "axios";

const initialState = {
  account: { email: "", password: "" },
  authFlag: false,
  showLoginError: false,
  userInfo: undefined
};

export const loginReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_CHANGE:
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
