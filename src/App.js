import "./App.css";
import SocketIOExample from "./components/SocketIOExamlple";
import LoginPage from "./components/Login/LoginPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<SocketIOExample />} />
      </Routes>
    </div>
  );
}

export default App;
