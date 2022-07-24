import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import isLoggedIn from "../utils/isLoggedIn";

const AuthenticateUser = ({ redirectPath }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default AuthenticateUser;
