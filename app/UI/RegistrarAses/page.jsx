'use client'
import React from "react";
import {useState} from 'react';

export default function RegistroAses(){

    const [presidente,setPresidente]= useState('');
    const [tituloProf,setTituloProf]= useState('');
    const [cedulaProfesional,setCedulaProfesional]= useState('');
    const [mensaje, setMensaje] = useState('');

    //Funcion para el registro de asesores
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verificar los valores que se están enviando
        console.log({
            presidente,
            tituloProf,
            cedulaProfesional
        });
        try {
            const response = await fetch('/api/asesores',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    presidente:presidente,
                    tituloProf: tituloProf,
                    cedulaProfesional: cedulaProfesional,
                }),
            });

            const data = await response.json();

            if(response.ok){
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
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Registro de Asesor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Precidente:</label>
            <input
              type="text"
              value={presidente}
              onChange={(e) => setPresidente(e.target.value)}
              required
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          <div>
            <label className="block font-medium">Titulo Profesional:</label>
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
    )


}