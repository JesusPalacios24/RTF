"use client";
import { useEffect } from "react";

export default function Popup() {
  useEffect(() => {
    const escucharMensajes = (event) => {
      if (event.data?.tipo === "SALUDO") {
        alert("Mensaje recibido: " + event.data.mensaje);
      }
    };

    window.addEventListener("message", escucharMensajes);

    return () => window.removeEventListener("message", escucharMensajes);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Popup</h1>
      <p>Esperando mensajes...</p>
    </div>
  );
}
