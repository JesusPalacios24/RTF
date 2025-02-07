import mongoose from "mongoose";

// Definir el esquema de los alumnos
const ShAlumnosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    noControl: { type: String, required: true, unique: true },
});

// Comprobar si el modelo ya está registrado antes de crearlo
const ShAlumnos = mongoose.models.ShowAlumnos || mongoose.model('ShowAlumnos', ShAlumnosSchema);

export default ShAlumnos;
