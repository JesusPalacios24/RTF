import connectToDatabase from "@/app/libs/Mongoose"; // Conecta a la BD
import Anexo3 from "@/app/models/Anexo3"; // Modelo de documentos Anexo3
import { NextResponse } from "next/server"; // Respuestas de Next.js

export async function POST(req) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const idDoc = formData.get('idDoc');
    const nombreAlumno = formData.get('nombreAlumno');
    const nombreProyecto = formData.get('nombreProyecto');
    const nombreAsesor = formData.get('nombreAsesor');
    const anexo = formData.get('anexo');
    const carrera = formData.get('Carrera');
    const ultimoCambio = formData.get('Ultimo_cambio');

    if (!idDoc || !nombreAlumno || !nombreProyecto || !nombreAsesor || !anexo || !carrera || !ultimoCambio) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son obligatorios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const nuevoAnexo3 = new Anexo3({
      idDoc,
      nombreAlumno,
      nombreProyecto,
      nombreAsesor,
      anexo,
      Carrera: carrera,
      Ultimo_cambio: new Date(ultimoCambio)
    });

    await nuevoAnexo3.save();

    return new Response(
      JSON.stringify({ message: 'Anexo 3 registrado exitosamente' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al registrar el Anexo 3:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', detalle: error.message || error.toString() }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}