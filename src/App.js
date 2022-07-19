import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3030");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  useEffect(() => {
    socket.on("received-message", (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat-message", { message, room });
  };

  const joinRoom = () => {
    if (room) {
      socket.emit("join-room", room);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message") {
      setMessage(value);
    } else if (name === "room") {
      setRoom(value);
    }
  };

  return (
    <div className="App">
      <input type="text" name="room" value={room} onChange={handleChange} />
      <button onClick={joinRoom}>Join</button>
      <div>messages</div>
      <form>
        <input
          type="text"
          name="message"
          value={message}
          onChange={handleChange}
        />
        <button onClick={sendMessage} type="submit">
          Send
        </button>
      </form>
      <div>
        <h1>Message:</h1>
        {messageReceived}
      </div>
    </div>
  );
}

export default App;
