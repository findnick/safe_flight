import { createContext } from "react";
import { userSession } from "../hooks/userSession";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUserData, getUserData] = userSession();

  return (
    <UserContext.Provider value={[user, setUserData, getUserData]}>
      {children}
    </UserContext.Provider>
  );
};
