import React, { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
interface fileUploaderProps {
    files:File[]
    setFiles: (newValues) => void
    isOpen: boolean
    setQuestionCount: (value) => void,
    questionCount: number,
    createQuestions: () => void
}
const FileUploadPopover= ({
    files = [],
    setFiles,
    isOpen = true,
    setQuestionCount,
    questionCount,
    createQuestions
}:fileUploaderProps) => {
    const [error, setError] = useState(false);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    });
    const handleCreateQuestions = () => {
        if (!questionCount || isNaN(Number(questionCount)) || Number(questionCount) <= 0) {
          setError(true);
          return;
        }
        
        setError(false);
        createQuestions();
    };
    
    return (
    <>
        <Dialog
            open={isOpen}
            onClose={handleCreateQuestions}
        >
            <DialogTitle>Selecciona un pdf</DialogTitle>
            <DialogContent>
                <img src="/images/logo.png" className="justify-self-center bg-white mb-2" width='80'></img>
                <div {...getRootProps({ className: "border-2 border-[#FF4DF5] border-dashed p-4 text-center cursor-pointer mb-2 " })}>
                    <input {...getInputProps()} />
                    <p>Drag & drop a file here, or click to select one</p>
                </div>
                {files.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-bold">File seleccionado:</h3>
                        <ul>
                        {files.map((file) => (
                            <li key={file.name}>{file.name}</li>
                        ))}
                        </ul>
                    </div>
                )}
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="count"
                    name="count"
                    label="Cantidad de preguntas"
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setQuestionCount(parseInt(e.target.value, 10));
                        setError(false);
                    }}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCreateQuestions}>Crear Form</Button>
            </DialogActions>
        </Dialog>
    </>
    
    );
};
export default FileUploadPopover;