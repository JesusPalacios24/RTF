'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';  // Para redirigir al usuario

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const router = useRouter();  // Hook de Next.js para redirigir

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user, password: password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje(`Login exitoso: ${data.message}`);
                // Dependiendo del tipo de usuario, redirige a diferentes páginas
                if (data.role === 'Jefe Dep.') {
                    router.push('/PRINCa');  // Redirigir al panel de admin
                } else if (data.role === 'JVSyC') {
                    router.push('/PRINBa');  // Redirigir al panel de usuario
                }
            } else {
                setMensaje(`Error: ${data.error}`);
            }
        } catch (error) {
            setMensaje('Error al conectarse al servidor');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <p>Usuario</p>
                <input
                    type="text"
                    placeholder="Username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />

                <p>Contraseña</p>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
