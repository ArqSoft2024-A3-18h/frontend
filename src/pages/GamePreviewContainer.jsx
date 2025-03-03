import React, { useEffect, useState } from "react";
import GamePreviewPage from "./GamePreviewPage";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

const socket = io('http://localhost:8080'); 
const   GamePreviewContainer = () => {
    const [game, setGame] = useState({});
    const { pin } = useParams(); // Obtiene el pin desde la URL
    const navigate = useNavigate();

    useEffect(() => {
        if (game && game?.pin === pin && game.isRunning) {
            navigate(`/game/${pin}`);
        }
    }, [game]);
    useEffect(() => {
        // Escucha el evento 'gameStatus' y actualiza el estado
        const handleGameStatus = (newGame) => {
            setGame(newGame);
        };

        socket.on("gameStatus", handleGameStatus);

        // Función de limpieza (cleanup) para evitar fugas de memoria
        return () => {
            socket.off("gameStatus", handleGameStatus);
        };
    }, []);
    return(
        <GamePreviewPage/>
    )
}

export default GamePreviewContainer;