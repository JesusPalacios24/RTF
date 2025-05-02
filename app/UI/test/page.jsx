'use client';
import { stringify } from "postcss";
import React, {useState} from "react";



export default function Test() {

    const [documento, setDocumento] = useState(null);
    const [nombre, setNombre] = useState('');
    const [id, setId] = useState('');
    const [idDescarga, setIdDescarga] = useState('');

    

    const handleGuardar = async (e) => {
        e.preventDefault();
        
        try {

            const formData = new FormData();
            formData.append('idDoc', id);
            formData.append('nombreAlumno', nombre);
            formData.append('documentoAdjunto', documento);
            
            
            
            if (!documento) {
                alert('Por favor, selecciona un documento para subir.');
                return;
            }


            const response = await fetch('/api/documentos', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();


            if (response.ok) {
                alert('Documento guardado exitosamente');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    }

    const handleDescargar = async (e) => {
        e.preventDefault();
        if (!idDescarga) {
            alert("Por favor ingresa el ID del documento.");
            return;
        }
        try {
            const response = await fetch(`/api/documentos/${idDescarga}`);

            if (!response.ok) {
                throw new Error("No se pudo descargar el archivo");
            }
            // Crear una URL del blob y disparar la descarga
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);   

            const link = document.createElement('a');
            link.href = url;
            link.download = `${id}`; 
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    }



    return (
        <div className="flex flex-col h-screen bg-white">
            <h1 className="text-2xl font-bold">Test Page</h1>
            <p className="text-lg">This is a test page.</p> 

            <form onSubmit={handleGuardar} className="flex flex-col mt-4">
                <label className="mb-2 text-lg">Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                <label className="mb-2 text-lg">Id:</label>
                <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />

                <label className="mt-4 mb-2 text-lg">Documento:</label>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => setDocumento(e.target.files[0])}
                    className="p-2 border border-gray-300 rounded"
                />

                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Guardar Documento
                </button>

            </form>
            <form  onSubmit={handleDescargar} >
                <label className="mt-4 mb-2 text-lg">Id pa descargar:</label>
                <input
                    type="text"
                    value={idDescarga}
                    onChange={(e) => setIdDescarga(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                />
                

                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Descargar Documento
                </button>
            </form>
            
        </div>
    );
}