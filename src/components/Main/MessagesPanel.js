import { useContacts } from "../contexts/ContactsContext";
import { useConversations } from "../contexts/ConversationsContext";
import { useUserLoggedIn } from "../contexts/UserLoggedInContext";
import getMessageSender from "../../utils/getMessageSender";
import { useCallback } from "react";

const MessagesPanel = () => {
  const { messages } = useConversations();
  const { id } = useUserLoggedIn();
  const { contacts } = useContacts();
  const setLastMessageRef = useCallback((messageDiv) => {
    if (messageDiv) {
      messageDiv.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="msg-panel d-flex flex-column align-items-start">
      {messages.map((message, i) => {
        const lastMessage = messages.length - 1 === i;
        return (
          <div
            key={message.id}
            ref={lastMessage ? setLastMessageRef : null}
            className={`my-1 d-flex flex-column ${
              message.senderId === id ? "align-self-end" : ""
            }`}
          >
            <div
              className={`rounded px-2 py-1 ${
                message.senderId === id ? "message-me" : "message-others"
              }`}
            >
              {message.text}
            </div>
            <div
              className={`text-muted small ${
                message.senderId === id ? "text-end" : "text-start"
              }`}
            >
              {getMessageSender(message, id, contacts)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesPanel;
