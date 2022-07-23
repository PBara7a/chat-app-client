import React, { useState } from "react";
import { Container } from "react-bootstrap";
import UserForm from "./UserForm";

const LoginPage = ({ setIdOnLogin }) => {
  const [isRegistered, setIsRegistered] = useState(true);

  return (
    <Container>
      <Container className="mb-5">
        <h1>Chat in the Box</h1>
      </Container>

      <UserForm isRegistered={isRegistered} setIdOnLogin={setIdOnLogin} />
      {isRegistered && (
        <>
          <span>Not registered yet?</span>
          <button
            className="btn-custom form-btn"
            onClick={() => setIsRegistered(!isRegistered)}
          >
            Sign up!
          </button>
        </>
      )}
      {!isRegistered && (
        <>
          <div className="mb-2">Already registered?</div>
          <button
            className="btn-custom form-btn"
            onClick={() => setIsRegistered(!isRegistered)}
          >
            Sign in!
          </button>
        </>
      )}
    </Container>
  );
};

export default LoginPage;
