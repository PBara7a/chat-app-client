import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsContext";
import MessageForm from "./MessageForm";
import MessagesPanel from "./MessagesPanel";
import { useSocket } from "../contexts/SocketContext";
import { useUserLoggedIn } from "../contexts/UserLoggedInContext";
import HiddenSideBar from "../Sidebar/HiddenSideBar";
import { AiOutlineGif } from "react-icons/ai";
import SearchGif from "../Modals/SearchGif";

const Chat = () => {
  const [text, setText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { selectedConversation, sendMessage, unreadConversationIds } =
    useConversations();
  const socket = useSocket();
  const { id } = useUserLoggedIn();

  const closeModal = () => setModalOpen(false);

  const hasNewMessages = unreadConversationIds.length > 0;

  const recipients = selectedConversation?.participants
    .filter((participant) => participant.id !== id)
    .map((contact) => contact.number);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(socket, text, recipients);
    setText("");
  };

  return (
    <>
      <div className="chat">
        <header className="chat-header">
          <HiddenSideBar hasNewMessages={hasNewMessages} />
          <h1 className="chat-title">{selectedConversation?.displayName}</h1>
        </header>

        {selectedConversation ? <MessagesPanel /> : <div></div>}

        <div className="grid__two-column__expand-one me-3">
          <MessageForm
            text={text}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <div className="center">
            <AiOutlineGif
              className="sidebar-icon gif-btn"
              onClick={() => setModalOpen(true)}
            />
          </div>
        </div>
      </div>
      <SearchGif
        closeModal={closeModal}
        modalOpen={modalOpen}
        recipients={recipients}
      />
    </>
  );
};

export default Chat;
