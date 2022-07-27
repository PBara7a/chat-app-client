import { useContacts } from "../contexts/ContactsContext";
import { useConversations } from "../contexts/ConversationsContext";
import { useUserLoggedIn } from "../contexts/UserLoggedInContext";

const MessagesPanel = () => {
  const { messages } = useConversations();
  const { id } = useUserLoggedIn();
  const { contacts } = useContacts();

  const msgSender = (message) => {
    const knownContact = contacts.find(
      (contact) => contact.id === message.senderId
    );

    if (knownContact) return knownContact.firstName;

    if (message.senderId === id) return "You";

    return message.sender.number;
  };

  return (
    <div className="msg-panel d-flex flex-column align-items-start px-5">
      {messages.map((message) => (
        <div
          key={message.id}
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
            {msgSender(message)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesPanel;
