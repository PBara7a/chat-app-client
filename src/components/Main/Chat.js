import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsContext";
import MessageForm from "./MessageForm";
import MessagesPanel from "./MessagesPanel";

const Chat = () => {
  const [text, setText] = useState("");
  const { selectedConversation, sendMessage } = useConversations();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(text);
    setText("");
  };

  return (
    <>
      {selectedConversation && (
        <div className="chat">
          <header className="chat-header">{selectedConversation.name}</header>

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
