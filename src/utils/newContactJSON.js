const newContactJSON = (userId, nameRef, contactRef) => ({
  user_id: Number(userId),
  name: nameRef.current.value,
  contact_number: Number(contactRef.current.value),
});

export default newContactJSON;
