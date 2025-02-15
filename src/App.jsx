import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Router from "./Router/Router";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NicknamePage from "./pages/NickNamePage";
import GamePreviewPage from "./pages/GamePreviewPage";
import HomePage from "./pages/HomePage"
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00EFFF',
      light: '#33f2ff',
      dark: '#00a7b2'
    },
    secondary: {
      main: '#FF4DF5',
      light: '#ff70f7',
      dark: '#b235ab'
    }
  },
});
function App() {
  /**
   * para LUISDA:
   * cuando haga lo del login valide el login para acceder a las rutas del admin
   */
  const isLogged = true;
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="app">
        <BrowserRouter>
          <Routes>
            {/* Página de inicio */}
            <Route path="/" element={<HomePage />} />

            {/* Protege las rutas dentro de '/my' */}
            {isLogged ? (
              <Route path='my/*' element={<Router />} />
            ) : (
              <Route path='my/*' element={<Navigate to='/login' />} />
            )}
            <Route path="/game/nickname/:pin" element={<NicknamePage/>} />
            <Route path="/game/preview/:pin" element={<GamePreviewPage />} />
          </Routes>
          
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
