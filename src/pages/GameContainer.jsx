import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Game from "./Game";
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSocket } from '../utils/SocketContext';

const GET_QUESTIONS = gql`
  query GetFormById($id: ID) {
  getFormById(_id: $id) {
    _id
    name
    userId
    questions {
      _id
      text
      options {
        text
        isAnswer
        createdAt
      }
      createdAt
    }
    createdAt
  }
}
`;


function GameContainer() {
  const { socket } = useSocket();
  const location = useLocation();
  const { pin } = useParams();
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  // Usar la consulta con Apollo Client
  const formId = localStorage.getItem("formId"); 
  const [game, setGame] = useState(null);
  // useEffect(() => {
  //   const handleGameStatus = (newGame) => {
  //     setGame(newGame);
  //   };

  //   socket.on("gameStatus", handleGameStatus);

  //   return () => {
  //     socket.off("gameStatus", handleGameStatus);
  //   };
  // }, []);

  useEffect(() => {
    if (game && game.pin === pin && !game.isRunning) {
      setShowLeaderboard(true)
    }
  }, [game]);
  const { loading, error, data } = useQuery(GET_QUESTIONS, {
    variables: { id: formId },
    skip: !formId,
  });
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    setQuestions(data?.getFormById?.questions ?? []);
    setTitle(data?.getFormById?.name ?? "");
    console.log(data?.getFormById?.questions)
  }, [data]);

  const handleStartClick = () => {
    setShowStartScreen(false); // Ocultar la pantalla inicial al hacer clic en "Comenzar"
  };

  if (loading) return <p>Cargando preguntas...</p>;
  if (error) return <p>Error al cargar preguntas: {error.message}</p>;
  if (!data || !questions || questions.length === 0) {
    return <div className="App">
      <p>No se encontraron preguntas</p>
    </div>;

  }

  return (
    <div className="App">
      {showStartScreen ? (
        <div className="start-screen">
          <h1>{title}</h1>
          <button onClick={handleStartClick}>Comenzar</button>
        </div>
      ) : (
        <Game questions={questions} showLeaderboard={showLeaderboard} />
      )}
    </div>
  );
}

export default GameContainer;
