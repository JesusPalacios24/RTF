import mongoose from "mongoose";
import connectToDatabase from "@/app/libs/Mongoose";
import Documentos from "@/app/models/Documentos";
import { GridFSBucket, ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    const documento = await Documentos.findOne({ idDoc: id });
    if (!documento) {
      return new Response(
        JSON.stringify({ error: 'Documento no encontrado' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: 'archivos' });

    const fileId = new ObjectId(documento.documentoAdjunto);
    const downloadStream = bucket.openDownloadStream(fileId);

    const streamToBuffer = async (stream) => {
      const chunks = [];
      return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
      });
    };

    const buffer = await streamToBuffer(downloadStream);

    return new Response(buffer, {
      status: 200,
      headers: {
        // tipo de archivo
        "Content-Type": documento.tipoMIME,

        // Tratar de mostrar el documento antes de descararlo
        "Content-Disposition": `inline; filename="${documento.idDoc}"`,
        
        // Funcion para evitar problemas de cache
        "Cache-Control": "no-store"
      },
      
    }
    
    );
    console.log("si se pudo acceder al doc");

  } catch (error) {
    console.error('Error al obtener el documento:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
