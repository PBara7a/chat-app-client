import { useContacts } from "../contexts/ContactsContext";
import { useConversations } from "../contexts/ConversationsContext";
import { useUserLoggedIn } from "../contexts/UserLoggedInContext";
import getMessageSender from "../../utils/getMessageSender";
import { useCallback, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import MessageOptions from "../Modals/MessageOptions";

const MessagesPanel = () => {
  const [modal, setModal] = useState({ open: false, messageId: null });
  const { messages } = useConversations();
  const { id } = useUserLoggedIn();
  const { contacts } = useContacts();
  const setLastMessageRef = useCallback((messageDiv) => {
    if (messageDiv) {
      messageDiv.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const closeModal = () => setModal({ open: false, id: null });

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
              <div className="d-flex flex-row-reverse">
                <AiOutlineCaretDown
                  className="message__options"
                  onClick={() =>
                    setModal({ open: true, messageId: message.id })
                  }
                />
              </div>
              {message.isGif ? (
                <img src={message.text} />
              ) : (
                <p>{message.text}</p>
              )}
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
      <MessageOptions closeModal={closeModal} modal={modal} />
    </div>
  );
};

export default MessagesPanel;
