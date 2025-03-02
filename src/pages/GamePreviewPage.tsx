// src/pages/GamePreviewPage.tsx
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const GamePreviewPage: React.FC = () => {
  // Obtener el parámetro `pin` de la URL
  const { pin } = useParams<{ pin: string }>();
  const location = useLocation();
  const { nickname, leaderboard } = location.state || {};
  console.log('leader ', leaderboard)
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black p-4">
      {/* Título */}
      <h1 className="text-3xl font-bold text-white mb-8">
        Nombre formulario
      </h1>

      {/* Caja grande con el código */}
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Código del juego:
        </h2>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-4xl font-mono text-white">
            {pin}
          </p>
        </div>
      </div>

      {/* Botón Start */}
      <button
        className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
      >
        Start
      </button>
    </div>
  );
};

export default GamePreviewPage;