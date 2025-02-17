import React from 'react';
import CorreosAce from '../../models/CorreosAce';
import connectToDatabase from '../../libs/Mongoose';

import { readCorreos, writeCorreos } from '../../libs/fileUtils';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';


//Edpoint para mostrar correos

export async function GET() { 
    try {

        await connectToDatabase();
        
        //Obtneer los correos
        const correos = await CorreosAce.find();

        //Devolver los correos
        return new NextResponse(
            JSON.stringify(correos),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error al obtener los correos:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener los correos' }), { status: 500 });
        });
        
    }   
        
    
}

//Endpoint para agregar correos

export async function POST(req) {
    try {
        await connectToDatabase();
    
        //obtner datos
        const { correo } = await req.json();

        //Registrar Correo Aceptado
        const correoAce = CorreosAce({correo});

        //Guardar en la BD
        await correoAce.save();

        //Respuesta
        return new NextResponse(
            JSON.stringify({ message: 'Correo agregado exitosamente' }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error al registrar el correo:', error);
        return new Response(
            JSON.stringify({ error: 'Error interno del servidor' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

