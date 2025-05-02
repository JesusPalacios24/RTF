'use client';

import { useState, useEffect } from 'react';
import Emailmodal from '@/app/components/EmailModal';
import Correos from '@/app/components/correo';

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

    const fetchAlumnos = async () => {
        try {
            const response = await fetch('/api/ShowAlumnos');
            const data = await response.json();
            setAlumnos(data);
        } catch (error) {
            console.error('Error al obtener los alumnos:', error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect para obtener datos
    useEffect(() => {
        fetchCorreos();
        fetchAlumnos();
    }, []);

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
            <div className="w-1/6 p-4 bg-white relative flex flex-col items-center">
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
            </div>
        </div>
    );
}