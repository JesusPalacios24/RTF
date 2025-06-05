import mongoose from "mongoose";
import connectToDatabase from "@/app/libs/Mongoose";
import Documentos from "@/app/models/Documentos"; // Modelo de documentos en la BD

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    const documento = await Documentos.findOne({ idDoc: id });

    if (!documento) {
      return new Response(JSON.stringify({ error: "Documento no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Solo devolver los metadatos necesarios
    const { nombreAlumno, Carrera } = documento;

    return new Response(JSON.stringify({ nombreAlumno, Carrera }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
  
    });
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    return new Response(JSON.stringify({ error: "Error al obtener documentos", detalle: error.message || error.toString()  }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
