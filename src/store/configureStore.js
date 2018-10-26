import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "reducers";
import thunk from "redux-thunk";

const composeSetup =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    ? window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    : compose;

export default function configureStore(initialState) {
  const store = createStore(rootReducer, composeSetup(applyMiddleware(thunk)));
  return store;
}
