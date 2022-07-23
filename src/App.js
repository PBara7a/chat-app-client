import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Dashboard from "./components/Dashboard";

function App() {
  const [userId, setUserId] = useState();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage setIdOnLogin={setUserId} />} />
        <Route path="/home" element={<Dashboard id={userId} />} />
      </Routes>
    </div>
  );
}

export default App;
