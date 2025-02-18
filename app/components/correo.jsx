"use client";

import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import axios from 'axios';
import { htmlToText } from 'html-to-text'; 


const Correos = ({ enviarDatos }) => {
  const { instance, accounts } = useMsal();
  const [datos, setDatos] = useState([]);


  const handleCorreos = async (e) => {
    e.preventDefault();
    
    try {
      fetch('api/correos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      //Responder 
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Correos recibidos:', data);

    } catch (error) {
      console.log("Hubo un error al obtener los correos, cual fue el error quien sabe, pero hubo un error :3:",error);
    }
    
  }




  const fetchMail = async () => {
    if (accounts.length === 0) {
      instance.loginRedirect({
        scopes: ['Mail.Read'],
      });
      return;
    }

    const keywords = [
      "titulación", "Titulación", "TITULACIÓN", "titulacion", "Titulacion", "TITULACION",
      "Trámite", "trámite", "TRÁMITE", "tramite", "TRAMITE", "Tramite"
    ];
    

    try {
      const tokenResponse = await instance.acquireTokenSilent({
        scopes: ['Mail.Read'],
        account: accounts[0],
      });

      const accessToken = tokenResponse.accessToken;
      const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

  
      const seenAlumnos = new Set(); // Para evitar correos repetidos

      const emails = response.data.value
        .filter(email => keywords.some(keyword => email.subject.includes(keyword))) // Filtrar por palabras clave
        .map(email => ({
          alumno: email.from.emailAddress.name,
          asunto: email.subject,
          correo: email.from.emailAddress.address,
          cuerpo: htmlToText(email.body.content, { wordwrap: 130 }),
          fecha: email.receivedDateTime.split('T')[0],
        }))
        .filter(email => {
          if (seenAlumnos.has(email.alumno)) {
            return false; // Si ya está en el Set, lo ignoramos
          } else {
            seenAlumnos.add(email.alumno); // Si no está, lo agregamos
            return true;
          }
        })
        .filterl
        ;

      setDatos(emails);
      enviarDatos(emails);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  return (
    <div className='ContenedorCorreo'>

      <button onClick={fetchMail} className="email-button" >
        <svg

                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-10 h-10 text-gray-800 ml-2"
                    >
                        <path
                            d="M3 8l7 5 7-5M3 8v8c0 .553.447 1 1 1h12c.553 0 1-.447 1-1V8M3 8l7 5 7-5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
                    </svg>
      </button>
    </div>
  );
};

export default Correos;
<svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-10 h-10 text-gray-800 ml-2"
                    >
                        <path
                            d="M3 8l7 5 7-5M3 8v8c0 .553.447 1 1 1h12c.553 0 1-.447 1-1V8M3 8l7 5 7-5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
                    </svg>