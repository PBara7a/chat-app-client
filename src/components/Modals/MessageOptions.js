import { Modal, Form } from "react-bootstrap";
import client from "../../utils/client";

const MessageOptions = ({ closeModal, modal }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await client.delete(`/messages/${modal.messageId}`, false);

      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal centered show={modal.open} onHide={closeModal}>
      <Modal.Header style={{ backgroundColor: "#202c33" }} closeButton>
        Message options:
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: "#50a3a2",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <button className="btn-custom w-100">Delete</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MessageOptions;
