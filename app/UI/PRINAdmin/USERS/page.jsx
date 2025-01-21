'use client'
import { useState } from "react";

export default function Creacion (){

    const [username,setusername] = useState('');
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
                body: JSON.stringify({ username: username, password: password}),
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
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Alta de usuarios</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Usuario</label>
                    <input
                    type="text"
                    placeholder="username"
                    required
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                <div>
                    <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    >
                    Crear
                    </button>
                </div>
                </form>
                {mensaje && <p className="mt-4 text-center text-sm text-red-500">{mensaje}</p>}
            </div>
            </div>


    );
}