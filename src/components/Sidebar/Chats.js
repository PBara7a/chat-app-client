import React, { useState } from "react";
import NewChatModal from "../Modals/NewChatModal";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsContext";

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
          <ListGroup.Item
            key={i}
            action
            active={conversation.selected}
            onClick={() => selectConversation(i)}
          >
            {conversation.recipients
              .map((recipient) => recipient.name)
              .join(", ")}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <NewChatModal closeModal={closeModal} modalOpen={modalOpen} />
    </>
  );
}
