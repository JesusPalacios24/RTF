import { readUsers, writeUsers } from '../../libs/fileUtils';
import { hashPassword } from '../../libs/hash'; // Usa la función de hashing que creamos antes.
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Extraer el cuerpo de la solicitud
        const body = await req.json();
        const { username, password } = body;

        // Verificar que se proporcionen ambos campos
        if (!username || !password) {
            return NextResponse.json({ error: 'Usuario y contraseña requeridos' }, { status: 400 });
        }

        // Leer usuarios existentes desde el archivo
        const users = await readUsers();

        // Verificar si el usuario ya existe
        const userExists = users.some((user) => user.username === username);
        if (userExists) {
            return NextResponse.json({ error: 'Usuario ya existe' }, { status: 400 });
        }

        // Hashear la contraseña
        const hashedPassword = await hashPassword(password);

        // Crear el nuevo usuario
        const newUser = { username, password: hashedPassword };
        users.push(newUser);

        // Escribir los usuarios actualizados al archivo
        await writeUsers(users);

        // Responder con éxito
        return NextResponse.json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error('Error registrando usuario:', error.message); // Aquí logueamos el error
        return NextResponse.json({ error: `Error interno del servidor: ${error.message}` }, { status: 500 });
    }
}
