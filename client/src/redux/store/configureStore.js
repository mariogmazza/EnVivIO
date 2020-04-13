// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "../reducers/rootReducer";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from 'redux-devtools-extension'

// const DEFAULT_STATE = {};

// const configureStore = createStore(
//   rootReducer,
//   DEFAULT_STATE,
//   compose(applyMiddleware(thunk))
// );

// export default configureStore;

import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";

export default function configureStore(DEFAULT_STATE = {}) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, DEFAULT_STATE, composedEnhancers);
  return store;
}
