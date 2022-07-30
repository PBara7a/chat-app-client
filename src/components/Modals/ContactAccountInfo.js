import { Modal } from "react-bootstrap";
import formatUserName from "../../utils/formatUserName";
import { useUserLoggedIn } from "../contexts/UserLoggedInContext";
import { useContacts } from "../contexts/ContactsContext";
import client from "../../utils/client";

const ContactAccountInfo = ({ closeModal, modalOpen, contact }) => {
  const { user } = useUserLoggedIn();
  const { updateContacts } = useContacts();

  const deleteContact = async () => {
    const data = { number: contact.number };

    try {
      client.patch(`/users/${user.id}/contacts`, data, false);

      await updateContacts();

      closeModal();
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Modal centered show={modalOpen} onHide={closeModal}>
      <Modal.Header style={{ backgroundColor: "#202c33" }} closeButton>
        Profile:
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: "#50a3a2",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        {contact && (
          <>
            <div>Name: {formatUserName(contact)}</div>
            <div>Contact: {contact.number}</div>
          </>
        )}

        <button className="btn-custom w-100 mt-2" onClick={deleteContact}>
          Delete contact
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default ContactAccountInfo;
