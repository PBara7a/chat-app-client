import React, { useState, useEffect, useContext } from "react";
import client from "../../utils/client";

const ContactsContext = React.createContext();
const ContactsUpdateContext = React.createContext();

export const useContacts = () => useContext(ContactsContext);
export const useContactsUpdate = () => useContext(ContactsUpdateContext);

export const ContactsContextProvider = ({ children, id }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await client.get(`/contacts/${id}`);
      setContacts(res.data.data);
    })();
  }, [id]);

  const updateContacts = async () => {
    const res = await client.get(`/contacts/${id}`);
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
