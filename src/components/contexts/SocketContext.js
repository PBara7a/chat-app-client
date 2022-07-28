import React, { useContext, useEffect, useState } from "react";
import { useUserLoggedIn } from "./UserLoggedInContext";
import { useConversations } from "./ConversationsContext";
import { io } from "socket.io-client";

const SocketContext = React.createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const { updateConversations } = useConversations();
  const { user } = useUserLoggedIn();
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:3030", {
        query: { number: user.number },
      });

      newSocket.on("received-message", async () => {
        await updateConversations();
      });

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [user, updateConversations]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
