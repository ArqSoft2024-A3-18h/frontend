import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import gql from 'graphql-tag';

// Definir la consulta GraphQL para obtener el juego por PIN
const GET_GAME_BY_PIN = gql`
  query GetGameByPin($pin: String!) {
    getGameByPin(pin: $pin) {
      _id
      pin
      isRunning
      title
    }
  }
`;

function HomePage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // `useLazyQuery` permite ejecutar la consulta cuando el usuario hace clic
  const [fetchGame, { loading }] = useLazyQuery(GET_GAME_BY_PIN, {
    onCompleted: (data) => {
      if (data.getGameByPin) {
        navigate(`/game/nickname/${pin}`); // Redirige si el juego existe
      } else {
        setError('El juego no existe.'); // Muestra error si no existe
      }
    },
    onError: () => {
      setError('Error al buscar el juego.'); // Error en la consulta
    },
  });

  // Inicializa el motor de partículas con loadSlim
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  // Función para manejar la validación y redirección
  const handleJoinGame = () => {
    if (!pin.trim()) {
      setError('Ingrese un código de juego válido.');
      return;
    }
    setError('');
    fetchGame({ variables: { pin } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fondo animado con tsParticles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#000000" } },
          fpsLimit: 60,
          interactivity: {
            events: { onClick: { enable: true, mode: "push" }, onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { push: { quantity: 4 }, repulse: { distance: 200, duration: 0.4 } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
            collisions: { enable: true },
            move: { enable: true, speed: 2, outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
      />

      {/* Navbar */}
      <nav className="bg-black bg-opacity-50 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <img className="h-30 pt-10 w-auto" src="images/logoWhite.png" alt="Logo de la empresa" />
            </div>
            {/* Botones de Login y Register */}
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                <a href="/login">Login</a>
              </button>
              <button className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                <a href="/register">Register</a>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="flex-grow flex items-center justify-center relative z-10">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">WizQuizz</h1>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 bg-black bg-opacity-50 text-white placeholder-gray-400"
            placeholder="Código del juego"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            onClick={handleJoinGame}
            disabled={loading}
            className={`w-full text-white py-2 px-4 rounded-md transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
