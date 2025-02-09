import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import UserLogueado from "./Router/Router";

function App() {
  /**
   * para LUISDA:
   * cuando haga lo del login valide el login para acceder a las rutas del admin
   */
  const isLogged = true;
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Protege las rutas dentro de '/my' */}
          {isLogged ? (
            <Route path='my/*' element={<UserLogueado />} />
          ) : (
            <Route path='my/*' element={<Navigate to='/login' />} />
          )}
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
