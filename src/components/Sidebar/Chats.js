import React, { useState } from "react";
import NewChatModal from "../Modals/NewChatModal";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsContext";
import { BsChatRightText } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";

export default function Chats() {
  const [modalOpen, setModalOpen] = useState(false);
  const { conversations, selectConversation, setConversationRead } =
    useConversations();

  const closeModal = () => setModalOpen(false);

  const handleClick = (index, convoId) => {
    selectConversation(index);
    setConversationRead(convoId);
  };

  return (
    <>
      <button
        className="btn-custom mt-3 mb-3"
        onClick={() => setModalOpen(true)}
      >
        Start new chat +
      </button>

      <ListGroup variant="flush">
        {conversations.map((conversation, i) => (
          <li
            key={i}
            className={`mb-1 align-items-center d-flex menu-li position-relative ${
              conversation.selected ? "selected" : ""
            }`}
            onClick={() => handleClick(i, conversation.id)}
          >
            <BsChatRightText className="me-4 ms-2 sidebar-icon" />
            {conversation.displayName}
            {conversation.newMessage && (
              <BsEnvelope className="new-message-icon position-absolute end-0 me-2" />
            )}
          </li>
        ))}
      </ListGroup>

      <NewChatModal closeModal={closeModal} modalOpen={modalOpen} />
    </>
  );
}
