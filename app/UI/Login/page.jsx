'use client'
import React from "react";
import { useState } from "react";


export default function Login(){
    const [user,setUser] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');


    const handleLogin= async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user, password: password}),
            });
    
            const data = await response.json();
            if (response.ok) {
                setMensaje(`Login exitoso: ${data.message}`);
            } else {
                setMensaje(`Error: ${data.error}`);
            }
        } catch (error) {
            setMensaje('Error al conectarse al servidor');
            console.error(error);
        }
        };

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
            <h1>Login Page</h1>
            <form>
                <p>Usuario</p>
                <input type="text" placeholder="Username" value={user} onChange={(e)=>setUser(e.target.value)}/>

                <p>Contraseña</p>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <button type="submit" onClick={handleLogin}>Login</button>
                <p></p>
                <button type="submit" onClick={handleRegister}>Crear</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    )
}