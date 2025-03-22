import connectToDatabase from "@/app/libs/Mongoose";
import Asesores from "@/app/models/Asesores";

export async function DELETE(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;

        // Buscar y eliminar el asesor
        const deletedAsesor = await Asesores.findByIdAndDelete(id);

        if (!deletedAsesor) {
            return new Response(
                JSON.stringify({ error: "Asesor no encontrado" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ message: "Asesor eliminado correctamente" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Error al eliminar el asesor:", error);
        return new Response(
            JSON.stringify({ error: "Error interno del servidor" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;
        const { presidente, tituloProf, cedulaProfesional } = await req.json();

        // Validar que los datos no estén vacíos
        if (!presidente || !tituloProf || !cedulaProfesional) {
            return new Response(
                JSON.stringify({ error: "Todos los campos son obligatorios" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const updatedAsesor = await Asesores.findByIdAndUpdate(
            id,
            { presidente, tituloProf, cedulaProfesional },
            { new: true }
        );

        if (!updatedAsesor) {
            return new Response(
                JSON.stringify({ error: "Asesor no encontrado" }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ message: "Asesor actualizado correctamente", asesor: updatedAsesor }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error("Error al actualizar asesor:", error);
        return new Response(
            JSON.stringify({ error: "Error interno del servidor" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}