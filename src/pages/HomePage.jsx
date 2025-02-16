import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim'; 

function HomePage() {
  // Inicializa el motor de partículas con loadSlim
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log('Particles loaded:', container);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fondo animado con tsParticles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000000", // Fondo negro
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff", // Partículas blancas
            },
            links: {
              color: "#ffffff", // Líneas blancas entre partículas
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2, // Velocidad de movimiento de las partículas
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80, // Número de partículas
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle", // Forma de las partículas
            },
            size: {
              value: { min: 1, max: 5 }, // Tamaño de las partículas
            },
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
              <img
                className="h-30 pt-10 w-auto"
                src="images/logoWhite.png" 
                alt="Logo de la empresa"
              />
            </div>
            {/* Botones de Login y Register */}
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                <a href="/login" style={{color: 'white'}}>Login</a>
              </button>
              <button className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                <a href="/register" style={{color: 'white'}}>Register</a>
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
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 bg-black bg-opacity-50 text-white placeholder-gray-400"
            placeholder="Código del juego"
          />
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;