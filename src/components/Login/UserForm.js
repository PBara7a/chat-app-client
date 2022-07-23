import React, { useState } from "react";
import { Form } from "react-bootstrap";
import client from "../../utils/client";

const UserForm = ({ isRegistered }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      password: formData.password,
      email: formData.email,
    };

    try {
      await client.post("/users", newUser, false);
    } catch (e) {
      console.error(e.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isRegistered && (
        <Form.Group className="mb-3">
          <input
            className="input-custom mb-1"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            name="firstName"
            onChange={handleChange}
          />

          <input
            className="input-custom"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            name="lastName"
            onChange={handleChange}
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <input
          required
          className="input-custom mb-1"
          type="email"
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />

        <input
          required
          className="input-custom mb-1"
          type="password"
          placeholder="Password"
          value={formData.password}
          name="password"
          onChange={handleChange}
        />

        {!isRegistered && (
          <input
            required
            className="input-custom"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
        )}
      </Form.Group>

      <button type="submit" className="btn-custom form-btn mb-4">
        {isRegistered ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default UserForm;
