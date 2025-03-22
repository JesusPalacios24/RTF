"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function FormPage() {

    const searchParams = useSearchParams(); // Obtener los parámetros de la URL
  
    const [formData, setFormData] = useState({
      descripcion: `TITULACIÓN INTEGRAL "INFORME TÉCNICO DE RESIDENCIA PROFESIONAL"`,
      Tema: "",
      Alumno: "",
      NoControl: "",
      opcion: "Titulación Integral",
      carrera: "",
      presidente: "",
      TitPresidente: "",
      Cedula: "",
    });
  
    // Cargar datos desde la URL cuando el componente se monta
    useEffect(() => {
      const nombre = searchParams.get("Nombre") || "";
      const matricula = searchParams.get("Matricula") || "";
  
      setFormData((prev) => ({
        ...prev,
        Alumno: nombre,
        NoControl: matricula
      }));
    }, [searchParams]); // Se ejecuta cuando cambian los parámetros de la URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    
  };

  const [opcion, setOpcion] = useState("");

  return (
    <div className="pt-16 ">

        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Registro de Anexo 1</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        
                   {/*  Select dentro de formData */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Anexo</label>
            <select
              name="opcion"
              value={formData.opcion}
              onChange={handleChange}
              className="border p-2 w-full rounded-lg"
              required
            >
              <option value="">Titulación Integral</option>
              <option value="tesis">Por tesis</option>
              <option value="examen">Por examen</option>
              <option value="nose">No me acuerdo jijijai</option>
            </select>
          </div>

          {/*  Descripción */}
          <div>
            <label className="block text-sm font-medium text-black">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/*  Tema */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tema</label>
            <input
              name="Tema"
              value={formData.Tema}
              onChange={handleChange}
              placeholder="Nombre del Proyecto"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/*  Nombre del alumno */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Sustentante</label>
            <input
              name="Alumno"
              value={formData.Alumno}
              onChange={handleChange}
              placeholder="Nombre del Alumno"
              readOnly={!!formData.Alumno}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/*  Número de Control */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de Control</label>
            <input
              name="NoControl"
              value={formData.NoControl}
              onChange={handleChange}
              placeholder="Número de Control"
              readOnly={!!formData.Alumno}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

           {/*  Carrera */}
           <div>
            <label className="block text-sm font-medium text-gray-700">Carrera</label>
            <input
              name="Carrera"
              value={formData.Carrera}
              onChange={handleChange}
              placeholder="Carrera que cursa el estudiante"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

            {/*  Presidente */}
            <div>
            <label className="block text-sm font-medium text-gray-700">Presidente</label>
            <input
              name="presidente"
              value={formData.presidente}
              onChange={handleChange}
              placeholder="Asesor del Anteproyecto"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

           {/*  Titulo del Presidente */}
           <div>
            <label className="block text-sm font-medium text-gray-700">Título del Presidente</label>
            <input
              name="TitPresidente"
              value={formData.TitPresidente}
              onChange={handleChange}
              placeholder="Grado de educación del presidente"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

           {/*  Cedula Profesional */}
           <div>
            <label className="block text-sm font-medium text-gray-700">Cedula Profesional</label>
            <input
              name="Cedula"
              value={formData.Cedula}
              onChange={handleChange}
              placeholder="Cédula Profesional del presidente, matricula, etc."
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

            <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
            Enviar
            </button>
        </form>
        </div>
    </div>
  );
}
