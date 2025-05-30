"use client";
import { useRef } from "react";

export default function Home() {
  const popupRef = useRef(null);

  const abrirVentana = () => {
    popupRef.current = window.open("./test2/test3/", "page", "width=400,height=300");
  };

  const enviarTrigger = () => {
    if (popupRef.current) {
      popupRef.current.postMessage({ tipo: "SALUDO", mensaje: "¡Hola desde index!" }, "*");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ventana Principal</h1>
      <button onClick={abrirVentana}>Abrir popup</button>
      <button onClick={enviarTrigger} style={{ marginLeft: "10px" }}>
        Enviar trigger
      </button>
    </div>
  );
}
