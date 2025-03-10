import React, { useCallback, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim'; // Importa loadSlim desde tsparticles-slim
import { FcGoogle } from 'react-icons/fc'; // Icono de Google
import { FaFacebook } from 'react-icons/fa'; // Icono de Facebook

function LoginPage() {
  // Estados para capturar el correo y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  

  // Inicializa el motor de partículas con loadSlim
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log('Particles loaded:', container);
  }, []);

  // Función para manejar el inicio de sesión con correo y contraseña
  const handleLogin = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    console.log('Email:', email);
    console.log('Password:', password);
    // Aquí puedes agregar la lógica para autenticar al usuario
  };

  // Función para manejar el inicio de sesión con Google
  const handleGoogleLogin = () => {
    console.log('Iniciar sesión con Google');
    // Aquí puedes agregar la lógica para autenticar con Google
  };

  // Función para manejar el inicio de sesión con Facebook
  const handleFacebookLogin = () => {
    console.log('Iniciar sesión con Facebook');
    // Aquí puedes agregar la lógica para autenticar con Facebook
  };

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
            {/* Botón de Register */}
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                <a href="/register" className='text-white'>Register</a>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="flex-grow flex items-center justify-center relative z-10">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-md text-center w-full max-w-md mx-4">
          <h1 className="text-2xl font-bold mb-6 text-white">Iniciar Sesión</h1>
          <form onSubmit={handleLogin}>
            {/* Campo de Correo Electrónico */}
            <div className="mb-4">
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Campo de Contraseña */}
            <div className="mb-6">
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-black bg-opacity-50 text-white placeholder-gray-400"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Botón de Iniciar Sesión */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Separador */}
          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-400 flex-grow"></div>
            <span className="mx-4 text-gray-400">o</span>
            <div className="border-t border-gray-400 flex-grow"></div>
          </div>

          {/* Botón de Iniciar Sesión con Google */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-100 mb-2"
          >
            <FcGoogle className="mr-2" /> {/* Icono de Google */}
            Iniciar sesión con Google
          </button>

          {/* Botón de Iniciar Sesión con Facebook */}
          <button
            onClick={handleFacebookLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-blue-700"
          >
            <FaFacebook className="mr-2" /> {/* Icono de Facebook */}
            Iniciar sesión con Facebook
          </button>

          {/* Enlace para Registrarse */}
          <p className="mt-4 text-gray-400">
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="text-blue-500 hover:text-blue-400">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;