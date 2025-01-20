import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import axios from 'axios';
import { htmlToText } from 'html-to-text'; 

const Correos = ({ enviarDatos }) => {
  const { instance, accounts } = useMsal();
  const [datos, setDatos] = useState([]);

  const fetchMail = async () => {
    if (accounts.length === 0) {
      instance.loginRedirect({
        scopes: ['Mail.Read'],
      });
      return;
    }

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

      const seenAlumnos = new Set();
      const emails = response.data.value
        .filter(email => email.subject.includes('titulación'))
        .map(email => ({
          alumno: email.from.emailAddress.name,
          asunto: email.subject,
          cuerpo: htmlToText(email.body.content, { wordwrap: 130 }),
          fecha: email.receivedDateTime.split('T')[0],
        }))
        .filter(email => {
          if (seenAlumnos.has(email.alumno)) {
            return false;
          } else {
            seenAlumnos.add(email.alumno);
            return true;
          }
        });

      setDatos(emails);
      enviarDatos(emails);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  return (
    <div className='ContenedorCorreo'>
      <button onClick={fetchMail} className="email-button">
        ✉️
      </button>
    </div>
  );
};

export default Correos;
