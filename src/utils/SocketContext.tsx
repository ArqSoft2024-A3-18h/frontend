import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Define la URL del servidor de sockets

// const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
// console.log(SOCKET_SERVER_URL);
interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  // useEffect(() => {
  //   console.log(import.meta.env.VITE_SOCKET_SERVER_URL);

  //   const newSocket = io(SOCKET_SERVER_URL /*, { transports: ["websocket"] }*/);
  //   newSocket.emit("joingame", {
  //     pin: "123",
  //     email: "juanito@ju.c",
  //     nick: "juanito",
  //   });
  //   newSocket.on("connect", () => {
  //     console.log("🔗 Conectado al servidor de Socket.IO");
  //   });

  //   newSocket.on(
  //     "updateLeaderboard",
  //     (data: {
  //       gameId: string;
  //       leaderboard: any;
  //       updatePlayer: any;
  //       player: string;
  //     }) => {
  //       console.log("Nuevo evento updateLeaderboard recibido:", data);
  //       //setPlayers((prevPlayers) => [...prevPlayers, data.player]); // Agregar solo el nombre del jugador a la lista
  //     }
  //   );

  //   newSocket.on("disconnect", () => {
  //     console.log("Desconectado del servidor de Socket.IO");
  //   });

  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook para usar el contexto en cualquier componente
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket debe ser usado dentro de un SocketProvider");
  }
  return context;
};
