import mongoose from "mongoose";
import connectToDatabase from "@/app/libs/Mongoose"; //Conecta a la BD 
import Documentos from "@/app/models/Documentos"; //LLama al modelo de documentos en la BD
import { GridFSBucket,ObjectId } from 'mongodb'; //Funciona para el proceso de almacenamiento de los documentos

//Funcion para descargar los anexos de la BD
export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;
        
        // Buscar documento
        const documento = await Documentos.findOne({ idDoc: id });
        if (!documento) {
            return new Response(
                JSON.stringify({ error: 'Documento no encontrado' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }


        // Conectar a la base de datos y crear un bucket para GridFS
        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'archivos' });

        //obtener el archivo de GridFS usando el ID del documento
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
                "Content-Type": documento.tipoMIME,
                "Content-Disposition": `attachment; filename="${documento.idDoc}"`,
            },
        });

    } catch (error) {
        console.error('Error al obtener el documento:', error);
        return new Response(
            JSON.stringify({ error: 'Error interno del servidor' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}