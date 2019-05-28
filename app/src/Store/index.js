
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import root from "../Reducers/index.js";

export default createStore(
  root,
  applyMiddleware(thunk)
);