import React from 'react';
import Game from './pages/Game';

function App() {

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
      <Game questions={sampleQuestions} />
    </div>
  );
}

export default App;