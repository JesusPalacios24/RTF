import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
// Definir el esquema de los correros aceptados de los alumnos

const CorreosAceSchema = new mongoose.Schema({
    correo: { type: String, required: true, unique },
});

// Comprobar si el modelo ya está registrado antes de crearlo

const CorreosAce = mongoose.models.CorreosAce || mongoose.model("CorreosAce", CorreosAceSchema);

export default CorreosAce;

// Este esquema define los correos aceptados de los alumnos.