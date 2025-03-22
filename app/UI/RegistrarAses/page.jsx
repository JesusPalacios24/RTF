'use client'
import React, { useState } from "react";
import ListaAsesores from "./ListaAses";
import FormularioAsesor from "./FormularioAsesor";

export default function RegistroAses() {
    const [vista, setVista] = useState("ver"); // Estado para cambiar de vista

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
           <div className="flex justify-around mb-4">
              <button onClick={() => setVista("ver")} className="px-6 py-3  text-lg bg-gray-300 rounded-xl hover:bg-gray-400 transform transition-all duration-200 hover:scale-105">
                  Ver
              </button>
              <button onClick={() => setVista("alta")} className="px-6 py-3 text-lg bg-blue-500 text-white rounded-xl hover:bg-blue-600 transform transition-all duration-200 hover:scale-105">
                  Alta
              </button>

          </div>


            {/* Renderizar componente según la vista */}
            {vista === "ver" && <ListaAsesores />}
            {vista === "alta" && <FormularioAsesor />}
           
        </div>
    );
}
