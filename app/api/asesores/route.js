import connectToDatabase from "../../libs/Mongoose";
import Asesores from "../../models/Asesores";

export async function POST(req) {
    try {
        await connectToDatabase();
        //obtener los datos del cuerpo de la solicitud
        const { presidente, tituloProf, cedulaProfesional } = await req.json();
        
        //Validar que todos los campos esten presentes y especificar cual falta

        let campoVacio = '';

        if (!presidente) campoVacio = 'presidente';
        else if (!tituloProf) campoVacio = 'tituloProf';
        else if (!cedulaProfesional) campoVacio = 'cedulaProfesional';
        

        
        if (campoVacio) {
            return new Response(
                JSON.stringify({ error: `El campo '${campoVacio}' es obligatorio` }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        //Registrar Asesor
        const asesor = new Asesores({ 
            presidente, 
            tituloProf, 
            cedulaProfesional, });
            
        //Guardar en la base de datos
        await asesor.save();

        //Retornar respuesta con éxito
        return new Response(
            JSON.stringify({ message: 'Asesor registrado exitosamente' }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    

    } catch (error) {
        console.error('Error al registrar el alumno:', error);
        return new Response(
            JSON.stringify({ error: 'Error interno del servidor' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
        
    }

}
