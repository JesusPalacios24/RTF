import { createReadStream } from "fs";
import mongoose, { Schema } from "mongoose";

const DocumentosSchema = new Schema({
    idDoc: { type: String, required: true },
    nombreAlumno: { type: String, required: true },
    documentoAdjunto: { type: mongoose.Schema.Types.ObjectId, required: true},
    anexo: { type: String, required: true },
    tipoMIME: { type: String, required: true },
    Carrera: {type: String, required: true },
    Ultimo_cambio: {type: Date, required: true}
});

// Crea el modelo basado en el esquema
const Documentos = mongoose.models.Documentos || mongoose.model('Documentos', DocumentosSchema);
export default Documentos;