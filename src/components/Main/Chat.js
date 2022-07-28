import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsContext";
import MessageForm from "./MessageForm";
import MessagesPanel from "./MessagesPanel";
import { useSocket } from "../contexts/SocketContext";

const Chat = () => {
  const [text, setText] = useState("");
  const { selectedConversation, sendMessage } = useConversations();
  const socket = useSocket();

  const recipients = selectedConversation?.participants.map(
    (participant) => participant.number
  );

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
          <header className="chat-header">
            {selectedConversation.displayName}
          </header>

          <MessagesPanel />

          <MessageForm
            text={text}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
};

export default Chat;
