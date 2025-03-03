import React from "react";
import GamePreviewPage from "./GamePreviewPage";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

// Definir la mutación GraphQL
const START_GAME_MUTATION = gql`
  mutation StartGame($pin: String!) {
    startGame(pin: $pin) {
      game {
        _id
        pin
        isRunning
      }
      message
    }
  }
`;

const AdminGamePreviewPage: React.FC = () => {
  const { pin } = useParams<{ pin: string }>();
  const navigate = useNavigate();

  // Hook para ejecutar la mutación
  const [startGame, { loading, error }] = useMutation(START_GAME_MUTATION);

  // Función para ejecutar la mutación al hacer clic en el botón
  const handleStartGame = async () => {
    try {
      const { data } = await startGame({
        variables: { pin }, // Enviar el PIN como variable
      });

      if (data?.startGame?.game) {
        console.log("Juego iniciado:", data.startGame.game);

        // Redirigir a la página del juego si es necesario
        navigate(`/game/start/${pin}`);
      }
    } catch (err) {
      console.error("Error al iniciar el juego:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black p-4">
      {/* Renderiza GamePreviewPage */}
      <GamePreviewPage />

      {/* Mostrar error si ocurre */}
      {error && <p className="text-red-500 mt-2">Error al iniciar el juego</p>}

      {/* Botón Start */}
      <button
        onClick={handleStartGame}
        disabled={loading} // Deshabilita el botón si está cargando
        className={`mt-6 px-6 py-3 text-white text-lg font-bold rounded-lg shadow-md transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Iniciando..." : "Start"}
      </button>
    </div>
  );
};

export default AdminGamePreviewPage;
