// pages/index.js
"use client";

import Correos from '@/app/components/correo';
import React from 'react';


const Home = () => {
  const handleData = (emails) => {
    console.log('Emails:', emails);
  };

  return (
    <div>
      <h1>Mis Correos</h1>
      <Correos enviarDatos={handleData} />
    </div>
  );
};

export default Home;
