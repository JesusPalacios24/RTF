'use client';
import { useState, useEffect } from 'react';
import Emailmodal from '@/app/components/EmailModal';
import Correos from '@/app/components/correo';

export default function () {
    const rows = 4;
    const cols = 3;
    let emailsCache = [];

    // Estado para controlar la visibilidad del menú
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    

    // Función para alternar la visibilidad del menú
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Estado para controla la visivilidad de ventana emergente para el correo
    const [isModalOpen, setIsModalOpen] = useState(false);

    //Estado para almacenar el correo seleccionado
    const [selectedEmail, setSelectedEmail] = useState(null);


    // Estado para almacenar la carrera seleccionada
    const [selectedCareer, setSelectedCareer] = useState('Carrera');

    // Función para manejar la selección de una opción en el menú
    const handleCareerSelection = (career) => {
        setSelectedCareer(career); // Actualizar el valor de la carrera seleccionada
        setIsMenuOpen(false); // Cerrar el menú al seleccionar
    };

    // Estado para controlar la visibilidad del menú de bandeja de entrada
    const [isInboxOpen, setIsInboxOpen] = useState(false);

    //Estado almacenar los correos 
    const [correos, setCorreos] = useState([]);

    // Función para alternar la visibilidad del menú de bandeja de entrada
    const toggleInboxMenu = () => setIsInboxOpen(!isInboxOpen);

    //Funcion para obtener de correos del JSON
    const fetchCorreos = async () => {

        try {
            const response = await fetch('/api/correos'); //llamado de edpoints
            const data = await response.json(); // convierte la respuesta a jason
            console.log('Datos obtenidos:', data); // Verifica qué devuelve el servidor
            setCorreos(data);
        } catch (error) {
            console.error('Error al obtener correos:', error);
        }
    }

    // useEffect para cargar los correos al montar el componente
    useEffect(() => {
        fetchCorreos(); // Llama a la función para obtener los correos
    }, []);

    // Función para manejar la selección de un correo
    const handleCorreoSelection = (correo) => {
        console.log('Correo seleccionado:', correo);
        setSelectedEmail(correo); // Actualiza el correo seleccionado
        setIsModalOpen(true); // Cierra el menú después de la selección
    };

    const [alumnos, setAlumnos] = useState([]);

    // Función para obtener los alumnos desde el API
    const [loading, setLoading] = useState(true);

    const fetchAlumnos = async () => {
        try {
            // Llamada al endpoint de la API para obtener los alumnos
            const response = await fetch('/api/ShowAlumnos'); // Esto apunta al endpoint /api/alumnos en el backend de Next.js
            const data = await response.json(); // Convertimos la respuesta en formato JSON
            console.log('Alumnos obtenidos:', data); // Log para verificar
            setAlumnos(data); // Actualiza el estado con los alumnos
        } catch (error) {
            console.error('Error al obtener los alumnos:', error);
        } finally {
            setLoading(false); // Cambia el estado de loading cuando termine
        }
    };

    // useEffect para ejecutar la función al cargar el componente
    useEffect(() => {
        fetchAlumnos();
    }, []); // Solo se ejecuta una vez cuando el componente se monta

    const [emails, setEmails] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // Controla si el menú está abierto
  
    const handleData = (emailsData) => {
        console.log('Emails:', emailsData);
      setEmails(emailsData);
      setIsOpen(true); // Abre el menú cuando llegan los correos
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
                            {alumnos.length > 0 ? (
                                alumnos.map((alumno, index) => (
                                    <tr key={index} className="h-10">
                                        <td className="border border-gray-700 px-4 py-2 text-center">{alumno.nombre}</td>
                                        <td className="border border-gray-700 px-4 py-2 text-center">{alumno.noControl}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="border border-gray-700 px-4 py-2 text-center">No hay alumnos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

            {/* SECCION BANDEJA ENTRADA */}

            <div className="relative flex w-full h-full">
      {/* Botón que obtiene los correos */}
      <div className="w-1/4 p-4 mt-4 ml-6 flex justify-center items-start">
        <Correos enviarDatos={handleData} />
      </div>

                {/* Menú desplegable a la derecha */}
                {isOpen && (
                    <div className="absolute top-0 right-0 w-64 bg-white shadow-lg border border-gray-300 rounded-lg p-4">
                    <h2 className="text-lg font-bold mb-2">Correos Recibidos</h2>
                    <ul>
                        {emails.map((email, index) => (
                        <li
                            key={index}
                            className={`p-2 border-b last:border-none cursor-pointer hover:bg-blue-100 ${
                            selectedEmail === email ? "bg-blue-200" : ""
                            }`}
                            onClick={() => setSelectedEmail(email)}
                        >
                            <p className="font-semibold">{email.alumno}</p>
                            <p className="text-sm text-gray-600">{email.asunto}</p>
                        </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-2 p-2 bg-red-500 text-white rounded w-full"
                    >
                        Cerrar
                    </button>
                    </div>
                )}
                </div>
                {/* Modal separado */}
           
                <Emailmodal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
        </div>
    );
    
    
};