import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Dashboard from "./components/Dashboard";
import AuthenticateUser from "./components/Auth/AuthenticateUser";
import { UserLoggedInContextProvider } from "./components/contexts/UserLoggedInContext";
import { ContactsContextProvider } from "./components/contexts/ContactsContext";

function App() {
  return (
    <UserLoggedInContextProvider>
      <ContactsContextProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route element={<AuthenticateUser redirectPath={"/"} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </ContactsContextProvider>
    </UserLoggedInContextProvider>
  );
}

export default App;
