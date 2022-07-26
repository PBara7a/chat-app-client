import { Form } from "react-bootstrap";

const MessageForm = ({ text, handleChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="m-2">
        <div className="message-area">
          <input
            type="textarea"
            className="input-custom"
            required
            value={text}
            onChange={handleChange}
            style={{ height: "3rem" }}
          />
          <button
            className="btn-custom ms-2"
            type="submit"
            style={{ display: "inline-block" }}
          >
            Send
          </button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
