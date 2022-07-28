import { Form } from "react-bootstrap";

const MessageForm = ({ text, handleChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="">
        <div className="message-area m-2">
          <input
            type="textarea"
            className="input-custom"
            required
            value={text}
            onChange={handleChange}
          />
          <button className="btn-custom ms-1" type="submit">
            Send
          </button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
