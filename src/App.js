import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Dashboard from "./components/Dashboard";
import AuthenticateUser from "./components/Auth/AuthenticateUser";
import { UserLoggedInContext } from "./components/contexts/UserLoggedInContext";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  return (
    <UserLoggedInContext.Provider value={{ userId, setUserId }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route element={<AuthenticateUser redirectPath={"/"} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </UserLoggedInContext.Provider>
  );
}

export default App;
