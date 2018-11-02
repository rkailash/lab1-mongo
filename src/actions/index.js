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

const logoutFailure = err => {
  return {
    type: types.LOGOUT_FAILURE,
    err
  };
};

const saveSearchResults = results => {
  return {
    ...results,
    type: types.SAVE_SEARCH_RESULTS
  };
};

const savePropertyDetails = data => {
  return {
    type: types.SAVE_PROPERTY_DETAILS,
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
export const saveAddPropertyStatus = status => {
  return {
    type: types.ADD_PROPERTY_STATUS,
    status
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
        dispatch(loginFailure(err.response.data));
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
    return axios
      .post("http://localhost:3001/Register", data)
      .then(res => {
        dispatch(registerSuccess(res.data));
      })
      .catch(err => {
        dispatch(registerFailure());
      });
  };
};

export const saveSearch = query => {
  return {
    type: types.SAVE_SEARCH,
    query
  };
};

export const fetchSearchResults = params => {
  return dispatch => {
    return axios.get("http://localhost:3001/PropertyList", { params }).then(
      res => {
        dispatch(saveSearchResults({ properties: res.data }));
      },
      err => {
        console.log("Failed to fetch Search Results!");
      }
    );
  };
};

export const fetchPropertyDetails = (id, params) => {
  return dispatch => {
    return axios.get(`http://localhost:3001/Property/${id}`).then(
      res => {
        dispatch(savePropertyDetails({ details: res.data }));
      },
      err => {
        console.log("Failed to fetch Search Results!");
      }
    );
  };
};

export const addProperty = data => {
  return dispatch => {
    return axios
      .post("http://localhost:3001/AddProperty", data)
      .then(response => {
        console.log("Axios POST response:", response.status);
        dispatch(saveAddPropertyStatus(response.status));
      });
  };
};
