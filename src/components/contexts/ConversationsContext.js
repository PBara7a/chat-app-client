import React, { useContext, useState, useEffect } from "react";
import { useUserLoggedIn } from "./UserLoggedInContext";
import { useContacts } from "./ContactsContext";
import client from "../../utils/client";
import setChatName from "../../utils/setChatName";

const ConversationsContext = React.createContext();

export const useConversations = () => useContext(ConversationsContext);

export const ConversationsContextProvider = ({ children }) => {
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [unreadConversationIds, setUnreadConversationIds] = useState([]);
  const { id, user } = useUserLoggedIn();
  const { contacts } = useContacts();
  let messages;
  let tempMessageId = 1;

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

    return {
      ...conversation,
      selected,
      displayName: setChatName(conversation, user, contacts),
      newMessage: unreadConversationIds.includes(conversation.id),
    };
  });

  const selectedConversation =
    formattedConversations[selectedConversationIndex];

  if (selectedConversation) {
    messages = selectedConversation.messages;
  }

  const setConversationUnread = (convoId) => {
    if (selectedConversation.id === convoId) return;

    const conversationIds = [...unreadConversationIds];

    if (!conversationIds.includes(convoId)) {
      setUnreadConversationIds([...conversationIds, convoId]);
    }
  };

  const setConversationRead = (convoId) => {
    const conversationIds = unreadConversationIds.filter(
      (id) => id !== convoId
    );

    setUnreadConversationIds(conversationIds);
  };

  const createConversation = async (recipients, name) => {
    const data = {
      owner_id: id,
      name,
      participants: [...recipients, id],
    };

    await client.post("/conversations", data);

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

    const newMessageState = {
      id: --tempMessageId,
      senderId: id,
      conversationId: selectedConversation.id,
      text: text,
      sender: { number: user.number },
    };
    messages.push(newMessageState);

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
    setConversationUnread,
    setConversationRead,
    unreadConversationIds,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};
