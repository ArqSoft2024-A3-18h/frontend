import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER_FORMS, GET_USER_FORMS } from "../utils/queries";
import { useNavigate } from "react-router-dom";

const USER_ID = "1";
const Forms = () => {
    const { data, loading, error } = useQuery(GET_USER_FORMS, {
        variables: { userId: USER_ID },
    });
    const [deleteForm, {}] = useMutation(DELETE_USER_FORMS, {
        refetchQueries: [{ query: GET_USER_FORMS, variables: { userId: USER_ID } }]
    });
    const [forms, setForms] = useState(data?.getFormsByUserId || []);
    const navigate = useNavigate();

    const handleDeleteForms = async ( id) => {
        try {
            await deleteForm({variables: { id }});
        } catch (err) {}
    };

    useEffect(() => {
        if(data?.getFormsByUserId){
            setForms(data?.getFormsByUserId)

        }
    },[data])
    

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
            {forms.map((form) => (
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
                                {form.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {form.questions.length} preguntas
                            </Typography>
                            <ButtonGroup variant="text" aria-label="small button group">
                                <Button onClick={() => navigate(`/my/games/new`, { state: { formName: form.name } })}>
                                    Crear Juego
                                </Button>
                                <Button color="secondary" onClick={() => handleDeleteForms(form?._id ?? '')}>Eliminar</Button>
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
