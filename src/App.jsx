import React, { useEffect, useState } from 'react';
import Game from './pages/Game';

const formManagementUrl = import.meta.env.VITE_FORM_MANAGEMENT_URL;

function App() {

  const [questions, setQuestions] = useState([]);

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
  // Ejemplo de datos de preguntas para probar el componente
  const sampleQuestions = [
    {
      question: '¿Quién fundó Facebook?',
      answers: ['Mark Zuckerberg', 'Bill Gates', 'Elon Musk', 'Steve Jobs'],
      correctAnswer: 'Mark Zuckerberg',
    },
    {
      question: '¿Qué lenguaje utiliza React?',
      answers: ['JavaScript', 'Python', 'C++', 'Java'],
      correctAnswer: 'JavaScript',
    },
  ];
  
  return (
    <div className="App">
      <Game questions={questions} />
    </div>
  );
}

export default App;