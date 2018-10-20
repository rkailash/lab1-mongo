import { loginReducers } from "reducers/loginReducers";
import { messagesReducers } from "reducers/messagesReducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  const store = createStore(
    loginReducers,
    messagesReducers,
    applyMiddleware(thunk)
  );
  return store;
}
