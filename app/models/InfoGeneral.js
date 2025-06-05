import mongoose, { Schema } from "mongoose";

const InfoGeneralSchema = new Schema({
  numero_control: { type: String, required: true },
  descripcion: { type: String, required: true },
  nombre_proyecto: { type: String, required: true },
  nombre_estudiante: { type: String, required: true },
  numero_estudiantes: { type: String, required: true, default: "1" },
  carrera: { type: String, required: true },
  nombre_asesor: { type: String, required: true },
  titPresidente: { type: String, required: true },
  cedula: { type: String, required: true },
  fecha: { type: Date, required: true }, // Usas formatFecha, así que asumo que es un string tipo "dd/mm/yyyy"
  observaciones: { type: String, required: false }
});

// Crea el modelo basado en el esquema
const InfoGeneral = mongoose.models.Anexo3 || mongoose.model('InfoGeneral', InfoGeneralSchema);

export default InfoGeneral;