/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string; // Aquí pones tus variables
    readonly VITE_SOCKET_URL: string; // Si tienes más variables, añádelas aquí
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }