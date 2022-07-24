import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Dashboard from "./components/Dashboard";
import AuthenticateUser from "./components/Auth/AuthenticateUser";

function App() {
  const [userId, setUserId] = useState();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage setIdOnLogin={setUserId} />} />

        <Route element={<AuthenticateUser redirectPath={"/"} />}>
          <Route path="/dashboard" element={<Dashboard id={userId} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
