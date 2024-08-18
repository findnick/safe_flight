import { useEffect, useState } from "react";

export const useLocalStorage = (initialValue, keyName) => {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        const data = localStorage.getItem(keyName);
        const parsed_data = JSON.parse(data);
        setState(parsed_data);
    }, []);

    useEffect(() => {
        if (state?.id) {
            localStorage.setItem(keyName, JSON.stringify(state));
        }
    }, [state]);

    return [state, setState];
};
