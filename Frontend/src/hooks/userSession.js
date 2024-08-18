import { useEffect, useState } from "react"

export const userSession = (data) => {
    const [user, setUser] = useState();
    useEffect(() => {
        if (data) {
            setUser({ data: data });
            console.log(user);
        }
        if (localStorage.getItem("userSession")) {
            setUser(JSON.parse(localStorage.getItem("userSession")));
        }
    }, []);
    useEffect(() => {
        if (user) {
            localStorage.setItem("userSession", JSON.stringify(user));
        }
    }, [user])
    const setUserData = (value) => {
        if (value) {
            setUser({ data: value });
        } else {
            if (localStorage.getItem("userSession") !== undefined) {
                localStorage.removeItem("userSession");
                setUser(undefined);
            }
        }
    }
    const getUserData = () => localStorage.getItem("userSession") ? user : null;

    return [user, setUserData, getUserData];
}