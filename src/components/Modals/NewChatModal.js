import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function NewChatModal({ closeModal, modalOpen }) {
  const contacts = [1, 2];

  const handleSubmit = () => {};

  return (
    <Modal centered show={modalOpen} onHide={closeModal}>
      <Modal.Header closeButton>Start new chat</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Control></Form.Control>
          ))}
          <Button>Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
