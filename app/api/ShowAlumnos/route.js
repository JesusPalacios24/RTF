import connectMongo from '../../libs/Mongoose';
import Alumno from '../../models/ShowAlumnos';

export async function GET() {
  try {
    // Establecer la conexión a MongoDB
    await connectMongo();

    // Obtener todos los alumnos de la base de datos
    const alumnos = await Alumno.find(); // Usamos el modelo de Alumno para hacer la consulta

    // Retornar los datos de los alumnos como respuesta
    return new Response(JSON.stringify(alumnos), { status: 200 });
  } catch (error) {
    console.error('Error al obtener los alumnos:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener los alumnos' }), { status: 500 });
  }
}
