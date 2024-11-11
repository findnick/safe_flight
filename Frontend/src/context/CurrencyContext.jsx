import { createContext, useEffect } from "react";
import { useCurrency } from "../hooks/useCurrency";
export const CurrencyContext = createContext({});

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency, convertCurrency] = useCurrency();
  return (
    <CurrencyContext.Provider value={[currency, setCurrency, convertCurrency]}>
      {children}
    </CurrencyContext.Provider>
  );
};
