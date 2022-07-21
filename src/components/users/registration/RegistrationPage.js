import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import UserForm from "./UserForm";
// import userBlankData from "../utils/userHelpers";
// import client from "../../../utils/client";
// import { loggedInUserContext } from "../../../Helper/loggedInUserContext";
// import "./style.css";
// import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [user, setUser] = useState();
  const [errorResponse, setErrorResponse] = useState({ status: "" });

  // const { setLoggedInUser } = useContext(loggedInUserContext);
  // let navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();
    // client
    //   .post("/user", user, false)
    //   .then((res) => {
    //     localStorage.setItem(
    //       process.env.REACT_APP_USER_TOKEN,
    //       res.data.data.token
    //     );
    //     localStorage.setItem(
    //       "loggedInUser",
    //       JSON.stringify(res.data.data.user)
    //     );
    //     setLoggedInUser(res.data.data.user);
    //     navigate("../home", { replace: true });
    //   })
    //   .catch((err) => {
    //     setErrorResponse(err.response);
    //   });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({ ...user, [name]: value });
  };

  return (
    <div className="registration-page">
      {/* <Link id="user-registration-link" to="/register">
        sign up
      </Link>
      <Link id="user-login-link" to="/login">
        login
      </Link> */}
      <h1>Sign up</h1>
      <p>{errorResponse.status === 400 && errorResponse.data.data.email}</p>
      <UserForm handleChange={handleChange} handleSubmit={registerUser} />
    </div>
  );
};

export default RegistrationPage;
