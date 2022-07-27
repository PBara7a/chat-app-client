import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import NewContactModal from "../Modals/NewContactModal";
import { BsPersonBoundingBox } from "react-icons/bs";
import { useContacts } from "../contexts/ContactsContext";
import formatUserName from "../../utils/formatUserName";

export default function Contacts() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contacts } = useContacts();

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <button
        className="btn-custom mt-1 mb-1"
        onClick={() => setModalOpen(true)}
      >
        Add new contact +
      </button>
      <ListGroup>
        {contacts &&
          contacts.map((contact) => (
            <li
              className="contact-li align-items-center d-flex mb-1"
              key={contact.id}
            >
              <BsPersonBoundingBox
                className="me-4 ms-2"
                style={{ fontSize: "1.5rem" }}
              />
              {formatUserName(contact)}
            </li>
          ))}
      </ListGroup>

      <NewContactModal closeModal={closeModal} modalOpen={modalOpen} />
    </>
  );
}
