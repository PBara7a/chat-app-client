import React, { useContext, useState, useEffect } from "react";
import { useUserLoggedIn } from "./UserLoggedInContext";
import client from "../../utils/client";

const ConversationsContext = React.createContext();

export const useConversations = () => useContext(ConversationsContext);

export const ConversationsContextProvider = ({ children }) => {
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const [conversations, setConversations] = useState([]);
  const { id } = useUserLoggedIn();
  let messages;

  useEffect(() => {
    (async () => {
      if (id) {
        const res = await client.get(`/conversations/${id}`);
        setConversations(res.data.data);
      }
    })();
  }, [id]);

  const formattedConversations = conversations.map((conversation, index) => {
    const selected = index === selectedConversationIndex;
    return { ...conversation, selected };
  });

  const selectedConversation =
    formattedConversations[selectedConversationIndex];

  if (selectedConversation) {
    messages = selectedConversation.messages;
  }

  const createConversation = async (recipients, name) => {
    const data = {
      owner_id: id,
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

  const sendMessage = async (socket, text, recipients) => {
    const messageJSON = {
      sender_id: id,
      conversation_id: selectedConversation.id,
      text,
    };

    socket.emit("send-message", messageJSON, recipients);
  };

  const value = {
    conversations: formattedConversations,
    selectedConversation,
    selectConversation: setSelectedConversationIndex,
    createConversation,
    sendMessage,
    messages,
    updateConversations,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};
