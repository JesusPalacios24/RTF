import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
        throw new Error('Error al hashear la contraseña');
    }
}

// Función para comparar una contraseña con su hash
export async function comparePassword(password, hashedPassword) {
    try {
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch (error) {
        console.error('Error al comparar contraseñas:', error);
        throw new Error('Error al comparar contraseñas');
    }
}
