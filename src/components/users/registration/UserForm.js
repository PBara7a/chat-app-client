import { Form, Button } from "react-bootstrap";

const UserForm = ({ handleSubmit, handleChange }) => {
  return (
    <Form className="user-form" onSubmit={handleSubmit}>
      <Form.Control
        className="user-form-input"
        label="First Name"
        variant="outlined"
        name="first_name"
        onChange={handleChange}
      />
      <Form.Control
        className="user-form-input"
        placeholder="Last Name"
        variant="outlined"
        name="last_name"
        onChange={handleChange}
      />
      <Form.Control
        className="user-form-input"
        type="email"
        label="Email"
        variant="outlined"
        name="email"
        onChange={handleChange}
      />
      <Form.Control
        className="user-form-input"
        type="password"
        label="Password"
        variant="outlined"
        name="password"
        onChange={handleChange}
      />
      <Form.Control
        className="user-form-input"
        label="Bio"
        variant="outlined"
        name="biography"
        onChange={handleChange}
      />
      <Form.Control
        className="user-form-input"
        type="url"
        label="GitHub URL"
        variant="outlined"
        name="github_url"
        onChange={handleChange}
      />
      <Form.Control
        className="user-form-input"
        type="url"
        label="Profile URL"
        variant="outlined"
        name="profile_url"
        onChange={handleChange}
      />
      <Button id="user-submit-button" type="submit" variant="contained">
        Submit
      </Button>
    </Form>
  );
};

export default UserForm;
