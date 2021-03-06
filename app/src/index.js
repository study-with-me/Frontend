//https://codesandbox.io/s/31jw3

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import userStore from "./Store/index.js";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={userStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
