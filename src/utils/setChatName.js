import formatUserName from "./formatUserName";

const setChatName = (chat, user, contacts) => {
  if (chat.name !== formatUserName(user)) return chat.name;

  const contactSaved = contacts.find((contact) => contact.id === chat.owner_id);
  if (contactSaved) return formatUserName(contactSaved);

  const senderNumber = chat.messages[0]?.sender.number;
  return senderNumber || "unknown";
};

export default setChatName;
