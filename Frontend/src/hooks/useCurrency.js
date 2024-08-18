import { useEffect, useState } from "react";

export const useCurrency = (initialValue) => {
    const [currency, setCurrency] = useState(initialValue ? initialValue : 'GBP');
    const currencies = ['GBP', 'USD', 'EUR', 'CAD']

    const setCurrencyState = (name) => {
        if (!currencies.includes(name)) {
            console.error("Invalid value for currency");
            return;
        }
        setCurrency(name);
        localStorage.setItem("currency", name);
    }

    const convert = (value) => {
        const converter = {
            EUR: 0.840336,
            USD: 0.775194,
            CAD: 0.561798,
            GBP: 1,
        }

        return (parseFloat(value) / converter[currency]);
    }

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