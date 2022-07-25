import React, { useState, useEffect, useContext } from "react";
import client from "../../utils/client";
import { useUserLoggedIn } from "./UserLoggedInContext";

const ContactsContext = React.createContext();
const ContactsUpdateContext = React.createContext();

export const useContacts = () => useContext(ContactsContext);
export const useContactsUpdate = () => useContext(ContactsUpdateContext);

export const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const id = useUserLoggedIn();

  useEffect(() => {
    (async () => {
      const res = await client.get(`/users/${id}/contacts`);
      setContacts(res.data.data);
    })();
  }, [id]);

  const updateContacts = async () => {
    const res = await client.get(`/users/${id}/contacts`);
    setContacts(res.data.data);
  };

  return (
    <ContactsContext.Provider value={contacts}>
      <ContactsUpdateContext.Provider value={updateContacts}>
        {children}
      </ContactsUpdateContext.Provider>
    </ContactsContext.Provider>
  );
};
