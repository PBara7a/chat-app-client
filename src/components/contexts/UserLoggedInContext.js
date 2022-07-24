import React, { useContext, useState } from "react";

const UserLoggedInContext = React.createContext();
const UserLoggedInContextUpdate = React.createContext();

export const useUserLoggedIn = () => useContext(UserLoggedInContext);
export const useUserLoggedInUpdate = () =>
  useContext(UserLoggedInContextUpdate);

export const UserLoggedInContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const updateUserId = (id) => setUserId(id);

  return (
    <UserLoggedInContext.Provider value={userId}>
      <UserLoggedInContextUpdate.Provider value={updateUserId}>
        {children}
      </UserLoggedInContextUpdate.Provider>
    </UserLoggedInContext.Provider>
  );
};
