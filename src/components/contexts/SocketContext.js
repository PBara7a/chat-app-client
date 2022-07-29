import React, { useContext, useEffect, useState } from "react";
import { useUserLoggedIn } from "./UserLoggedInContext";
import { useConversations } from "./ConversationsContext";
import { io } from "socket.io-client";

const SocketContext = React.createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const { updateConversations, setConversationUnread } = useConversations();
  const { user } = useUserLoggedIn();
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:3030", {
        query: { number: user.number },
      });

      newSocket.emit("user-connected", user.number);

      newSocket.on("received-message", async (conversationId) => {
        setConversationUnread(conversationId);

        await updateConversations();
      });

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
