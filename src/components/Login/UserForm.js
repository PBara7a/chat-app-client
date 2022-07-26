import React, { useState } from "react";
import { Form } from "react-bootstrap";
import client from "../../utils/client";
import { useNavigate } from "react-router-dom";
import { useUserLoggedIn } from "../contexts/UserLoggedInContext";

const UserForm = ({ isRegistered }) => {
  const { updateUserId } = useUserLoggedIn();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const passwordsMatch = formData.password === confirmPassword;

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isRegistered && passwordsMatch) {
      await registerUser();
      login();
    } else if (isRegistered) {
      login();
    }
  };

  const registerUser = async () => {
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

  const login = async () => {
    const user = { email: formData.email, password: formData.password };

    try {
      const res = await client.post("/", user, false);

      localStorage.setItem("userId", res.data.data.user.id);
      updateUserId(localStorage.getItem("userId"));

      localStorage.setItem(
        process.env.REACT_APP_USER_TOKEN,
        res.data.data.token
      );

      navigate("./dashboard", { replace: true });
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
        <Form.Group className="mb-1">
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

      <Form.Group>
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
          <div className="container-confirm-password">
            <input
              required
              className={
                passwordsMatch
                  ? "input-custom"
                  : "input-custom input-custom__wrong"
              }
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
            <Form.Text>
              {!passwordsMatch && "!Passwords do not match"}
            </Form.Text>
          </div>
        )}
      </Form.Group>

      <button type="submit" className="btn-custom w-100 mb-4">
        {isRegistered ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default UserForm;
