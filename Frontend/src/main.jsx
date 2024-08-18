import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { CurrencyProvider } from "./context/CurrencyContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </UserProvider>
  </React.StrictMode>
);
