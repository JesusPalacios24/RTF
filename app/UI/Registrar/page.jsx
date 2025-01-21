'use client'
import React from 'react';
import { useState } from 'react';

export default function Registro() {
    
    const fechaFormateada = new Date().toLocaleDateString('es-ES');

    const [nombre,setNombre] = useState('');
    const [carrera,setCarrera] = useState('');
    const [noControl,setNoControl] = useState('');
    const [nomProyecto, setNomProyecto] = useState('');
    const [producto, setProducto] = useState('');
    const [fecha] = useState(fechaFormateada);
    const [mensaje, setMensaje] = useState('');

    const handleSelectChange = (event) => {
        setCarrera(event.target.value); // Actualiza el estado con el valor seleccionado
      };

    //Funcion para el registro de alumnos
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        // Verificar los valores que se están enviando
    console.log({
        nombre,
        carrera,
        noControl,
        nomProyecto,
        producto,
        fecha
    });
        try {
            const response = await fetch('/api/alumnos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nombre:nombre, 
                    carrera: carrera, 
                    noControl:noControl, 
                    nomProyecto:nomProyecto,
                    producto:producto,
                    fechaActual:fecha,}),
            });
            
            const data = await response.json();
            if (response.ok) {
                setMensaje(`Registro exitoso: ${data.message}`);
            } else {
                setMensaje(`Error: ${data.error}`);
            }
        } catch (error) {
            setMensaje('Error al conectarse al servidor');
            console.error(error);
        }
    }
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Registrar Proyecto</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre de estudiante:</label>
                    <input
                    type="text"
                    name="nombre"
                    required
                    placeholder='Martin Luna Chavez'
                    value={nombre}
                    onChange={(e)=> setNombre(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="carrera" className="block text-sm font-medium text-gray-700">Carrera:</label>
                    <select
                    id="carrera"
                    value={carrera}
                    onChange={handleSelectChange}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                    <option value="">Seleccione una carrera</option>
                    <option value="Ingenieria en Sistemas y Computacion">Ingenieria en Sistemas y Computacion</option>
                    <option value="Ingenieria en Informatica">Ingenieria en Informatica</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="noControl" className="block text-sm font-medium text-gray-700">No.Control:</label>
                    <input
                    type="text"
                    required
                    placeholder='21550762 / C20550762'
                    value={noControl}
                    onChange={(e)=> setNoControl(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="proyecto" className="block text-sm font-medium text-gray-700">Nombre del Proyecto:</label>
                    <input
                    type="text"
                    placeholder='InfraMax'
                    required
                    value={nomProyecto}
                    onChange={(e)=> setNomProyecto(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="producto" className="block text-sm font-medium text-gray-700">Producto:</label>
                    <input
                    type="text"
                    placeholder='...'
                    required
                    value={producto}
                    onChange={(e)=> setProducto(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha Actual:</label>
                    <label className="block text-sm text-gray-600">{fechaFormateada}</label>
                </div>

                <div>
                    <input
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    />
                </div>
                </form>
                {mensaje && <p className="mt-4 text-center text-sm text-red-500">{mensaje}</p>}
            </div>
            </div>

    );
}