import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

export const useCurrency = (initCurrency = 'CAD', currencies = ['GBP', 'USD', 'EUR', 'CAD', 'AUD', 'PKR', 'INR']) => {
    const { VITE_FIXER_KEY } = import.meta.env;
    const currentCurrency = useRef(initCurrency);
    const base = useRef("EUR");
    const [converter, setConverter] = useState([]);
    const [allCurrencies, setAllCurrencies] = useState(currencies);

    const [currency, setCurrency] = useState(currentCurrency.current ? currentCurrency.current : 'CAD');

    const setCurrencyState = (name) => {
        if (!allCurrencies.includes(name)) {
            console.error("Invalid value for currency");
            return;
        }
        setCurrency(name);
        localStorage.setItem("currency", name);
    }

    const convert = (value, from = base.current) => {
        let temp = parseFloat(value) / converter[from];
        return (temp * converter[currency]);
    }

    useEffect(() => {
        let latestCurrencyRates = true;
        const defaultRates =
            localStorage.getItem("Currency Rates") &&
            JSON.parse(localStorage.getItem("Currency Rates"));
        if (defaultRates) {
            const { timestamp } = defaultRates;
            const dateDiff = Math.abs(
                moment(timestamp).diff(moment().unix(), "hours")
            );
            if (dateDiff > 24) {
                latestCurrencyRates = false;
            } else {
                latestCurrencyRates = true;
            }
        } else {
            latestCurrencyRates = false;
        }

        if (!latestCurrencyRates) {
            axios
                .get(
                    `https://data.fixer.io/api/latest?access_key=${VITE_FIXER_KEY}`
                )
                .then((res) => {
                    if (res.status === 200) {
                        const today = moment().unix();
                        var currencyObject = { ...res.data };
                        currencyObject.timestamp = today;
                        localStorage.setItem(
                            "Currency Rates",
                            JSON.stringify(currencyObject)
                        );
                        setConverter(currencyObject.rates);
                        base.current = currencyObject.base;
                    }
                });
        } else {
            currentCurrency.current = "CAD";
            base.current = defaultRates.base;
            setConverter(defaultRates.rates);
        }
    }, []);

    useEffect(() => {
        if (currentCurrency.current) {
            localStorage.setItem("currency", currentCurrency.current);
            return;
        }

        if (localStorage.getItem("currency")) {
            if (currency != localStorage.getItem("currency")) {
                setCurrency(localStorage.getItem("currency"));
            }
        } else {
            localStorage.setItem("currency", currency);
        }
    }, []);

    return [currency, setCurrencyState, convert, allCurrencies];
}
