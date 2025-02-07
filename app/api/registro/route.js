import connectToDatabase from '../../libs/Mongoose'; // Conexión a MongoDB
import { hashPassword } from '../../libs/hash'; // Función para hashear contraseñas
import User from '../../models/User'; // Modelo del usuario


// Ruta para registrar un nuevo usuario
export async function POST(req) {
  try {
    await connectToDatabase(); // Conectar a la base de datos

    // Obtener los datos del cuerpo de la solicitud
    const { username, password } = await req.json();

    // Validar que el usuario y contraseña no estén vacíos
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'El nombre de usuario y la contraseña son obligatorios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'El nombre de usuario ya está en uso' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password);
    

    // Crear un nuevo usuario con la contraseña hasheada
    const newUser = new User({ username, password: hashedPassword });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Responder con éxito
    return new Response(
      JSON.stringify({ message: 'Usuario registrado exitosamente' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
