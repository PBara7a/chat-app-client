import React, { useContext, useState, useEffect } from "react";
import { useContacts } from "./ContactsContext";
import { useUserLoggedIn } from "./UserLoggedInContext";
import client from "../../utils/client";

const ConversationsContext = React.createContext();

export const useConversations = () => useContext(ConversationsContext);

export const ConversationsContextProvider = ({ children }) => {
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const [conversations, setConversations] = useState([]);
  const { id } = useUserLoggedIn();
  const contacts = useContacts();

  useEffect(() => {
    (async () => {
      if (id) {
        const res = await client.get(`/conversations/${id}`);
        setConversations(res.data.data);
      }
    })();
  }, [id]);

  const createConversation = async (recipients, name) => {
    const data = {
      owner_id: Number(id),
      name,
      participants: recipients,
    };

    await client.post("/conversations", data, false);

    await updateConversations();
  };

  const updateConversations = async () => {
    const res = await client.get(`/conversations/${id}`);
    setConversations(res.data.data);
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.participants.map((participant) => {
      const contact = contacts.find((contact) => {
        return contact.id === participant.id;
      });
      const name = contact && formatName(contact);
      return { recipient: participant.number, name };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversation: setSelectedConversationIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

const formatName = (contact) => `${contact.firstName} ${contact.lastName}`;
