import React, { useState } from "react";
import UserForm from "./UserForm";

const LoginPage = () => {
  const [isRegistered, setIsRegistered] = useState(true);

  return (
    <>
      <div className="mb-5">
        <h1>Chat in the Box</h1>
      </div>

      <UserForm isRegistered={isRegistered} />
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
    </>
  );
};

export default LoginPage;
