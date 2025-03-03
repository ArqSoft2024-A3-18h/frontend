import React from "react";
import Leaderboard from "../components/Leaderboard";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

// Definir la mutación GraphQL corregida
const FINISH_GAME_MUTATION = gql`
  mutation FinishGame($pin: String!) {
    finishGame(pin: $pin) {
      game {
        _id
        isRunning
      }
      message
    }
  }
`;

const AdminLeaderboardPage = () => {
  const { pin } = useParams<{ pin: string }>(); // Obtener el PIN desde la URL
  const navigate = useNavigate();

  // Hook para ejecutar la mutación
  const [finishGame, { loading, error }] = useMutation(FINISH_GAME_MUTATION);

  // Función para manejar la terminación del juego
  const handleEndGame = async () => {
    if (!pin) {
      console.error("Error: No se encontró un PIN válido.");
      return;
    }

    try {
      const { data } = await finishGame({
        variables: { pin }, // Pasar el PIN a la mutación
      });

      if (data?.finishGame?.message) {
        console.log("Juego terminado:", data.finishGame.message);
        // Redirigir al administrador al dashboard
        // navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Error al terminar el juego:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      {/* Leaderboard */}
      {/* <Leaderboard /> */}

      {/* Mostrar error si ocurre */}
      {error && <p className="text-red-500 mt-2">Error al terminar el juego</p>}

      {/* Botón Terminar */}
      <button
        onClick={handleEndGame}
        disabled={loading}
        className={`mt-6 px-6 py-3 text-white text-lg font-bold rounded-lg shadow-md transition ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {loading ? "Terminando..." : "Terminar"}
      </button>
    </div>
  );
};

export default AdminLeaderboardPage;
