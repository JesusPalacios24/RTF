'use client'
import React from 'react';

export default function Registro() {

    const fechaFormateada = new Date().toLocaleDateString('es-ES');

    return(
        <div>
            <form>
                <label htmlFor="nombre">Nombre de estudiante:</label>
                <input type="text" id="nombre" name="nombre" required />
                
                <label htmlFor="apellido">Carrera:</label>
                <select name="carreras" id="carrera"  >
                    <option value="Ingenieria en Sistemas">Ingenieria en Sistemas</option>
                    <option value="Ingenieria en Computacion">Ingenieria en Computacion</option>

                </select>

                <label htmlFor="noControl">No.Control:</label>
                <input type="text" id="noControl" name="noControl" required />
                
                <label htmlFor="proyecto">Nombre del Proyecto:</label>
                <input type="text" id="proyecto" name="proyecto" required  />

                <label htmlFor="producto">Producto:</label>
                <input id="producto" name="producto" required/>

                <label htmlFor="fecha">Fecha Actual:</label>
                <label >{fechaFormateada}</label>


                <input type="submit" value="Registrar" />
                
                
            </form>
        </div>
    );
}