import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsContext";
import MessageForm from "./MessageForm";
import MessagesPanel from "./MessagesPanel";
import { useSocket } from "../contexts/SocketContext";
import { useUserLoggedIn } from "../contexts/UserLoggedInContext";
import HiddenSideBar from "../Sidebar/HiddenSideBar";

const Chat = () => {
  const [text, setText] = useState("");
  const { selectedConversation, sendMessage } = useConversations();
  const socket = useSocket();
  const { id } = useUserLoggedIn();

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
      {selectedConversation && (
        <div className="chat">
          <div className="chat-overlay">
            <header className="chat-header">
              <HiddenSideBar />
              <h1 className="chat-title">{selectedConversation.displayName}</h1>
            </header>

            <MessagesPanel />

            <MessageForm
              text={text}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
