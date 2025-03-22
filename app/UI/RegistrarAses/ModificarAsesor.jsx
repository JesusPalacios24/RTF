'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ModificarAsesor({ asesorId }) {
    const router = useRouter();
    const [presidente, setPresidente] = useState('');
    const [tituloProf, setTituloProf] = useState('');
    const [cedulaProfesional, setCedulaProfesional] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Cargar datos del asesor
    useEffect(() => {
        const fetchAsesor = async () => {
            try {
                const response = await fetch(`/api/asesores/${asesorId}`);
                if (!response.ok) throw new Error('Error al obtener los datos');
                const data = await response.json();
                setPresidente(data.presidente);
                setTituloProf(data.tituloProf);
                setCedulaProfesional(data.cedulaProfesional);
            } catch (error) {
                setMensaje('No se pudieron cargar los datos.');
            }
        };
        fetchAsesor();
    }, [asesorId]);

    // Enviar actualización
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/asesores/${asesorId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ presidente, tituloProf, cedulaProfesional })
            });
            const data = await response.json();
            if (response.ok) {
                setMensaje('Asesor actualizado con éxito');
                router.push('/registro-asesores'); // Redirigir a la lista
            } else {
                setMensaje(`Error: ${data.error}`);
            }
        } catch (error) {
            setMensaje('Error al conectarse al servidor');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Modificar Asesor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Presidente:</label>
                    <input type="text" value={presidente} onChange={(e) => setPresidente(e.target.value)} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                    <label className="block font-medium">Título Presidente:</label>
                    <input type="text" value={tituloProf} onChange={(e) => setTituloProf(e.target.value)} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                    <label className="block font-medium">Cédula Profesional:</label>
                    <input type="text" value={cedulaProfesional} onChange={(e) => setCedulaProfesional(e.target.value)} required className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                </div>
                <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200">Guardar Cambios</button>
                {mensaje && <p className="text-center text-green-600">{mensaje}</p>}
            </form>
        </div>
    );
}
