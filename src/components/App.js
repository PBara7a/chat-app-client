import "../styles/app.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import Dashboard from "./Dashboard";
import AuthenticateUser from "./Auth/AuthenticateUser";
import { UserLoggedInContextProvider } from "./contexts/UserLoggedInContext";
import { ContactsContextProvider } from "./contexts/ContactsContext";
import { ConversationsContextProvider } from "./contexts/ConversationsContext";
import { SocketContextProvider } from "./contexts/SocketContext";

function App() {
  return (
    <UserLoggedInContextProvider>
      <ContactsContextProvider>
        <ConversationsContextProvider>
          <SocketContextProvider>
            <div className="App">
              <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route element={<AuthenticateUser redirectPath={"/login"} />}>
                  <Route path="/" element={<Dashboard />} />
                </Route>
              </Routes>
            </div>
          </SocketContextProvider>
        </ConversationsContextProvider>
      </ContactsContextProvider>
    </UserLoggedInContextProvider>
  );
}

export default App;
