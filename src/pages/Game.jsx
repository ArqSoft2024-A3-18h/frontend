import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Game.css'; // Importa estilos
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SEND_ANSWER } from '../utils/queries';
import Leaderboard from '../components/Leaderboard';
import { Modal, Typography } from '@mui/material';

// Barra superior del tiempo (5 segundos inicialmente)
const WhiteLinearProgress = styled(LinearProgress)({
  backgroundColor: '#ffffff', // Fondo blanco de la barra
  borderRadius: '50px',
  height: 10, // Grosor de la barra
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#EDD555', // Color del progreso
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
};

const Game = ({ questions, showLeaderboard }) => {

  const {pin} = useParams()
  const images = ['/icons/circle.svg', '/icons/square.svg', '/icons/triangle.svg', '/icons/x.svg'];
  const colors = ['#FF4DF5', '#00E676', '#00EFFF', '#FF4D4D'];
  const [sendAnswer] = useMutation(SEND_ANSWER);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Indice de la pregunta actual
  const [correctAnswers, setCorrectAnswers] = useState(0); // Respuestas correctas
  const [incorrectAnswers, setIncorrectAnswers] = useState(0); // Respuestas incorrectas

  // Modificadores del popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupImage, setPopupImage] = useState('/images/macaco_triste.jpg');

  // Modal de resultados
  const [showResults, setShowResults] = useState(false);

  // Barra de progreso del tiempo
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);

  useEffect(() => {
    if(!showLeaderboard && !showResults){
      startTimer();

    }
    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex]);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setProgress(100);
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          if(!showLeaderboard && !showResults){
            handleTimeOut();
          }
          
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
    sendAnswerToServer(false, 0); 
    setTimeout(() => {
      setShowPopup(false);
      goToNextQuestion();
    }, 1000);
  };

  const handleAnswerClick = async (selectedOption) => {
    clearInterval(timerRef.current);
    const isCorrect = selectedOption.isAnswer;
    console.log('progress ', progress)
    const timeLeftPercentage = progress / 100; // Proporción del tiempo restante
    const maxPoints = 100;
    const points = isCorrect ? Math.round(maxPoints * timeLeftPercentage) : 0;

    setPopupMessage(isCorrect ? 'Correctooo! :)' : 'Falso :(');
    setPopupImage(isCorrect ? '/images/macaco_feliz.jpg' : '/images/macaco_triste.jpg');

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
    }
    setShowPopup(true);
    console.log('iscorrect ', isCorrect, points)
    await sendAnswerToServer(isCorrect, points); 

    setTimeout(() => {
      setShowPopup(false);
      goToNextQuestion();
    }, 1000);
  };


  const sendAnswerToServer = async (answerIsCorrect, points) => {
    const playerId = localStorage.getItem('playerId');

    if (!pin || !playerId) {
      console.error('Faltan gamePin o playerId en localStorage');
      return;
    }

    try {
      await sendAnswer({
        variables: {
          gamePin: pin,
          playerId,
          answerIsCorrect,
          points,
        },
      });
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
    }
  };


  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true); // Mostrar el modal de resultados
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const shuffledOptions = useMemo(() => {
    return [...currentQuestion.options].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);
  return (
    <div className="flex flex-row">
       {(!showResults && !showLeaderboard)  ? <div className={`question-screen w-3/4 ${showPopup ? 'blur-background' : ''}`}>
        <Box sx={{ width: '100%', marginBottom: '20px' }}>
          <WhiteLinearProgress variant="determinate" value={progress} />
        </Box>

        <h1 className="question-title">{currentQuestion.text}</h1>

        <div className="answers-container">
        {shuffledOptions.map((option, index) => (
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
      </div> : null}
      <div className={`${(showResults | showLeaderboard)  ? 'w-full' : 'w-1/4'}`}>
          <Leaderboard></Leaderboard>
      </div>
      {true && (
        <Modal
          open={showPopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img src={popupImage} alt="imagen" width="300px" />
            <Typography>{popupMessage}</Typography>
            
          </Box>
        </Modal>
      )}
      
    </div>
  );
};

export default Game;
