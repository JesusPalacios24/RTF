'use client';

import { useState, useEffect } from 'react';
import Emailmodal from '@/app/components/EmailModal';
import Correos from '@/app/components/correo';
import { useRouter } from 'next/navigation'
import { set } from 'mongoose';

export default function App() {
    // Estados
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState('Carrera');
    const [isInboxOpen, setIsInboxOpen] = useState(false);
    const [correos, setCorreos] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [emails, setEmails] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const Router = useRouter();

    const [showModal, setShowModal] = useState(false); // Estado para el modal del correo manual

    // Funciones de manejo de estado
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleInboxMenu = () => setIsInboxOpen(!isInboxOpen);

    const handleCareerSelection = (career) => {
        setSelectedCareer(career);
        setIsMenuOpen(false);
    };

    const handleCorreoSelection = (correo) => {
        setSelectedEmail(correo);
        setIsModalOpen(true);
    };

    const handleData = (emailsData) => {
        setEmails(emailsData);
        setIsOpen(true);
    };

    // Llamadas a la API
    const fetchCorreos = async () => {
        try {
            const response = await fetch('/api/correos');
            const data = await response.json();
            setCorreos(data);
        } catch (error) {
            console.error('Error al obtener correos:', error);
        }
    };





    function EnviarFormulario() {
        setShowModal(true);
  
    }

    function onClose() {
        setShowModal(false);
    }

    function handleNavigate() {
        Router.push('/UI/Vista_principal/Form_2010_Manual');
        setShowModal(false);
    }

    //boton para ir al crud
    const handleClick = () => {
        // Redirige a otra página
        window.location.href = '/UI/RegistrarAses';
    };

    return (
        <div className="flex h-screen">
            {/* Sección de Carreras - Izquierda */}
            <div className="w-1/6 p-4 bg-white flex flex-col items-center">
                <button onClick={toggleMenu} className="p-3 border-2 rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                {isMenuOpen && (
                    <ul className="absolute bg-gray-100 shadow-md rounded-md w-40 mt-14">
                        <h2 className="text-lg font-bold mb-2">Carreras</h2>
                        {['Informática', 'Sistemas', 'Ciberseguridad'].map((career) => (
                            <li key={career} className="p-1 hover:bg-gray-200 cursor-pointer" onClick={() => handleCareerSelection(career)}>
                                {career}
                            </li>
                        ))}
                        <h2 className="text-lg font-bold mt-5">Asesores</h2>
                        <button onClick={handleClick} className=" p-2 bg-cyan-500 text-white rounded w-full">
                            Crud 
                        </button>
                    </ul>
                )}


            </div>

            {/* Sección de Alumnos - Centro */}
            <div className="w-4/6 p-4 bg-white shadow-md rounded-lg">
                <input type="text" value={selectedCareer} readOnly className="border rounded p-2 bg-gray-200 w-full mb-4 text-center" />
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2">No. de control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.length > 0 ? (
                            alumnos.map((alumno, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 text-center">{alumno.nombre}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{alumno.noControl}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="2" className="border border-gray-300 px-4 py-2 text-center">No hay alumnos disponibles</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Sección de Correos - Derecha */}
            <div className="w-1/6 p-4 pt-3 bg-white relative flex flex-col items-center">
                <Correos enviarDatos={handleData} />
                {isOpen && (
                    <div className="absolute top-0 right-0 w-60 bg-white shadow-lg p-4 border border-gray-300 rounded-lg ">
                        <h2 className="text-lg font-bold mb-2">Correos Recibidos</h2>
                        <ul>
                            {emails.map((email, index) => (
                                <li key={index} className="p-2 border-b last:border-none cursor-pointer hover:bg-blue-100" onClick={() => setSelectedEmail(email)}>
                                    <p className="font-semibold">{email.alumno}</p>
                                    <p className="text-sm text-gray-600">{email.asunto}</p>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setIsOpen(false)} className="mt-2 p-2 bg-red-500 text-white rounded w-full">
                            Cerrar
                        </button>
                    </div>
                )}
                <Emailmodal email={selectedEmail} />

                <button onClick={EnviarFormulario} className="email-button border-black border-collapse" >
                                 <svg

                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-20 h-20 bg-red-600 text-gray-800 ml-2 border-2 border-gray-800 rounded-2xl p-3 pr-2 hover:bg-red-800 transition duration-400 ease-in-out"
                                >
                                    <path
                                        d="M3 8l7 5 7-5M3 8v8c0 .553.447 1 1 1h12c.553 0 1-.447 1-1V8M3 8l7 5 7-5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                </svg>
                </button>
                        {showModal && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white rounded-lg shadow-lg w-[500px]">
                                {/* Encabezado azul */}
                                <div className="bg-blue-600 text-white text-center py-6 rounded-t-lg w-full">
                                    <h2 className="text-2xl font-bold">Advertencia</h2>
                                </div>

                                {/* Contenido del modal */}
                                <div className="py-8 px-12 text-center">
                                    <p className="text-lg">¿Estás seguro de completar el formulario manualmente?</p>
                                </div>

                                {/* Botones */}
                                <div className="mt-4 flex justify-center gap-6 pb-6">
                                    <button
                                    onClick={onClose}
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-lg transition duration-300"
                                    >
                                    Cerrar
                                    </button>
                                    <button
                                    onClick={handleNavigate}
                                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg transition duration-300"
                                    >
                                    Aceptar
                                    </button>
                                </div>
                                </div>
                            </div>
                            )}


            </div>
        </div>
    );
}