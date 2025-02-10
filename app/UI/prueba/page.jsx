// pages/index.js
"use client";

import Correos from '@/app/components/correo';
import React from 'react';

const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

const Home = () => {
  const handleData = (emails) => {
    console.log('Emails:', emails);
  };

  return (

          <div className="flex flex-col justify-between items-center w-12 h-10 cursor-pointer border-2 border-gray-700 rounded-lg">
          
          {/* Mueve el componente fuera del botón */}
          <Correos enviarDatos={handleData} />
        </div>
    
  );
};

export default Home;
