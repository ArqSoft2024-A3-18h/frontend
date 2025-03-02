import React from 'react';
import GamePreviewPage from './GamePreviewPage';
import { useNavigate, useParams } from 'react-router-dom';

const AdminGamePreviewPage: React.FC = () => {
  const { pin } = useParams<{ pin: string }>();
  const navigate = useNavigate();

  const handleStartGame = () => {
    // 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black p-4">
      {/* Renderiza GamePreviewPage */}
      <GamePreviewPage />

      {/* Botón Start */}
      <button
        onClick={handleStartGame}
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Start
      </button>
    </div>
  );
};

export default AdminGamePreviewPage;