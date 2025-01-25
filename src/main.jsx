import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import client from "apolloClient";

// Obtén el contenedor principal de tu aplicación
const container = document.getElementById("root");

// Usa createRoot para renderizar tu aplicación
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
