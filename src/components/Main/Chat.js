import React, { useState } from "react";
import { useConversations } from "../contexts/ConversationsContext";
import { Form } from "react-bootstrap";

const Chat = () => {
  const { selectedConversation } = useConversations();
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="chat d-flex flex-column flex-grow-1"
      style={{ width: "1100px", height: "95vh" }}
    >
      {selectedConversation && (
        <>
          <div className="chat-header"></div>
          <div className="flex-grow-1 overflow-auto"></div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="m-2">
              <div className="message-area">
                <input
                  type="textarea"
                  className="input-custom"
                  required
                  value={text}
                  onChange={handleChange}
                  style={{ height: "3rem" }}
                />
                <button
                  className="btn-custom ms-2"
                  type="submit"
                  style={{ display: "inline-block" }}
                >
                  Send
                </button>
              </div>
            </Form.Group>
          </Form>
        </>
      )}
    </div>
  );
};

export default Chat;
