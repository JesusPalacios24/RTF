import mongoose from "mongoose";
import connectToDatabase from "@/app/libs/Mongoose"; // Conecta a la BD
import Documentos from "@/app/models/Documentos"; // Modelo de documentos en la BD
import { GridFSBucket } from 'mongodb'; // Para almacenamiento de archivos
import { NextResponse } from "next/server"; // Respuestas de Next.js

export async function POST(req) {
  try {
    await connectToDatabase();

    // Leer los datos del cuerpo de la solicitud
    const formData = await req.formData();
    const id = formData.get('idDoc');
    const nombreAlumno = formData.get('nombreAlumno');
    const documentoAdjunto = formData.get('documentoAdjunto');
    const anexo = formData.get('anexo');
    const tipoMime = formData.get('tipoMime');

    // Validación
    if (!id || !nombreAlumno || !documentoAdjunto || documentoAdjunto.size === 0 || !anexo) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son obligatorios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Convertir archivo a buffer
    const arrayBuffer = await documentoAdjunto.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Subir archivo a GridFS
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'archivos' });

    const uploadStream = bucket.openUploadStream(documentoAdjunto.name, {
      contentType: documentoAdjunto.type,
    });

    uploadStream.end(buffer);

    await new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve);
      uploadStream.on('error', reject);
    });

    // Guardar metadatos en la colección de documentos
    const documentoNuevo = new Documentos({
      idDoc: id,
      nombreAlumno: nombreAlumno,
      documentoAdjunto: uploadStream.id, // ID del archivo en GridFS
      tipoMIME: documentoAdjunto.type,
      anexo: anexo, // <-- Guardar campo anexo
    });

    await documentoNuevo.save();

    return new Response(
      JSON.stringify({ message: 'Documento registrado exitosamente' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al registrar el Documento:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

//método GET para listar alumnos
export async function GET() {
  try {
    await connectToDatabase();
    const documentos = await Documentos.find({}, "nombreAlumno idDoc anexo").lean();

    return new Response(JSON.stringify(documentos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener documentos:", error);
    return new Response(JSON.stringify({ error: "Error al obtener documentos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}