import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Game from "./pages/Game";

const GET_QUESTIONS = gql`
  query Forms {
    forms {
      name
      createdAt
      questions {
        text
        createdAt
        options {
          text
          isAnswer
          createdAt
        }
      }
    }
  }
`;

// Example of a question returned:
// {
//   "_id": "67809885562c77b3996589f8",
//   "text": "This is the first question",
//   "rawData": "6780986e562c77b3996589f4",
//   "options": [
//       {
//           "text": "one",
//           "isAnswer": false,
//           "_id": "67809885562c77b3996589f9"
//       },
//       {
//           "text": "two",
//           "isAnswer": false,
//           "_id": "67809885562c77b3996589fa"
//       },
//       {
//           "text": "three",
//           "isAnswer": false,
//           "_id": "67809885562c77b3996589fb"
//       },
//       {
//           "text": "four",
//           "isAnswer": true,
//           "_id": "67809885562c77b3996589fc"
//       }
//   ],
//   "createdAt": "2025-01-10T03:48:21.857Z",
//   "__v": 0
// }

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
