import React , { useEffect, useState } from "react";
import FileUploadPopover from "./FileUploaderPopover";
import Loading from "react-loading";
import pdfToText from 'react-pdftotext';
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_FORM, CREATE_QUESTIONS } from "../utils/queries";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import { 
  TextField, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box
} from "@mui/material";

const NewForms = () => {
  const navigate = useNavigate();


  let [isOpen, setIsOpen] = useState(true)
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount ] = useState<number>(0);
  const [errorName, setErrorName] = useState<boolean>(false);
  const [pdfText, setPdfText] = useState<string>("");
  const [formName, setFormName] = useState<string>("");
  const [fetchQuestions, { data, loading, error }] = useLazyQuery(CREATE_QUESTIONS, {
    onCompleted: (data) => {
      if (data?.createQuestions) {
        // 🔹 Eliminar __typename tanto de las preguntas como de las opciones
        const sanitizedQuestions = data.createQuestions.map(({ __typename, options, ...question }) => ({
          ...question, // Mantiene otras propiedades de la pregunta
          options: options.map(({ __typename, ...option }) => option), // Elimina __typename de cada opción
        }));
  
        setQuestions(sanitizedQuestions);
        setIsLoading(false);
      }
    },
  });
  const [createForm, {}] = useMutation(CREATE_FORM);


  const [questions, setQuestions] = useState<any[]>([]);
 
  function extractText(file: File) {
    setIsLoading(true);
    pdfToText(file)
        .then((text) => {
          setPdfText(text);
          handleFetchQuestions(text, questionCount )
        })
        .catch(error => console.error("Failed to extract text from pdf"))
  }

  const handleFetchQuestions = async (content: string, numQuestions: number) => {
      fetchQuestions({
        variables: { content, numQuestions },
      });
  };
  function closeModal() {
    setIsOpen(false)
  }
  
  function createQuestions () {
    if (files.length > 0 && questionCount>0 ){

      setTimeout(()=> {
        closeModal()
        extractText(files[0]);
      },400)
    }
  }
  const handleQuestionChange = (index: number, newText: string) => {
    setQuestions(prev => 
      prev.map((question, qIdx) => 
        qIdx !== index ? question : { ...question, text: newText }
      )
    );
  };
  const handleOptionChange = (qIndex: number, oIndex: number, newText: string) => {
    setQuestions(prev => 
      prev.map((question, qIdx) => 
        qIdx !== qIndex ? question : {
          ...question,
          options: question.options.map((opt, oIdx) => 
            oIdx !== oIndex ? opt : { ...opt, text: newText }
          ),
        }
      )
    );
  };

  const handleCorrectAnswerChange = (qIndex: number, selectedOptionIndex: number) => {
    setQuestions(prev => {
      return prev.map((question, qIdx) => {
        if (qIdx !== qIndex) return question; // No modificar otras preguntas
  
        return {
          ...question,
          options: question.options.map((opt, idx) => ({
            ...opt, // Crear una copia del objeto
            isAnswer: idx === selectedOptionIndex, // Actualizar isAnswer
          })),
        };
      });
    });
  };

  const handleSaveQuestions = async () => {
    if (formName.length < 1) {
      setErrorName(true)
      return 
    }
    try {
      await createForm({variables: {name: formName, userId: "1", questions}});
      navigate("/my/forms")

    } catch (err) {
      console.error("Error al crear el formulario:", err);
    }
  };


  return(

    <>
      {isLoading ? (
        <div  className="w-full h-full items-center justify-center flex">
          <div className="flex justify-center flex-col items-center">
            <Loading type="spinningBubbles" color="white" height={80} width={80} />
            <h1 className="text-white"> procesando...</h1> 
          </div>

        </div>
      ) : questions.length > 0 ? (
        <div className="overflow-y-scroll w-full h-full">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-2 ">
            <Typography variant="h4" gutterBottom>
              Preguntas Generadas
            </Typography>
            
            <TextField
              required
              id="filled-required"
              label="Nombre del Form"
              variant="filled"
              error={errorName}
              onChange={(e) => setFormName(e.target.value)}
              className="!my-2"
              onFocus={() => setErrorName(false)}
              helperText={errorName ? "ingresa un nombre." : ""} 
            />
            {questions.map((question, qIndex) => (
            
              <Accordion key={qIndex} className="mb-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {`Pregunta ${qIndex + 1}: ${question.text}`}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Card className="!mb-4">
                    <CardContent>
                      <TextField
                        fullWidth
                        label={`Pregunta ${qIndex + 1}`}
                        variant="outlined"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        className="!mb-2"
                      />

                      <RadioGroup
                        value={question.options.findIndex(opt => opt.isAnswer)}
                        onChange={(e) => handleCorrectAnswerChange(qIndex, parseInt(e.target.value))}
                        className="gap-2"
                      >
                        {question.options.map((option, oIndex) => (
                          <FormControlLabel
                            key={oIndex}
                            control={<Radio />}
                            label={
                              <TextField
                                variant="outlined"
                                value={option.text}
                                fullWidth
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                              />
                            }
                            value={oIndex}
                          />
                        ))}
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </AccordionDetails>
            </Accordion>
            ))}

            <Button 
              variant="contained" 
              color="primary" 
               
              onClick={handleSaveQuestions}
              className="!my-2"
            >
              Guardar Preguntas
            </Button>
          </div>
        </div>
      ) :
        <FileUploadPopover 
          files={files} 
          setFiles={setFiles}  
          isOpen={isOpen}
          setQuestionCount= {setQuestionCount}
          createQuestions = {createQuestions}
          questionCount={questionCount}
        />
      }
    </>
  )
}


export default NewForms;