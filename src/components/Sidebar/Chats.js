import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import NewChatModal from "../Modals/NewChatModal";

export default function Chats() {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div>Chats</div>
      <button className="btn-custom w-100" onClick={() => setModalOpen(true)}>
        Start new chat +
      </button>
      <Modal centered show={modalOpen} onHide={closeModal}>
        <NewChatModal closeModal={closeModal} />
      </Modal>
    </>
  );
}
