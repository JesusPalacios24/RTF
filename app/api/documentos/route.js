import mongoose from "mongoose";
import connectToDatabase from "@/app/libs/Mongoose"; //Conecta a la BD 
import Documentos from "@/app/models/Documentos"; //LLama al modelo de documentos en la BD
import { GridFSBucket, ObjectId } from 'mongodb'; //Funciona para el proceso de almacenamiento de los documentos
import { NextResponse } from "next/server"; //Importa NextResponse = Que son respuestas de next


export async function POST(req) {
    try {
        await connectToDatabase();
        //leer los datos del cuerpo de la solicitud
        const formData = await req.formData();
        const id = formData.get('idDoc');
        const nombreAlumno = formData.get('nombreAlumno');
        const documentoAdjunto = formData.get('documentoAdjunto');
        const tipoMime = formData.get('tipoMime');

        //Validar que todos los campos esten presentes y especificar cual falta

        if (!id || !nombreAlumno || !documentoAdjunto || documentoAdjunto.size == 0) {
            return new Response(
                JSON.stringify({ error: 'Todos los campos son obligatorios' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        //convertir el archivo a un buffer para poder subirlo a GridFS
        const Arraybuffer = await documentoAdjunto.arrayBuffer();
        const buffer = Buffer.from(Arraybuffer);


        //Subir archivo a GridFS
        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db, { bucketName: 'archivos' });


        const uploadStream = bucket.openUploadStream(documentoAdjunto.name, {
            contentType: documentoAdjunto.type,
        });
        uploadStream.end(buffer); // subir el archivo como buffer

        //Esperamos a que el archivo se suba correctamente
        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        });

        // Guardamos el documento con el ID del archivo en la base de datos
        const documentoNuevo = new Documentos({
            idDoc: id,
            nombreAlumno: nombreAlumno,
            documentoAdjunto: uploadStream.id, // Guardamos el ID del archivo subido
            tipoMIME: documentoAdjunto.type,
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