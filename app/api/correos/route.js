import React from 'react';
import { readCorreos, writeCorreos } from '../../libs/fileUtils';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';


//Edpoint para mostrar correos
export async function GET() { 
    try {

        const correo = await readCorreos();

        return new Response(JSON.stringify(correo), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Error para obtener correos: ",error);
        return new NextResponse('Error al leer los  correos', { status: 500,  headers: { 'Content-Type': 'application/json' },
        });
        
    }   
        
    
}

