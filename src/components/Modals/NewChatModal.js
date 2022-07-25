import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsContext";
import { useConversations } from "../contexts/ConversationsContext";

export default function NewChatModal({ closeModal, modalOpen }) {
  const [selectedContactIds, setSelectedContactIds] = useState([]); // put back to empty after submit/close form
  const contacts = useContacts();
  const { createConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    createConversation(selectedContactIds);

    closeModal();
  };

  const handleChange = (contactId) => {
    if (selectedContactIds.includes(contactId)) {
      setSelectedContactIds(
        selectedContactIds.filter((id) => id !== contactId)
      );
    } else {
      setSelectedContactIds([...selectedContactIds, contactId]);
    }
  };

  return (
    <Modal centered show={modalOpen} onHide={closeModal}>
      <Modal.Header closeButton style={{ backgroundColor: "#202c33" }}>
        Start new chat
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#50a3a2",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Check
              key={contact.id}
              type="checkbox"
              value={selectedContactIds.includes(contact.id)}
              label={contact.name}
              onChange={() => handleChange(contact.id)}
            />
          ))}
          <button className="btn-custom w-100 mt-3">Chat</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
