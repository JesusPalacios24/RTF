import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";


const formatFecha = (fecha) => {
    if (!fecha) return "";
  
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    const [año, mes, dia] = fecha.split("-");
    return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} del ${año}`;
  };

export async function POST(req) {
  try {
    const formData = await req.json();

    // Carga la plantilla desde `public/plantillas/plantilla.docx`
    const templatePath = path.join(process.cwd(), "public", "plantillas", "anexo-i.docx");
    const content = fs.readFileSync(templatePath, "binary");

    // Carga el archivo con PizZip y Docxtemplater
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip);

    // Reemplaza los datos en la plantilla
    doc.setData({
      descripcion: formData.descripcion,
      nombre_proyecto: formData.Tema,
      nombre_estudiante: formData.Alumno,
      numero_control: formData.NoControl,
      numero_estudiantes: "1",
      carrera: formData.Carrera,
      nombre_asesor: formData.presidente,
      titPresidente: formData.TitPresidente,
      cedula: formData.Cedula,
      fecha: formatFecha(formData.FechaRegistro),  
      observaciones: formData.Observaciones,
    });

    doc.render();

    // Genera el archivo en memoria
    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    // Devuelve el documento generado como respuesta
    return new NextResponse(buffer, {
      headers: {
        "Content-Disposition": "attachment; filename=Anexo1.docx",
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    });
  } catch (error) {
    console.error("Error al generar el documento:", error);
    return NextResponse.json({ message: "Error al generar el documento" }, { status: 500 });
  }
}
