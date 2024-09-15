import axios from "axios";
import { useEffect, useState } from "react";

export const useCurrency = (initialValue, converter = {
    CAD: 1.506205,
    EUR: 1,
    GBP: 0.84473,
    USD: 1.109257,
}) => {
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

    const convert = (value, from = "EUR") => {
        let temp = parseFloat(value) / converter[from];
        return (temp * converter[currency]);
    }

    useEffect(() => {
        // axios.get(`http://data.fixer.io/api/latest?access_key=cd1622b2f3fb8a3a97caa4e17c6847d4&symbols=${currencies.join(",")}`).then((res) => console.log(res));

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