import { createReadStream } from "fs";
import mongoose, { Schema } from "mongoose";

const Anexo3Schema = new Schema({
    idDoc: { type: String, required: true },
    nombreAlumno: { type: String, required: true },
    nombreProyecto: { type: String, required: true },
    nombreAsesor: { type: String, required: true },
    anexo: { type: String, required: true },
    Carrera: {type: String, required: true },
    Ultimo_cambio: {type: Date, required: true}
});

// Crea el modelo basado en el esquema
const Anexo3 = mongoose.models.Anexo3 || mongoose.model('Anexo3', Anexo3Schema);
export default Anexo3;