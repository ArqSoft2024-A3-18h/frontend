import React, { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";

interface fileUploaderProps {
    files:File[]
    setFiles: (newValues) => void
    isOpen: boolean
    closeModal: () => void
}
const FileUploadPopover= ({
    files = [],
    setFiles,
    isOpen = true,
    closeModal
}:fileUploaderProps) => {
    
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    });
    
    
    return (
    <>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    
                <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-5"
                >
                    Selecciona un pdf
                </DialogTitle>
                <img src="/images/logo.png" className="justify-self-center" width='80'></img>

                <div {...getRootProps({ className: "border-2 border-dashed p-4 text-center cursor-pointer" })}>
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

                </DialogPanel>
            </TransitionChild>
            </div>
        </div>
        </Dialog>
    </Transition>
    
    </>
    
    );
};
export default FileUploadPopover;