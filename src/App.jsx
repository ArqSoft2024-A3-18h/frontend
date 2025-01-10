import React, { useEffect, useState } from 'react';
import Game from './pages/Game';

const formManagementUrl = import.meta.env.VITE_FORM_MANAGEMENT_URL;

function App() {

  const [questions, setQuestions] = useState([]);
  const [showStartScreen, setShowStartScreen] = useState(true);

  useEffect(()=> {

    const fetchQuestions = async () => {
      const call = await fetch(`${formManagementUrl}/question`);
      const questions = (await call.json()).questions;

      setQuestions(questions)
    }
    fetchQuestions()
  },[])

  useEffect(()=>{
    console.log(questions)
  },[questions])

  const handleStartClick = () => {
    setShowStartScreen(false); // Ocultar la pantalla inicial al hacer clic en "Comenzar"
  };

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
  
  return (
    <div className="App">
      {showStartScreen ? (
        <div className="start-screen">
          <h1>Welcome</h1>
          <button onClick={handleStartClick}>Comenzar</button>
        </div>
      ) : (
        <Game questions={questions} />
      )}
    </div>
  );
}

export default App;