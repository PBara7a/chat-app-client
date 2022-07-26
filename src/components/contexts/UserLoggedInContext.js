import React, { useContext, useEffect, useState } from "react";
import client from "../../utils/client";

const UserLoggedInContext = React.createContext();

export const useUserLoggedIn = () => useContext(UserLoggedInContext);

export const UserLoggedInContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(Number(localStorage.getItem("userId")));
  const [userLoggedin, setUserLoggedIn] = useState({});

  useEffect(() => {
    (async () => {
      if (userId) {
        const res = await client.get(`/users/${userId}`);
        setUserLoggedIn(res.data.data);
      }
    })();
  }, [userId]);

  const updateUserId = (id) => setUserId(Number(id));

  const value = {
    id: userId,
    updateUserId,
    user: userLoggedin.user,
  };

  return (
    <UserLoggedInContext.Provider value={value}>
      {children}
    </UserLoggedInContext.Provider>
  );
};
