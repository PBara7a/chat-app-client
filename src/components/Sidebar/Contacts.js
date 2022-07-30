import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import NewContactModal from "../Modals/NewContactModal";
import { BsPersonBoundingBox } from "react-icons/bs";
import { useContacts } from "../contexts/ContactsContext";
import formatUserName from "../../utils/formatUserName";
import ContactAccountInfo from "../Modals/ContactAccountInfo";

export default function Contacts() {
  const [newContactModalOpen, setNewContactModalOpen] = useState(false);
  const [contactInfoModalOpen, setContactInfoModalOpen] = useState(false);
  const { contacts } = useContacts();
  const [selectedContact, setSelectedContact] = useState();

  const closeNewContactModal = () => setNewContactModalOpen(false);
  const closeContactInfoModal = () => setContactInfoModalOpen(false);

  return (
    <>
      <button
        className="btn-custom mt-3 mb-3"
        onClick={() => setNewContactModalOpen(true)}
      >
        Add new contact +
      </button>
      <ListGroup>
        {contacts &&
          contacts.map((contact) => (
            <li
              className="menu-li align-items-center d-flex mb-1"
              key={contact.id}
              onClick={() => {
                setSelectedContact(contact);
                setContactInfoModalOpen(true);
              }}
            >
              <BsPersonBoundingBox className="me-4 ms-2 sidebar-icon" />
              {formatUserName(contact)}
            </li>
          ))}
      </ListGroup>

      <ContactAccountInfo
        contact={selectedContact}
        closeModal={closeContactInfoModal}
        modalOpen={contactInfoModalOpen}
      />

      <NewContactModal
        closeModal={closeNewContactModal}
        modalOpen={newContactModalOpen}
      />
    </>
  );
}
