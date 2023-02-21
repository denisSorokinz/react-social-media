import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";;

import store, { persistedStore } from "./state/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
