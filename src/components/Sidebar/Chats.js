import React, { useState } from "react";
import NewChatModal from "../Modals/NewChatModal";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsContext";
import { useUserLoggedIn } from "../contexts/UserLoggedInContext";
import { useContacts } from "../contexts/ContactsContext";
import { BsChatRightText } from "react-icons/bs";
import formatUserName from "../../utils/formatUserName";

export default function Chats() {
  const [modalOpen, setModalOpen] = useState(false);
  const { conversations, selectConversation } = useConversations();
  const { user } = useUserLoggedIn();
  const { contacts } = useContacts();

  const closeModal = () => setModalOpen(false);

  const chatName = (chat) => {
    if (chat.name !== formatUserName(user)) return chat.name;

    const contactSaved = contacts.find(
      (contact) => contact.id === chat.owner_id
    );
    if (contactSaved) return formatUserName(contactSaved);

    const senderNumber = chat.messages[0]?.sender.number;
    return senderNumber || "unknown";
  };

  return (
    <>
      <button
        className="btn-custom mt-1 mb-1"
        onClick={() => setModalOpen(true)}
      >
        Start new chat +
      </button>

      <ListGroup variant="flush">
        {conversations.map((conversation, i) => (
          <li
            key={i}
            className={`mb-1 align-items-center d-flex contact-li ${
              conversation.selected ? "selected" : ""
            }`}
            onClick={() => selectConversation(i)}
          >
            <BsChatRightText
              className="me-4 ms-2"
              style={{ fontSize: "1.5rem" }}
            />
            {chatName(conversation)}
          </li>
        ))}
      </ListGroup>

      <NewChatModal closeModal={closeModal} modalOpen={modalOpen} />
    </>
  );
}
