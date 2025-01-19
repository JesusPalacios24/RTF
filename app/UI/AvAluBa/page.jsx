

export default function AvAlB() {
    return (
      <div className="flex flex-col h-screen bg-white">
        {/* Encabezado */}
        <header className="flex justify-between items-center bg-red-700 text-white p-4">
          <img
            src="/logo1.png"
            alt="Logo Izquierdo"
            className="h-12"
          />
          
          <img
            src="/logo2.png"
            alt="Logo Derecho"
            className="h-12"
          />
        </header>
  
        {/* Contenido principal */}
        <div className="flex flex-1">
          {/* Barra lateral */}
          <aside className="w-1/4 bg-red-600 text-white p-4 flex flex-col justify-around">
            <button className="py-8 bg-white text-red-600 font-semibold rounded hover:bg-gray-200">
              Anexo 1
            </button>
            <button className="py-8 bg-white text-red-600 font-semibold rounded hover:bg-gray-200">
              Anexo 2
            </button>
            <button className="py-8 bg-white text-red-600 font-semibold rounded hover:bg-gray-200">
              Anexo 3
            </button>
            <button className="py-8 bg-white text-red-600 font-semibold rounded hover:bg-gray-200">
              Anexo 4
            </button>
            <button className="py-8 bg-white text-red-600 font-semibold rounded hover:bg-gray-200">
              Anexo 5
            </button>
          </aside>
  
          {/* Área de contenido */}
          <section className="flex-1 flex items-center justify-center border bg-gray-100 p-4">
            <h2 className="text-2xl font-bold">Resumen</h2>
          </section>
        </div>
      </div>
    );
  }
  
  