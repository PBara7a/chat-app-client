import React, { useContext, useEffect, useState } from "react";
import client from "../../utils/client";
import userLoggedInFromJson from "../../utils/userLoggedInFromJson";

const UserLoggedInContext = React.createContext();

export const useUserLoggedIn = () => useContext(UserLoggedInContext);

export const UserLoggedInContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(Number(localStorage.getItem("userId")));
  const [userLoggedin, setUserLoggedIn] = useState({});

  useEffect(() => {
    (async () => {
      if (userId) {
        const res = await client.get(`/users/${userId}`);
        const user = userLoggedInFromJson(res.data.data.user);
        setUserLoggedIn(user);
      }
    })();
  }, [userId]);

  const updateUserId = (id) => setUserId(Number(id));

  const value = {
    id: userId,
    updateUserId,
    user: userLoggedin,
  };

  return (
    <UserLoggedInContext.Provider value={value}>
      {children}
    </UserLoggedInContext.Provider>
  );
};
