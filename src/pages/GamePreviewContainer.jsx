import React, { useEffect, useState } from "react";
import GamePreviewPage from "./GamePreviewPage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSocket } from '../utils/SocketContext';

const GamePreviewContainer = () => {
    const { socket } = useSocket();
    const [game, setGame] = useState({});
    const playerId = localStorage.getItem('playerId');
    const { pin } = useParams(); // Obtiene el pin desde la URL
    const navigate = useNavigate();
    const location = useLocation();
    const {nick} = location.state || {};

    // Redirecciona si el juego ya ha comenzado
    useEffect(() => {
        if (game && game?.pin === pin && game.isRunning) {
            navigate(`/game/${pin}`);
        }
    }, [game]);

    // Escuchar el estado del juego desde el servidor
    // useEffect(() => {
    //     if (!socket) return;

    //     const handleGameStatus = (newGame) => {
    //         setGame(newGame);
    //     };

    //     socket.on("gameStatus", handleGameStatus);

    //     return () => {
    //         socket.off("gameStatus", handleGameStatus);
    //     };
    // }, [socket]);

    // Emitir evento cuando un jugador se une
    useEffect(() => {
        if (!socket || !pin) return;
        console.log()
        console.log(`📡 Emitiendo joingame para el pin: ${pin}`, nick, playerId);
        socket.emit("joingame", { pin, userId:playerId, nick: nick   });

    }, [socket, pin]); 

    return <GamePreviewPage />;
};

export default GamePreviewContainer;
