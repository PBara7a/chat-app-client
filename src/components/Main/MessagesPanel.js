import { useContacts } from "../contexts/ContactsContext";
import { useConversations } from "../contexts/ConversationsContext";
import { useUserLoggedIn } from "../contexts/UserLoggedInContext";
import getMessageSender from "../../utils/getMessageSender";
import { useCallback } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";

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
              className={`message px-2 pt-1 pb-2 ${
                message.senderId === id
                  ? "message__from-me"
                  : "message__from-others"
              }`}
            >
              <div
                className={`d-flex ${
                  message.senderId === id ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <AiOutlineCaretDown className="message__options" />
              </div>
              <p>{message.text}</p>
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
