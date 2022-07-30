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
  const [searchStr, setSearchStr] = useState("");

  const handleChange = (e) => {
    setSearchStr(e.target.value.toLowerCase());
  };

  const displayContacts = contacts.filter((contact) => {
    const name = formatUserName(contact).toLowerCase();
    return name.includes(searchStr);
  });

  const closeNewContactModal = () => setNewContactModalOpen(false);
  const closeContactInfoModal = () => setContactInfoModalOpen(false);

  return (
    <>
      <input
        type="search"
        name="search"
        value={searchStr}
        onChange={handleChange}
        className="input-custom mt-3 mb-2"
        placeholder="search contacts"
      />
      <button
        className="btn-custom mb-3"
        onClick={() => setNewContactModalOpen(true)}
      >
        Add new contact +
      </button>
      <ListGroup>
        {contacts &&
          displayContacts.map((contact) => (
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
