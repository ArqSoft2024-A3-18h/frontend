import React, { useState, useEffect, useRef } from 'react';
import './Game.css'; // Importa estilos
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

// Barra superior del tiempo (5 segundos inicialmente)
const WhiteLinearProgress = styled(LinearProgress)({
  backgroundColor: '#ffffff', // Fondo blanco de la barra
  borderRadius: '50px',
  height: 10, // Grosor de la barra
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#EDD555', // Color del progreso
  },
});

const Game = ({ questions }) => {

  const images = ['/icons/circle.svg', '/icons/square.svg', '/icons/triangle.svg', '/icons/x.svg'];
  const colors = ['#FF4DF5', '#00E676', '#00EFFF', '#FF4D4D'];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Modificadores del popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupImage, setPopupImage] = useState('/images/macaco_triste.jpg');

  // Barra de progreso del tiempo
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex]);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setProgress(100);
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 2; // Disminuye gradualmente sin saltos
      });
    }, 100);
  };

  const handleTimeOut = () => {
    setPopupMessage('Tiempo agotado :(');
    setShowPopup(true);
    setPopupImage('/images/macaco_triste.jpg');
    setTimeout(() => {
      setShowPopup(false);
      goToNextQuestion();
    }, 1000);
  };

  const handleAnswerClick = (selectedOption) => {
    clearInterval(timerRef.current);
    const isCorrect = selectedOption.isAnswer;
    if (isCorrect) {
      setPopupMessage('Correctooo! :)');
      setPopupImage('/images/macaco_feliz.jpg');
    } else {
      setPopupMessage('Falso :(');
      setPopupImage('/images/macaco_triste.jpg');
    }
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      goToNextQuestion();
    }, 1000);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('¡Has completado todas las preguntas!');
      // Aquí podrías manejar un final de juego
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="app-container">
      <div className={`question-screen ${showPopup ? 'blur-background' : ''}`}>
        <Box sx={{ width: '100%', marginBottom: '20px' }}>
          <WhiteLinearProgress variant="determinate" value={progress} />
        </Box>

        <h1 className="question-title">{currentQuestion.question}</h1>

        <div className="answers-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={option._id}
              className="answer-button"
              style={{ backgroundColor: colors[index] }}
              onClick={() => {
                handleAnswerClick(option);
              }}
            >
              <img src={images[index]} alt={`Icono ${index}`} width="30px" style={{ marginRight: '10px' }} />
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <img src={popupImage} alt="imagen" width="300px" />
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
