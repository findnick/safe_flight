import { createContext, useState } from "react";
import { userSession } from "../hooks/userSession";

export const HotelContext = createContext({});

export const HotelProvider = ({ children }) => {
    const [data, setData] = useState('');
    return (
        <HotelContext.Provider value={{ data, setData }}>
            {children}
        </HotelContext.Provider>
    );
};
