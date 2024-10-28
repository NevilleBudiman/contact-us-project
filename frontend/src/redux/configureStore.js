import { applyMiddleware, compose, createStore } from "redux";
import createRootReducer from "./reducers";
import { thunk } from "redux-thunk";

export default function configureStore(initialState = {}) {
  const store = createStore(
    createRootReducer(),
    initialState,
    compose(applyMiddleware(thunk))
  );

  return { store };
}
