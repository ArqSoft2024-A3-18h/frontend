import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const NicknamePage = () => {
  const { pin } = useParams(); // Obtener el PIN desde la URL
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(false);

  const handleJoinGame = () => {
    if (!nickname.trim()) {
      setError(true);
      return;
    }
    navigate(`/game/preview/${pin}?nickname=${encodeURIComponent(nickname)}`);
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
