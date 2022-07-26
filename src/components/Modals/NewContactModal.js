import React, { useRef, useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import client from "../../utils/client";
import newContactJSON from "../../utils/newContactJSON";
import { useUserLoggedIn } from "../contexts/UserLoggedInContext";
import { useContacts } from "../contexts/ContactsContext";

const NewContactModal = ({ closeModal, modalOpen }) => {
  const { updateContacts } = useContacts();
  const { id } = useUserLoggedIn();
  const contactRef = useRef();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!modalOpen) setError("");
  }, [modalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContact = newContactJSON(contactRef);

    try {
      await client.post(`/users/${id}/contacts`, newContact, false);

      await updateContacts();

      closeModal();
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <Modal centered show={modalOpen} onHide={closeModal}>
      <Modal.Header style={{ backgroundColor: "#202c33" }} closeButton>
        Add new contact:
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: "#50a3a2",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        {error && error}
        <Form onSubmit={handleSubmit}>
          <input
            className={`input-custom mb-2 ${
              error ? "input-custom__wrong" : ""
            }`}
            type="number"
            placeholder="Contact number"
            name="id"
            ref={contactRef}
          />

          <button className="btn-custom w-100">Add contact</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewContactModal;
