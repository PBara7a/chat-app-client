import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import grabData from "../../utils/tenorFunctions";
import { useConversations } from "../contexts/ConversationsContext";
import { useSocket } from "../contexts/SocketContext";

const SearchGif = ({ closeModal, modalOpen, recipients }) => {
  const [searchStr, setSearchStr] = useState("");
  const { sendMessage } = useConversations();
  const socket = useSocket();

  const handleChange = (e) => {
    setSearchStr(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    grabData(searchStr);
  };

  const handleClick = (e) => {
    sendMessage(socket, e.target.src, recipients, true);
    setSearchStr("");
    closeModal();
  };

  return (
    <Modal centered show={modalOpen} onHide={closeModal}>
      <Modal.Header style={{ backgroundColor: "#202c33" }}>
        <form onSubmit={handleSubmit} className="w-100">
          <input
            type="search"
            name="search"
            value={searchStr}
            onChange={handleChange}
            className="input-custom mt-3 mb-2"
            placeholder="Search Tenor"
          />
        </form>
      </Modal.Header>

      <Modal.Body
        className="gif-grid"
        style={{
          backgroundColor: "#50a3a2",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <img
          id="preview-gif1"
          alt=""
          className="gif-preview"
          onClick={handleClick}
        />
        <img
          id="preview-gif2"
          alt=""
          className="gif-preview"
          onClick={handleClick}
        />
        <img
          id="preview-gif3"
          alt=""
          className="gif-preview"
          onClick={handleClick}
        />
        <img
          id="preview-gif4"
          alt=""
          className="gif-preview"
          onClick={handleClick}
        />
        <img
          id="preview-gif5"
          alt=""
          className="gif-preview"
          onClick={handleClick}
        />
        <img
          id="preview-gif6"
          alt=""
          className="gif-preview"
          onClick={handleClick}
        />
        <img
          id="preview-gif7"
          alt=""
          className="gif-preview"
          onClick={handleClick}
        />
        <img
          id="preview-gif8"
          alt=""
          className="gif-preview"
          onClick={handleClick}
        />
      </Modal.Body>
    </Modal>
  );
};

export default SearchGif;
