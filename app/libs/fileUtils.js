import fs from 'fs';
import path from 'path';

const dataDirPath = path.join(process.cwd(), 'data');
const usersFilePath = path.join(dataDirPath, 'users.json');

// Función para leer los usuarios desde el archivo
export async function readUsers() {
    try {
        // Verificar si la carpeta 'data' existe, si no, crearla
        if (!fs.existsSync(dataDirPath)) {
            fs.mkdirSync(dataDirPath);
        }

        // Verificar si el archivo de usuarios existe
        if (!fs.existsSync(usersFilePath)) {
            // Si el archivo no existe, crear uno vacío
            await fs.promises.writeFile(usersFilePath, JSON.stringify([]));
            return [];
        }

        // Leer el archivo de usuarios
        const data = await fs.promises.readFile(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo el archivo de usuarios:', error);
        // Retorna un arreglo vacío en caso de error
        return [];
    }
}

// Función para escribir los usuarios en el archivo
export async function writeUsers(users) {
    try {
        // Verificar si la carpeta 'data' existe, si no, crearla
        if (!fs.existsSync(dataDirPath)) {
            fs.mkdirSync(dataDirPath);
        }

        // Escribir los usuarios en el archivo
        await fs.promises.writeFile(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error escribiendo el archivo de usuarios:', error);
    }
}
