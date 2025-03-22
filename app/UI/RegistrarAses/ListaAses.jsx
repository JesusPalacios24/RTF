'use client'
import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function ListaAsesores() {
    const [asesores, setAsesores] = useState([]);
    const [error, setError] = useState('');
    const [asesorEditando, setAsesorEditando] = useState(null);

    useEffect(() => {
        const fetchAsesores = async () => {
            try {
                const response = await fetch('/api/asesores');
                const data = await response.json();
                if (response.ok) {
                    setAsesores(data);
                } else {
                    setError('Error al obtener la lista de asesores');
                }
            } catch (error) {
                setError('No se pudo conectar al servidor');
                console.error(error);
            }
        };
        fetchAsesores();
    }, []);

    const handleEditClick = (asesor) => {
        setAsesorEditando(asesor); // Guarda el asesor que se está editando
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/asesores/${asesorEditando._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    presidente: asesorEditando.presidente,
                    tituloProf: asesorEditando.tituloProf,
                    cedulaProfesional: asesorEditando.cedulaProfesional
                })
            });
            const data = await response.json();
            if (response.ok) {
                setAsesores(asesores.map(a => (a._id === asesorEditando._id ? asesorEditando : a)));
                setAsesorEditando(null); // Cierra el formulario
            } else {
                console.error(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al conectarse al servidor');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Lista de Asesores</h2>
            {error && <p className="text-red-500">{error}</p>}
            
            {asesorEditando ? (
                // FORMULARIO PARA EDITAR
                <div className="p-4 border rounded-lg shadow bg-gray-100">
                    <h3 className="text-lg font-bold mb-2">Editar Asesor</h3>
                    <form onSubmit={handleUpdate} className="space-y-2">
                        <input type="text" value={asesorEditando.presidente} onChange={(e) => setAsesorEditando({ ...asesorEditando, presidente: e.target.value })} className="w-full p-2 border rounded-lg" />
                        <input type="text" value={asesorEditando.tituloProf} onChange={(e) => setAsesorEditando({ ...asesorEditando, tituloProf: e.target.value })} className="w-full p-2 border rounded-lg" />
                        <input type="text" value={asesorEditando.cedulaProfesional} onChange={(e) => setAsesorEditando({ ...asesorEditando, cedulaProfesional: e.target.value })} className="w-full p-2 border rounded-lg" />
                        <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600">Guardar Cambios</button>
                        <button type="button" onClick={() => setAsesorEditando(null)} className="w-full bg-gray-300 p-2 rounded-lg mt-2">Cancelar</button>
                    </form>
                </div>
            ) : (
                // LISTA DE ASESORES
                <ul className="space-y-2">
                    {asesores.length > 0 ? (
                        asesores.map((asesor) => (
                            <li key={asesor._id} className="p-4 border rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <p><strong>Presidente:</strong> {asesor.presidente}</p>
                                    <p><strong>Título:</strong> {asesor.tituloProf}</p>
                                    <p><strong>Cédula Profesional:</strong> {asesor.cedulaProfesional}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEditClick(asesor)} className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No hay asesores registrados.</p>
                    )}
                </ul>
            )}
        </div>
    );
}
