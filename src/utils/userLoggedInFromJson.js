const userLoggedInFromJson = (userJSON) => {
  let user;
  if (userJSON) {
    user = {
      id: userJSON.id,
      firstName: userJSON.first_name,
      lastName: userJSON.last_name,
      number: userJSON.number,
      email: userJSON.email,
      contacts: userJSON.contacts,
      conversations: userJSON.conversations,
    };
  }
  return user;
};

export default userLoggedInFromJson;
