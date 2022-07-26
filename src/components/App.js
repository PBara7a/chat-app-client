import "../styles/app.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import Dashboard from "./Dashboard";
import AuthenticateUser from "./Auth/AuthenticateUser";
import { UserLoggedInContextProvider } from "./contexts/UserLoggedInContext";
import { ContactsContextProvider } from "./contexts/ContactsContext";
import { ConversationsContextProvider } from "./contexts/ConversationsContext";

function App() {
  return (
    <UserLoggedInContextProvider>
      <ContactsContextProvider>
        <ConversationsContextProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route element={<AuthenticateUser redirectPath={"/login"} />}>
                <Route path="/" element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </ConversationsContextProvider>
      </ContactsContextProvider>
    </UserLoggedInContextProvider>
  );
}

export default App;
