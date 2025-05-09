import fs from "fs/promises"; //Importa Fs = Funciona para el manejo de documentos
import path from "path"; //Importa Path = Funciona para enrutar los documentos
import PizZip from "pizzip"; //Es una biblioteca de JavaScript utilizada para crear, leer y manipular archivos ZIP
import Docxtemplater from "docxtemplater"; //Importa Docxtemplater = Funciona para leer y escribir documentos docx

// Definir los campos requeridos por cada plantilla
const plantillaCampos = {
  "anexo-i": ["nombre_proyecto", "nombre_asesor", "fecha", "numero_estudiantes", "nombre_estudiante", "numero_control", "carrera", "observaciones"],
  "anexo-iii": ["nombre_egresado", "carrera", "numero_control", "nombre_proyecto", "nombre_asesor", "nombre_revisor1", "nombre_revisor2"],
  "anexo-v": ["nombre_presidente", "maestria_presidente", "cedula_presidente", "nombre_secretario", "maestria_secretario", "cedula_secretario", "nombre_vocal", "maestria_vocal", "cedula_vocal", "nombre_vocal_suplente", "maestria_vocal_suplente", "cedula_vocal_suplente", "carrera_fecha_realizado", "hora", "producto", "tema"]
};

//Funcion para solo aceptar el metodo POST necesario
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const datos = req.body;
    const plantillaSeleccionada = datos.plantilla;
    const camposRequeridos = plantillaCampos[plantillaSeleccionada];

    // Validar que todos los campos requeridos están presentes
    const camposFaltantes = camposRequeridos.filter(campo => !datos[campo]);
    if (camposFaltantes.length > 0) {
      return res.status(400).json({ error: `Faltan campos: ${camposFaltantes.join(", ")}` });
    }

    // Cargar la plantilla
    const templatePath = path.join(process.cwd(), "public", "plantillas", `${plantillaSeleccionada}.docx`);
    const content = await fs.readFile(templatePath, "binary");
    
    // Crear un ZIP y un documento de docxtemplater
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
    doc.setData(datos);

    try {
      doc.render();
    } catch (error) {
      return res.status(500).json({ error: "Error al generar el documento" });
    }

    // Generar el archivo
    const nombreArchivo = `documento-${plantillaSeleccionada}.docx`;
    const outputPath = path.join(process.cwd(), "public", nombreArchivo);
    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    await fs.writeFile(outputPath, buffer);

    return res.status(200).json({ url: `/` + nombreArchivo });
  } catch (error) {
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
