import React, { useState, useEffect, useContext } from "react";
import client from "../../utils/client";
import { useUserLoggedIn } from "./UserLoggedInContext";

const ContactsContext = React.createContext();

export const useContacts = () => useContext(ContactsContext);

export const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const { id } = useUserLoggedIn();

  useEffect(() => {
    (async () => {
      if (id) {
        const res = await client.get(`/users/${id}/contacts`);
        setContacts(res.data.data);
      }
    })();
  }, [id]);

  const updateContacts = async () => {
    const res = await client.get(`/users/${id}/contacts`);
    setContacts(res.data.data);
  };

  const value = {
    contacts,
    updateContacts,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};
