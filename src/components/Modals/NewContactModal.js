import React, { useContext, useRef } from "react";
import { Modal, Form } from "react-bootstrap";
import client from "../../utils/client";
import newContactJSON from "../../utils/newContactJSON";
import { UserLoggedInContext } from "../contexts/UserLoggedInContext";
import { useContactsUpdate } from "../contexts/ContactsContext";

const NewContactModal = ({ closeModal, modalOpen }) => {
  const updateContacts = useContactsUpdate();
  const { userId } = useContext(UserLoggedInContext);
  const contactRef = useRef();
  const nameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContact = newContactJSON(userId, nameRef, contactRef);

    await client.post("/contacts", newContact, false);

    await updateContacts();

    closeModal();
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
        <Form onSubmit={handleSubmit}>
          <input
            className="input-custom mb-1"
            type="text"
            placeholder="Contact number"
            name="id"
            ref={contactRef}
          />

          <input
            className="input-custom mb-2"
            type="text"
            placeholder="Name"
            name="name"
            ref={nameRef}
          />

          <button className="btn-custom w-100">Add contact</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewContactModal;
