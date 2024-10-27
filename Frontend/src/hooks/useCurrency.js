import axios from "axios";
import { useEffect, useState } from "react";

export const currencies = ['GBP', 'USD', 'EUR', 'CAD']
export const useCurrency = (initialValue, base = "EUR", converter = {
    CAD: 1.506205,
    EUR: 1,
    GBP: 0.84473,
    USD: 1.109257,
}) => {
    const [currency, setCurrency] = useState(initialValue ? initialValue : 'GBP');

    const setCurrencyState = (name) => {
        if (!currencies.includes(name)) {
            console.error("Invalid value for currency");
            return;
        }
        setCurrency(name);
        localStorage.setItem("currency", name);
    }

    const convert = (value, from = base) => {
        let temp = parseFloat(value) / converter[from];
        return (temp * converter[currency]);
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