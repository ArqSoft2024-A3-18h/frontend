import { useState } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";

const CreateGame = () => {
    const location = useLocation();
    const formName = location.state?.formName || "Nuevo Juego";
    const [emails, setEmails] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [subject, setSubject] = useState("");

    const addEmail = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            event.preventDefault();
            if (!emails.includes(inputValue.trim())) {
                setEmails([...emails, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    const removeEmail = (email) => {
        setEmails(emails.filter((e) => e !== email));
    };
    
    return (
        
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 m-4 text-white">{formName}</h1>
            <div className="border p-5 rounded-3xl bg-white shadow-md">
                <div className="flex flex-wrap gap-3">
                    {emails.map((email, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-[#FF4DF5] px-4 py-2 rounded-full text-sm text-white"
                        >
                            {email}
                            <button
                                className="ml-2 text-white hover:text-[#FF4D4D]"
                                onClick={() => removeEmail(email)}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    <input
                        type="text"
                        className="outline-none flex-1 min-w-[100px] px-2 py-2 text-sm text-black bg-white placeholder-red"
                        placeholder="Agregar correo..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={addEmail}
                    />
                </div>
            </div>
            
            <div className="border p-5 rounded-3xl bg-white shadow-md">
                <input
                    type="text"
                    className="w-full px-3 py-2 text-sm text-black bg-white border rounded-xl"
                    placeholder="Asunto del correo..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>
            
            <div className="flex justify-between">
                <button className="px-4 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400" style={{ backgroundColor: "#00EFFF" }}>Cancelar</button>
                <button className="px-4 py-2 bg-[#00E676] text-white rounded-xl hover:bg-green-600" style={{ backgroundColor: "#00E676" }}>Empezar</button>
            </div>
        </div>
    );
};

export default CreateGame;
