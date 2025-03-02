import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Game from "./Game";
import { GET_QUESTIONS } from "../utils/queries";




function GameContainer() {
  const [showStartScreen, setShowStartScreen] = useState(true);

  // Usar la consulta con Apollo Client
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    setQuestions(data?.forms[0]?.questions ?? []);
    setTitle(data?.forms[0]?.name ?? "");
    console.log(data?.forms[0]?.questions)
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
        <Game questions={questions} />
      )}
    </div>
  );
}

export default GameContainer;
