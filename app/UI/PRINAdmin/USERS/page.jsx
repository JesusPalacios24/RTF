'use client'
import { useState } from "react";

export default function Creacion (){

    const [user,setUser] = useState('');
        const [password, setPassword] = useState('');
        const [mensaje, setMensaje] = useState('');

// Funcion para  el registro de usuario
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user, password: password}),
            });

            const data = await response.json();
            if (response.ok) {
                setMensaje(`Registro exitoso: ${data.message}`);
            } else {
                setMensaje(`Error: ${data.error}`);
            }
        } catch (error) {
            setMensaje('Error al conectarse al servidor');
            console.error(error);
        }
    };
    return(


        <div>
            <h1>Creacion</h1>
            <form onSubmit={handleRegister}>
                <p>Usuario</p>
                <input type="text" placeholder="Username" value={user} onChange={(e)=>setUser(e.target.value)}/>

                <p>Contraseña</p>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <p></p>
                <button type="submit" >Crear</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>

    );
}