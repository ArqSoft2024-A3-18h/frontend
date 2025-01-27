import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Game from "./pages/Game";

const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      _id
      text
      rawData
      options {
        _id
        text
        isAnswer
      }
      createdAt
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
  


function App() {
  const [showStartScreen, setShowStartScreen] = useState(true);

  // Usar la consulta con Apollo Client
  const { loading, error, data } = useQuery(GET_QUESTIONS);

  const handleStartClick = () => {
    setShowStartScreen(false); // Ocultar la pantalla inicial al hacer clic en "Comenzar"
  };

  if (loading) return <p>Cargando preguntas...</p>;
  if (error) return <p>Error al cargar preguntas: {error.message}</p>;
  if (!data || !data.questions || data.questions.length === 0) // caso en el que data sea undefined
    return <p>No se encontraron preguntas.</p>;

  return (
    <div className="App">
      {showStartScreen ? (
        <div className="start-screen">
          <h1>Welcome</h1>
          <button onClick={handleStartClick}>Comenzar</button>
        </div>
      ) : (
        <Game questions={data.questions} />
      )}
    </div>
  );
}

export default App;
