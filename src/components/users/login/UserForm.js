import { Form, Button } from "react-bootstrap";

const UserForm = ({ handleSubmit, handleChange, loginError }) => {
  return (
    <Form className="user-form" onSubmit={handleSubmit}>
      <Form.Control
        className="user-form-input"
        type="email"
        variant="outlined"
        name="email"
        onChange={handleChange}
        placeholder="Email"
      />
      <Form.Control
        className="user-form-input"
        type="password"
        variant="outlined"
        name="password"
        onChange={handleChange}
        placeholder="Password"
      />
      {loginError && <div className="error">{loginError}</div>}
      <Button id="user-submit-button" type="submit" variant="contained">
        Submit
      </Button>
    </Form>
  );
};

export default UserForm;
