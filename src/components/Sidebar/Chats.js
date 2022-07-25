import React, { useState } from "react";
import NewChatModal from "../Modals/NewChatModal";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsContext";
import { BsChatRightText } from "react-icons/bs";

export default function Chats() {
  const [modalOpen, setModalOpen] = useState(false);
  const { conversations, selectConversation } = useConversations();

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <button
        className="btn-custom w-100 mt-1 mb-1"
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
            {conversation.recipients
              .map((recipient) => recipient.name)
              .join(", ")}
          </li>
        ))}
      </ListGroup>

      <NewChatModal closeModal={closeModal} modalOpen={modalOpen} />
    </>
  );
}
