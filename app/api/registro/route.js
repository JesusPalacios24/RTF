import connectToDatabase from '../../libs/Mongoose';
import { hashPassword } from '../../libs/hash'; // Usa la función de hashing que creamos antes.
import User from '../../models/User';

export async function POST(req,res) {
    // Verifica que la solicitud sea de tipo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { username, password } = req.body;

  // Verificar si los datos están completos
  if (!username || !password) {
    return res.status(400).json({ error: 'El nombre de usuario y la contraseña son requeridos' });
  }

  try {
    // Conectar a la base de datos
    await connectToDatabase();

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear un nuevo usuario
    const newUser = new User({ username, password: hashedPassword });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Responder con un mensaje de éxito
    res.status(201).json({ message: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
}
