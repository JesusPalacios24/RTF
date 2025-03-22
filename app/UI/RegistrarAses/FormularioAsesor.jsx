'use client'
import React, { useState } from 'react';

export default function FormularioAsesor() {
    const [presidente, setPresidente] = useState('');
    const [tituloProf, setTituloProf] = useState('');
    const [cedulaProfesional, setCedulaProfesional] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/asesores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ presidente, tituloProf, cedulaProfesional }),
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje(`Registro exitoso: ${data.message}`);
                setPresidente('');
                setTituloProf('');
                setCedulaProfesional('');
            } else {
                setMensaje(`Error: ${data.error}`);
            }
        } catch (error) {
            setMensaje('Error al conectarse al servidor');
            console.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Registro de Asesor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Presidente:</label>
                    <input
                        type="text"
                        value={presidente}
                        onChange={(e) => setPresidente(e.target.value)}
                        required
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block font-medium">Título Presidente:</label>
                    <input
                        type="text"
                        value={tituloProf}
                        onChange={(e) => setTituloProf(e.target.value)}
                        required
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block font-medium">Cédula Profesional:</label>
                    <input
                        type="text"
                        value={cedulaProfesional}
                        onChange={(e) => setCedulaProfesional(e.target.value)}
                        required
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Enviar
                </button>

                {mensaje && <p className="text-center text-green-600">{mensaje}</p>}
            </form>
        </div>
    );
}
