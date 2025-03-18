function NumControl(texto, n) {
    let indexL = texto.indexOf("L"); // Encuentra la posición de "L"
    
    if (indexL === -1) return ""; // Si no hay "L", devuelve cadena vacía

    let indexC = texto.indexOf("C"); // Encuentra la posición de "C"

    if (indexC === -1) {
        return texto.substring(indexL + 1, indexL + 1 + n); // Extrae N caracteres después de "L"
    }
    else {
        return texto.substring(indexC , indexC + 1 + n); // Extrae caracteres incluyendo la "C" de la matricula
    }
    
   
}

const Emailmodal = ({ email, onClose }) => {
    if (!email) return null; // Si no hay email seleccionado, no renderiza nada

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-[800px] ">
            {/* Encabezado azul */}
            <div className="bg-blue-600 text-white text-center py-6 rounded-t-lg w-full">
                <h2 className="text-2xl font-bold">Matrícula: {NumControl(email.correo, 8)}</h2>
            </div>

            {/* Contenido del modal */}
            <div className="py-6 p-12">
                <p className="text-lg"><strong>Nombre:</strong> {email.alumno}</p>
                <p className="text-lg"><strong>Correo:</strong> {email.correo}</p>
                <p className="text-lg"><strong>Asunto:</strong> {email.asunto}</p>
                <p className="mt-6 border-t pt-6 text-lg"><strong></strong> {email.cuerpo}</p>
            </div>

            {/* Botones centrados */}
            <div className="mt-6 flex justify-center gap-6 pb-6">
                <button
                    onClick={onClose}
                    className="bg-red-500 text-white px-8 py-3 rounded-lg text-lg"
                >
                    Rechazar
                </button>
                <button
                    onClick={() => {
                        alert("Correo aceptado");
                        onClose();
                    }}
                    className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg"
                >
                    Aceptar
                </button>
            </div>
        </div>
    </div>
    );
};
export default Emailmodal;