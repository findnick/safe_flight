import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { CurrencyProvider } from "./context/CurrencyContext.jsx";
import store from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <CurrencyProvider
          initCurrency="CAD"
          currencies={["GBP", "USD", "EUR", "CAD", "AUD", "PKR", "INR"]}
        >
          <App />
        </CurrencyProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
