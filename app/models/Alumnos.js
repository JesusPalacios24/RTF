import mongoose from "mongoose";

const AlumnosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    carrera: { type: String, required: true },
    noControl: { type: String, require: true , unique: true },
    nomProyecto: { type: String, required: true },
    producto : { type: String, required: true },
    fechaActual: { type: String, required: true },
});

// Crea el modelo basado en el esquema

const Alumnos = mongoose.models.Alumnos || mongoose.model('Alumnos', AlumnosSchema);

export default Alumnos;

// En este archivo, se define el esquema para la colección de alumnos en MongoDB.