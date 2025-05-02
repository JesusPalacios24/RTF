'use client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';

export default function PAGJefe () {
    const rows = 4;
    const cols = 3;

    // Estado para controlar la visibilidad del menú
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Función para alternar la visibilidad del menú
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Estado para almacenar la carrera seleccionada
    const [selectedCareer, setSelectedCareer] = useState('Carrera');

    // Función para manejar la selección de una opción en el menú
    const handleCareerSelection = (career) => {
        setSelectedCareer(career); // Actualizar el valor de la carrera seleccionada
        setIsMenuOpen(false); // Cerrar el menú al seleccionar
    };

    // Estado para controlar la visibilidad del menú de bandeja de entrada
    const [isInboxOpen, setIsInboxOpen] = useState(false);

    // Función para alternar la visibilidad del menú de bandeja de entrada
    const toggleInboxMenu = () => setIsInboxOpen(!isInboxOpen);

    // Funcíon para redireccionar a registro
    const Redirect = () =>{
        window.location.href= '/UI/PRINAdmin/USERS/'
      };


    return (
        <div className="flex h-screen">

            {/* SECCION DE CARRERAS */}

            <div className="w-1/6 p-4 mt-3">
                <div className="flex flex-col justify-between items-center w-12 h-10 cursor-pointer border-2 border-gray-700 rounded-lg">
                    <button onClick={toggleMenu} className="p-2 text-gray-800 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </button>
                </div>

                {/* Menú desplegable */}
                <div className={`absolute bg-white shadow-md rounded-md w-40 mt-2 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <ul>
                        <li
                            className="border-b p-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleCareerSelection('Informática')}
                        >
                            Informática
                        </li>
                        <li
                            className="border-b p-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleCareerSelection('Sistemas')}
                        >
                            Sistemas
                        </li>
                        <li
                            className="p-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleCareerSelection('Ciberseguridad')}
                        >
                            Ciberseguridad
                        </li>
                    </ul>
                </div>
            </div>

            {/* SECCION DE ALUMNOS */}

            <div className="w-full p-4">
                <div>
                    <div className="flex">

                        {/* CARRERA */}

                        <div className="space-y-4 w-full mr-2">
                            <label className="block text-gray-700 font-semibold"></label>
                            <input
                                type="text"
                                value={selectedCareer}
                                readOnly
                                className="border border-gray-700 rounded p-2 w-full bg-gray-200 cursor-not-allowed"
                            />
                        </div>

                        {/* LUPA BUSQUEDA */}

                        <div className="space-y-4 w-1/4 mt-4 ml-14">
                            <button className=" text-gray-700 font-semibold border-2 rounded-lg border-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-10 h-10"
                                >
                                    <path
                                        d="M21 21l-4.35-4.35M10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <table className="table-auto w-full border-collapse mt-2">
                        <thead>
                            <tr>
                                <th className="border border-gray-700 px-4 py-2 bg-gray-200 text-center">Nombre</th>
                                <th className="border border-gray-700 px-4 py-2 bg-gray-200 text-center">No. de control</th>
                                <th className="border border-gray-700 px-4 py-2 bg-gray-200 text-center">Anexo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: rows }).map((_, rowIndex) => (
                                <tr key={rowIndex} className="h-10">
                                    <td className="border border-gray-700 px-4 py-2 text-center"></td>
                                    <td className="border border-gray-700 px-4 py-2 text-center"></td>
                                    <td className="border border-gray-700 px-4 py-2 text-center"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='mt-3 '>
                        <button onClick={Redirect} className='border-2 rounded-lg text-gray-700 border-gray-700 p-1'>
                            Registrar Empleado.
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}