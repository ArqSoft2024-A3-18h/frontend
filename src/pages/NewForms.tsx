import React , { useEffect, useState } from "react";
import FileUploadPopover from "./FileUploaderPopover";
import Loading from "react-loading";
import pdfToText from 'react-pdftotext';

const NewForms = () => {
  let [isOpen, setIsOpen] = useState(true)
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfText, setPdfText] = useState<string>("");
  useEffect(()=> {
    if (files.length > 0){

        setTimeout(()=> {
        closeModal()
        extractText(files[0]);
        },400)
    }
  },[files])
  function extractText(file: File) {
    setIsLoading(true);
      pdfToText(file)
          .then((text) => {
            console.log(text);
            setPdfText(text)
          })
          .catch(error => console.error("Failed to extract text from pdf"))
          .finally(() => setIsLoading(false))
    }
  function closeModal() {
    setIsOpen(false)
  }
  
  function openModal() {
    setIsOpen(true)
  }
  
  return(

    <div className="w-full h-full items-center justify-center flex">
      {isLoading ? (
        <div className="flex justify-center flex-col items-center">
          <Loading type="spinningBubbles" color="#4A90E2" height={80} width={80} />
          <h1 className="text-[#4A90E2]"> procesando...</h1> 
        </div>
      ) : 
        <FileUploadPopover 
          files={files} 
          setFiles={setFiles}  
          isOpen={isOpen}
          closeModal={closeModal}
        />
      }
    </div>
  )
}


export default NewForms;