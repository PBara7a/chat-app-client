const getMessageSender = (message, userId, contacts) => {
  if (message.senderId === userId) return "You";

  const knownContact = contacts.find(
    (contact) => contact.id === message.senderId
  );

  if (knownContact) return knownContact.firstName;

  return message.sender.number;
};

export default getMessageSender;
