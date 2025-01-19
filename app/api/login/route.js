import { readUsers, writeUsers } from '../../libs/fileUtils';
import { comparePassword } from '../../libs/hash';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Usuario y contrasena requeridos' }, { status: 400 });
    }

    // Leer usuarios del archivo JSON
    const users = await readUsers();

    // Buscar el usuario por nombre
    const user = users.find((user) => user.username === username);
    if (!user) {
      return NextResponse.json({ error: 'Credenciales invalidas' }, { status: 401 });
    }

    // Verificar la contraseña
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Credenciales invalidas' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login Correcto' });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
