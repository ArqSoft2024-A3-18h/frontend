import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { PinDrop } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { UPDATE_GAME_BY_PIN } from "../utils/queries";

const NicknamePage = () => {
  const { pin } = useParams(); 
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(false);
  const [updateGameByPin, { loading, error: mutationError }] = useMutation(UPDATE_GAME_BY_PIN);
  const handleJoinGame = async () => {
    if (!nickname.trim()) {
      setError(true);
      return;
    }
    try {
      const { data } = await updateGameByPin({ variables: { pin, nick: nickname } });
      if (data) {
        const playerId = data.updateGameByPin.player._id;
        const formId =  data.updateGameByPin.game.formId;
        console.log('data.updateGameByPin ', data.updateGameByPin)
        localStorage.setItem("playerId", playerId);
        localStorage.setItem("formId", formId);
        navigate(`/game/preview/${pin}`,{ state: {
          nick: nickname,
          leaderboard: data.updateGameByPin.game.leaderboard
        }});
      }
    } catch (err) {
      console.error("Error updating game:", err);
    }
  };

  return (
    <Box 
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400, textAlign: "center" }}>
      <img src="/images/logo.png" className="justify-self-center bg-white mb-2" width='80'></img>
        <Typography variant="h5" gutterBottom>
          Ingresar Nickname
        </Typography>
        <TextField
          fullWidth
          label="Tu Nickname"
          variant="outlined"
          error={error}
          helperText={error ? "El nickname es obligatorio" : ""}
          onChange={(e) => {
            setNickname(e.target.value);
            setError(false);
          }}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleJoinGame}
        >
          Unirse al Juego
        </Button>
      </Paper>
    </Box>
  );
};

export default NicknamePage;
