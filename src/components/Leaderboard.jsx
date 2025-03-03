// src/components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';

// const socket = io('http://localhost:7000'); 

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [previousData, setPreviousData] = useState([]); // Guardamos el estado anterior para comparar

  // useEffect(() => {
  //   // Escucha actualizaciones del servidor WebSocket
  //   socket.on('updateLeaderboard', (newData) => {
  //     setPreviousData(data); // Guardamos los datos actuales antes de actualizar
  //     setData(newData); // Actualizamos con los nuevos datos
  //   });

  //   // Limpieza al desmontar el componente
  //   return () => {
  //     socket.off('updateLeaderboard');
  //   };
  // }, [data]);

  // Colores para las filas
  const rowColors = ['#FF4DF5', '#00E676', '#00EFFF', '#FF4D4D'];

  // Función para determinar si un usuario subió o bajó en el ranking
  const getRankChange = (nickname) => {
    const previousIndex = previousData.findIndex((user) => user.nickname === nickname);
    const currentIndex = data.findIndex((user) => user.nickname === nickname);

    if (previousIndex === -1 || currentIndex === -1) return 'none'; // Usuario nuevo o eliminado
    if (currentIndex < previousIndex) return 'up'; // Subió en el ranking
    if (currentIndex > previousIndex) return 'down'; // Bajó en el ranking
    return 'none'; // No hubo cambio
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Leaderboard
        </h1>
        <div className="space-y-3"> {/* Espacio entre filas */}
            {/* Fila de encabezado */}
          <div className="flex justify-between items-center p-4 rounded-xl bg-gray-800">
            <span className="text-lg font-medium text-white">
              Nickname
            </span>
            <span className="text-lg font-medium text-white">
              Score
            </span>
          </div>

          {/* Filas del leaderboard */}
          <AnimatePresence>
            {data.map((user, index) => {
              const rowColor = rowColors[index % rowColors.length]; // Ciclo de colores
              const rankChange = getRankChange(user.nickname); // Determina si subió o bajó

              return (
                <motion.div
                  key={user.nickname} // Usamos el nickname como clave única
                  initial={{ opacity: 0, y: rankChange === 'up' ? -20 : rankChange === 'down' ? 20 : 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-between items-center p-4 rounded-xl shadow-lg"
                  style={{ backgroundColor: rowColor }}
                >
                  <span className="text-lg font-medium text-gray-900">
                    {user.nickname}
                  </span>
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-900">
                      {user.score}
                    </span>
                    {rankChange === 'up' && (
                      <span role="img" aria-label="up" className="ml-2">
                        ⬆️
                      </span>
                    )}
                    {rankChange === 'down' && (
                      <span role="img" aria-label="down" className="ml-2">
                        ⬇️
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;