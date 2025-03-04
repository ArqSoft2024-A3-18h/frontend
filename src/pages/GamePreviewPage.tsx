// src/pages/GamePreviewPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useSocket } from '../utils/SocketContext';


const GamePreviewPage: React.FC = () => {
  const { socket } = useSocket();
  const { pin } = useParams<{ pin: string }>();
  const location = useLocation();
  const { leaderboard, formId } = location.state || {};

  const [players, setPlayers] = useState<string[]>([]); // Lista de jugadores

  // useEffect(() => {
  //   if (!socket) return;
  //   // Unirse al canal del juego con el pin
    

  //   socket.on("updateLeaderboard", (data) => {
  //     console.log("✅ Evento recibido en GamePreviewPage:", data);
  //     setPlayers((prevPlayers) => [...prevPlayers, data.player]); 
  //   });
    
  //   return () => {
  //     socket.off("game-event"); // Limpiar conexión cuando el componente se desmonta
  //   };
  // }, [socket]);

  // useEffect(()=> {
  //   if (!socket) return;
  //   socket.emit('joingame', pin);
  // },[])

  // useEffect(() => {
  //   if (!socket) return;
  
  //   const handleUpdateLeaderboard = (data) => {
  //     console.log("✅ Evento recibido en GamePreviewPage:", data);
  //     setPlayers((prevPlayers) => [...prevPlayers, data.player]);
  //   };
  
  //   socket.on("updateLeaderboard", handleUpdateLeaderboard);
  
  //   return () => {
  //     socket.off("updateLeaderboard", handleUpdateLeaderboard); // ✅ Desuscripción correcta
  //   };
  // }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black p-4">
      {/* Título */}
      <h1 className="text-3xl font-bold text-white mb-8">Nombre formulario</h1>

      {/* Caja grande con el código del juego */}
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Código del juego:</h2>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-4xl font-mono text-white">{pin}</p>
        </div>
      </div>

      {/* Lista de jugadores que se van uniendo */}
      <div className="mt-6 w-full max-w-3xl bg-gray-900 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Jugadores Conectados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {players.map((player, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg text-center text-white">
              {player}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePreviewPage;
