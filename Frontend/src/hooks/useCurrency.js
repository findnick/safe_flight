import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

export const currencies = ['GBP', 'USD', 'EUR', 'CAD']
export const useCurrency = () => {
    const { VITE_FIXER_KEY } = import.meta.env;
    const initialValue = useRef();
    const base = useRef("EUR");
    const converter = useRef({
        CAD: 1.506205,
        EUR: 1,
        GBP: 0.84473,
        USD: 1.109257,
    })

    const [currency, setCurrency] = useState(initialValue.current ? initialValue.current : 'GBP');

    const setCurrencyState = (name) => {
        if (!currencies.includes(name)) {
            console.error("Invalid value for currency");
            return;
        }
        setCurrency(name);
        localStorage.setItem("currency", name);
    }

    const convert = (value, from = base.current) => {
        let temp = parseFloat(value) / converter.current[from];
        return (temp * converter.current[currency]);
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
                    `https://data.fixer.io/api/latest?access_key=${VITE_FIXER_KEY}&symbols=${currencies.join(
                        ","
                    )}`
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
                    }
                });
        } else {
            initialValue.current = "GBP";
            base.current = defaultRates.base;
            converter.current = defaultRates.rates;
        }
    });

    useEffect(() => {
        if (initialValue) {
            localStorage.setItem("currency", initialValue);
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

    return [currency, setCurrencyState, convert];
}