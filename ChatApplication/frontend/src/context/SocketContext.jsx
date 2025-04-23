// src/context/SocketContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {AuthContext} from "./AuthContext"

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user) {
      const newSocket = io("https://portfolio-project-5-d4we.onrender.com");
      console.log("Joining room with ID:", user?.id);
      newSocket.emit("join", user?.id);
      setSocket(newSocket);

      return () => newSocket.disconnect();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
