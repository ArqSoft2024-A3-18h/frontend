import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Game from "./Game";
import { useLocation } from "react-router-dom";

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
  const [showStartScreen, setShowStartScreen] = useState(true);
  const location = useLocation()
  const formsId = location.state?.formsId ?? '67c4b02491ab86b726f52a90';
  // Usar la consulta con Apollo Client
  const { loading, error, data } = useQuery(GET_QUESTIONS, {
    variables: { id: formsId },
    skip: !formsId,
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
        <Game questions={questions} />
      )}
    </div>
  );
}

export default GameContainer;
