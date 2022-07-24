import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Dashboard from "./components/Dashboard";
import AuthenticateUser from "./components/Auth/AuthenticateUser";
import { UserLoggedInContext } from "./components/contexts/UserLoggedInContext";
import { ContactsContextProvider } from "./components/contexts/ContactsContext";

export const ContactsContext = React.createContext();

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  return (
    <UserLoggedInContext.Provider value={{ userId, setUserId }}>
      <ContactsContextProvider id={userId}>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route element={<AuthenticateUser redirectPath={"/"} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </ContactsContextProvider>
    </UserLoggedInContext.Provider>
  );
}

export default App;
