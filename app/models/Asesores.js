import mongoose from 'mongoose';

const AsesoresSchema = new mongoose.Schema({
    presidente: { type: String, required: true }, //Nombre del asesor del ANTEPROYECTO
    tituloProf: { type: String, required: true }, //Grado de Educacion
    cedulaProfesional: { type: String ,required: true }, 
    
});

// Crea el modelo basado en el esquema

// Evita volver a definir el modelo si ya existe
const Asesores = mongoose.models.Asesores || mongoose.model("Asesores", AsesoresSchema);

export default Asesores;