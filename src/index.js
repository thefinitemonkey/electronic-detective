import React from "react";
import ReactDOM from "react-dom";
import store from "./store/store.js";

ReactDOM.render(
  <Provider store={store()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
//registerServiceWorker();
