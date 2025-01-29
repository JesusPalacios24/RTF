import connectToDatabase from "../../libs/Mongoose";
import Alumnos from "../../models/Alumnos";

export async function POST(req) {
    try {
        await connectToDatabase(); // Conectar a la base de datos

        //Obtener los datos del cuerpo de la solicitud
        const { nombre, carrera, noControl, nomProyecto,producto,fechaActual } = await req.json();

        // Validar que todos los campos estén presentes y especificar cuál falta
        let campoVacio = '';

        if (!nombre) campoVacio = 'nombre';
        else if (!carrera) campoVacio = 'carrera';
        else if (!noControl) campoVacio = 'nControl';
        else if (!nomProyecto) campoVacio = 'nombre del proyecto';
        else if (!producto) campoVacio = 'producto';
        else if (!fechaActual) campoVacio = 'fecha actual';

        if (campoVacio) {
            return new Response(
                JSON.stringify({ error: `El campo '${campoVacio}' es obligatorio` }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        //Verificar si el Alumno Existe
        const existingAlumno = await Alumnos.findOne({ noControl });
        if (existingAlumno) {
            return new Response(
                JSON.stringify({ error: 'El número de control del alumno ya existe' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Crear un nuevo Alumno
        const alumno = new Alumnos({
            nombre,
            carrera,
            noControl,
            nomProyecto,
            producto,
            fechaActual,
        });

        // Guardar el Alumno en la base de datos
        await alumno.save();
        
        // Responder con éxito
        return new Response(
            JSON.stringify({ message: 'Alumno registrado exitosamente' }),
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