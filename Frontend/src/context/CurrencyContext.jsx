import { createContext, useEffect } from "react";
import { useCurrency } from "../hooks/useCurrency";
export const CurrencyContext = createContext({});

export const CurrencyProvider = ({ children }) => {
  const defaultRates =
    localStorage.getItem("Currency Rates") &&
    JSON.parse(localStorage.getItem("Currency Rates"));
  const [currency, setCurrency, convertCurrency] = useCurrency(
    "GBP",
    defaultRates.base,
    defaultRates.rates
  );
  return (
    <CurrencyContext.Provider value={[currency, setCurrency, convertCurrency]}>
      {children}
    </CurrencyContext.Provider>
  );
};
