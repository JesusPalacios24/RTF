import fs from 'fs';
import path from 'path';

const dataDirPath = path.join(process.cwd(), 'data');
const usersFilePath = path.join(dataDirPath, 'users.json');
const correoFilePath = path.join(dataDirPath,'correos.json');

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


// Función para leer los correos desde el archivo

export async function readCorreos() {
    try {
        // Verificar si la carpeta 'data' existe, si no, crearla
        if (!fs.existsSync(dataDirPath)) {
            fs.mkdirSync(dataDirPath);
        }

        // Verificar si el archivo de correos existe
        if (!fs.existsSync(correoFilePath)) {
            // Si el archivo no existe, crear uno vacío
            await fs.promises.writeFile(correoFilePath, JSON.stringify([]));
            return [];
        }
        

        // Leer el archivo de correos
        const data = await fs.promises.readFile(correoFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo el archivo de correos:', error);
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

// Función para escribir los correos en el archivo

export async function writeCorreos(correos) {
    try {
        // Verificar si la carpeta 'data' existe, si no, crearla
        if (!fs.existsSync(dataDirPath)) {
            fs.mkdirSync(dataDirPath);
        }

        // Escribir los correos en el archivo
        await fs.promises.writeFile(correoFilePath, JSON.stringify(correos, null, 2));
    } catch (error) {
        console.error('Error escribiendo el archivo de correos:', error);
    }
}
