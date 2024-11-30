import { createContext, useEffect } from "react";
import { useCurrency } from "../hooks/useCurrency";
export const CurrencyContext = createContext({});

export const CurrencyProvider = ({ initCurrency, currencies, children }) => {
  const [currency, setCurrency, convertCurrency, allCurrencies] = useCurrency(
    initCurrency,
    currencies
  );
  return (
    <CurrencyContext.Provider
      value={[currency, setCurrency, convertCurrency, allCurrencies]}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
