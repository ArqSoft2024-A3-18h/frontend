import { useState } from "react";
import { X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

// Definir la mutación GraphQL
const CREATE_GAME_MUTATION = gql`
  mutation CreateGame($input: CreateGameInput!) {
    createGame(input: $input) {
      _id
      pin
      isRunning
      formId
      title
      description
      createdAt
      updatedAt
    }
  }
`;

const CreateGame = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formId = location.state?.formId;

    const [title, setTitle] = useState(""); // Nuevo estado para el título
    const [subject, setSubject] = useState("");
    const [emails, setEmails] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    // Hook para ejecutar la mutación
    const [createGame, { loading }] = useMutation(CREATE_GAME_MUTATION, {
        onError: (error) => setErrorMessage(error.message),
    });

    const handleStartGame = async () => {
        if (!formId) {
            setErrorMessage("Error: No se encontró un formId válido.");
            return;
        }
        if (!title.trim()) {
            setErrorMessage("Por favor ingresa un título para el juego.");
            return;
        }

        try {
            const { data } = await createGame({
                variables: {
                    input: {
                        title,
                        description: subject || "Sin descripción",
                        formId: formId,
                        emails: emails,
                    },
                },
            });

            if (data?.createGame) {
                console.log("Juego creado:", data.createGame);
                navigate(`/my/game/preview/${data.createGame.pin}`);
            }
        } catch (err) {
            console.error("Error al crear el juego:", err);
        }
    };

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
            <h1 className="text-3xl font-bold text-center text-gray-800 m-4 text-white">
                Crear Nuevo Juego
            </h1>

            {/* Campo de título */}
            <div className="border p-5 rounded-3xl bg-white shadow-md">
                <input
                    type="text"
                    className="w-full px-3 py-2 text-sm text-black bg-white border rounded-xl"
                    placeholder="Título del juego"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Campo de descripción */}
            <div className="border p-5 rounded-3xl bg-white shadow-md">
                <input
                    type="text"
                    className="w-full px-3 py-2 text-sm text-black bg-white border rounded-xl"
                    placeholder="Descripción del juego"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>

            {/* Agregar correos */}
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

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

            {/* Botones */}
            <div className="flex justify-between">
                <button className="px-4 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400">
                    Cancelar
                </button>
                <button
                    onClick={handleStartGame}
                    disabled={loading}
                    className={`px-4 py-2 text-white rounded-xl ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#00E676] hover:bg-green-600"
                    }`}
                >
                    {loading ? "Creando..." : "Empezar"}
                </button>
            </div>
        </div>
    );
};

export default CreateGame;
