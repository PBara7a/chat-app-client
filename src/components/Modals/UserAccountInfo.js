import { Modal } from "react-bootstrap";
import { useUserLoggedIn } from "../contexts/UserLoggedInContext";

const UserAccountInfo = ({ closeModal, modalOpen }) => {
  const { user } = useUserLoggedIn();
  const name = `${user?.first_name} ${user?.last_name[0]}.`;

  return (
    <Modal centered show={modalOpen} onHide={closeModal}>
      <Modal.Header style={{ backgroundColor: "#202c33" }} closeButton>
        My profile:
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: "#50a3a2",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <div>Name: {name}</div>
        <div>Contact: {user?.number}</div>
      </Modal.Body>
    </Modal>
  );
};

export default UserAccountInfo;
