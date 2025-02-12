import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ButtonGroup from '@mui/material/ButtonGroup';

const cards = [
    {
      id: 1,
      title: 'Plants',
      questionsCount: '10',
    },
    {
      id: 2,
      title: 'Animals',
      questionsCount: '15',
    },
    {
      id: 3,
      title: 'Humans',
      questionsCount: '5',
    },
    {
        id: 4,
        title: 'Humans',
        questionsCount: '2',
    },
    {
        id: 5,
        title: 'Humans',
        questionsCount: '30',
    },
];
const Forms = () => {
    return(
        <div className="m-4">
            <div className="flex flex-row justify-between items-center mb-4 ">
                <h1>Formularios</h1>
                <Button variant="contained" href="/my/forms/new" >Nuevo Form</Button>

            </div>
            <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                gap: 2,
            }}
            >
            {cards.map((card, index) => (
                <Card>
                    <CardActionArea
                        sx={{
                        height: '100%',
                        '&[data-active]': {
                            backgroundColor: 'action.selected',
                            '&:hover': {
                            backgroundColor: 'action.selectedHover',
                            },
                        },
                        }}
                    >
                        <CardContent sx={{ height: '100%' }}>
                            <Typography variant="h5" component="div">
                                {card.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {card.questionsCount} preguntas
                            </Typography>
                            <ButtonGroup variant="text" aria-label="small button group">
                                <Button>Crear Juego</Button>
                                <Button color="error">Eliminar</Button>
                            </ButtonGroup>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
            </Box>

        </div>
    )

}

export default Forms;
