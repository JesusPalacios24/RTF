import { connectToDatabase } from '../../lib/mongodb'; 
import { comparePassword } from '../../libs/hash';  
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { username, password } = body;

        // Validar que ambos campos estén presentes
        if (!username || !password) {
            return NextResponse.json({ error: 'Usuario y contraseña requeridos' }, { status: 400 });
        }

        // Conectar a la base de datos MongoDB
        const { db } = await connectToDatabase();

        // Buscar al usuario en la base de datos
        const user = await db.collection('users').findOne({ username });

        if (!user) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        // Verificar la contraseña
        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        // Si la autenticación es exitosa, enviar la respuesta con el rol del usuario
        return NextResponse.json({
            message: 'Login correcto',
            role: user.role  // Devolvemos el rol del usuario (admin, user, etc.)
        });

    } catch (error) {
        console.error('Error logging in:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
