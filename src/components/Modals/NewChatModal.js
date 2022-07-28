import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsContext";
import { useConversations } from "../contexts/ConversationsContext";
import formatUserName from "../../utils/formatUserName";

export default function NewChatModal({ closeModal, modalOpen }) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [groupName, setGroupName] = useState("");
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const multipleRecipients = selectedContactIds.length > 1;
  const recipientName = () => {
    const recipient = contacts.find(
      (contact) => contact.id === selectedContactIds[0]
    );
    return formatUserName(recipient);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    multipleRecipients
      ? createConversation(selectedContactIds, groupName)
      : createConversation(selectedContactIds, recipientName());

    closeModal();
    setSelectedContactIds([]);
    setGroupName("");
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
              label={formatUserName(contact)}
              onChange={() => handleChange(contact.id)}
            />
          ))}
          {multipleRecipients && (
            <input
              required
              className="input-custom mt-2 mb-2"
              placeholder="Chat name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          )}
          <button className="btn-custom w-100 mt-1">Chat</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
