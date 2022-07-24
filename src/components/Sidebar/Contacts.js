import React, { useContext, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import client from "../../utils/client";
import NewContactModal from "../Modals/NewContactModal";
import { UserLoggedInContext } from "../contexts/UserLoggedInContext";
import { BsPersonBoundingBox } from "react-icons/bs";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { userId } = useContext(UserLoggedInContext);

  useEffect(() => {
    (async () => {
      const res = await client.get(`/contacts/${userId}`);
      setContacts(res.data.data);
    })();
  }, [userId, modalOpen]);

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <button
        className="btn-custom w-100 mt-1 mb-1"
        onClick={() => setModalOpen(true)}
      >
        Add new contact +
      </button>
      <ListGroup>
        {contacts.map((contact) => (
          <li
            className="contact-li align-items-center d-flex mb-1"
            key={contact.id}
          >
            <BsPersonBoundingBox
              className="me-4 ms-2"
              style={{ fontSize: "1.5rem" }}
            />
            {contact.name}
          </li>
        ))}
      </ListGroup>

      <NewContactModal closeModal={closeModal} modalOpen={modalOpen} />
    </>
  );
}
