import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./components/App";
import WebFont from "webfontloader";
import { body } from "./utils/globalcss";
import registerServiceWorker from "./registerServiceWorker";

WebFont.load({
  google: {
    families: ["Roboto:400,700", "Roboto Condensed", "Geostar", "sans-serif"]
  }
});

ReactDOM.render(
  <Provider store={store()}>
    <App className={body} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
