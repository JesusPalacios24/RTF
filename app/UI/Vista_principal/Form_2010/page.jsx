"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function FormPage() {
  const searchParams = useSearchParams(); // Obtener los parámetros de la URL

  const [formData, setFormData] = useState({
    descripcion: "TITULACIÓN INTEGRAL 'INFORME TÉCNICO DE RESIDENCIA PROFESIONAL'",
    Tema: "",
    Alumno: "",
    NoControl: "",
    opcion: "Titulación Integral",
    Carrera: "",
    presidente: "",
    TitPresidente: "",
    Cedula: "",
    FechaRegistro: "",
    Observaciones: "",
  });

  // Cargar datos desde la URL
  useEffect(() => {
    const nombre = searchParams.get("Nombre") || "";
    const matricula = searchParams.get("Matricula") || "";
    setFormData((prev) => ({
      ...prev,
      Alumno: nombre,
      NoControl: matricula,
    }));
  }, [searchParams]);

  // Obtener la fecha actual al cargar
  useEffect(() => {
    const hoy = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, FechaRegistro: hoy }));
  }, []);

  // Lista de presidentes
  const [presidente, setPresidente] = useState([]);
  const [filteredPresidentes, setFilteredPresidentes] = useState([]);

  useEffect(() => {
    const fetchPresidentes = async () => {
      try {
        const response = await fetch("/api/asesores");
        const data = await response.json();
        setPresidente(data);
      } catch (error) {
        console.error("Error al obtener los presidentes:", error);
      }
    };
    fetchPresidentes();
  }, []);

  const handleSelectPresidente = (pres) => {
    setFormData({
      ...formData,
      presidente: pres.presidente,
      TitPresidente: pres.tituloProf,
      Cedula: pres.cedulaProfesional,
    });
    setFilteredPresidentes([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "presidente") {
      const filtered = presidente.filter((pres) =>
        pres.presidente?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPresidentes(filtered);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/anexo1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al generar el documento");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Anexo1.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Subir a MongoDB
      const archivoFile = new File([blob], "Anexo1.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const formDataToUpload = new FormData();
      formDataToUpload.append("idDoc", formData.NoControl);
      formDataToUpload.append("nombreAlumno", formData.Alumno);
      formDataToUpload.append("documentoAdjunto", archivoFile);
      formDataToUpload.append("anexo", "Anexo1");

      const uploadResponse = await fetch("/api/documentos", {
        method: "POST",
        body: formDataToUpload,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        alert("El documento fue generado pero no se pudo guardar: " + uploadData.error);
      } else {
        alert("Documento generado y guardado correctamente.");
      }

      // Redirigir a la página principal después del envío
      window.location.href = "/";
    } catch (error) {
      console.error("Error al generar o guardar el documento:", error);
      alert("Hubo un error al generar o guardar el documento");
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Registro de Anexo 1</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Tipo de Anexo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Anexo</label>
            <select
              name="opcion"
              value={formData.opcion}
              onChange={handleChange}
              className="border p-2 w-full rounded-lg"
              required
            >
              <option value="Titulación Integral">Titulación Integral</option>
              <option value="tesis">Por tesis</option>
              <option value="examen">Por examen</option>
              <option value="nose">No me acuerdo jijijai</option>
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-black">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Tema */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tema</label>
            <input
              name="Tema"
              value={formData.Tema}
              onChange={handleChange}
              placeholder="Nombre del Proyecto"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Nombre del alumno */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Sustentante</label>
            <input
              name="Alumno"
              value={formData.Alumno}
              onChange={handleChange}
              placeholder="Nombre del Alumno"
              readOnly={!!formData.Alumno}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Número de Control */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de Control</label>
            <input
              name="NoControl"
              value={formData.NoControl}
              onChange={handleChange}
              placeholder="Número de Control"
              readOnly={!!formData.Alumno}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Carrera */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Carrera</label>
            <input
              name="Carrera"
              value={formData.Carrera}
              onChange={handleChange}
              placeholder="Carrera del estudiante"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Presidente */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Presidente</label>
            <input
              name="presidente"
              value={formData.presidente}
              onChange={handleChange}
              placeholder="Asesor del Anteproyecto"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              autoComplete="off"
              required
            />
            {filteredPresidentes.length > 0 && (
              <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-48 overflow-auto">
                {filteredPresidentes.map((pres, index) => (
                  <li
                    key={pres.id || `pres-${index}`}
                    onClick={() => handleSelectPresidente(pres)}
                    className="flex flex-col p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    <span className="font-semibold text-gray-900">{pres.presidente}</span>
                    <span className="text-xs text-gray-600">{pres.tituloProf} - Cédula: {pres.cedulaProfesional}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Título del Presidente */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Título del Presidente</label>
            <input
              name="TitPresidente"
              value={formData.TitPresidente || ""}
              readOnly
              placeholder="Grado de Educación del Asesor"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Cédula Profesional */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Cédula Profesional</label>
            <input
              name="Cedula"
              value={formData.Cedula || ""}
              readOnly
              placeholder="Cédula Profesional del Asesor"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Fecha de Registro */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha de Registro</label>
            <input
              type="date"
              name="FechaRegistro"
              value={formData.FechaRegistro}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Observaciones</label>
            <textarea
              name="Observaciones"
              value={formData.Observaciones}
              onChange={handleChange}
              placeholder="Observaciones"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
