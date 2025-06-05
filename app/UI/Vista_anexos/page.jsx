"use client";
import { useState, useEffect } from 'react';
import WordViewer from '@/app/components/WordViewer';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';




const PDFViewer = dynamic(() => import('@/app/components/PDFviewer'), { ssr: false });

 


export default function AvAlB() {

   const searchParams = useSearchParams();
   const noControl = searchParams.get('noControl');
   const [nombreAlumno, setNombreAlumno] = useState('');
    const [carrera, setCarrera] = useState('');
    const [selectedAnexo, setSelectedAnexo] = useState(null); 
    const [asesor, setAsesor] = useState(''); // Estado para el asesor
    const [nombreProyecto, setNombreProyecto] = useState(''); // Estado para el nombre del proyecto
  // Estado para verificar si el componente se renderiza en el cliente//
    const [isClient, setIsClient] = useState(false);
    const [file, setFile] = useState(null);



  // Asegurarse de que el componente se renderice en el cliente
    useEffect(() => {
      setIsClient(true);// Esto se ejecuta solo en el cliente
      //Obtener metadatos del Anexo 1 para poder subir los anexos 2 y 4 creo

      const obtenerMetadatos = async ()=>{
        if (!noControl) {
          console.error("noControl no está definido");
          return;
        } // Asegurarse de que noControl esté definido

        try {
          const res = await fetch(`/api/documentos/${noControl}/metadata`);
          
          if (!res.ok) {
            throw new Error("Error al obtener los metadatos del documento");
          }
          const data = await res.json();

          setNombreAlumno(data.nombreAlumno);

          setCarrera(data.Carrera );
          console.log("HOLA SOY", data.nombreAlumno, "Y MI CARRERA ES", data.Carrera);


          console.log("Metadatos obtenidos:", data);
        } catch (error) {
          console.error("Error al conectar con el servidor:", error);
        }
      }

    obtenerMetadatos();
      }, [noControl]);




    //Subir doc a la base de datos /documentos pa Anexo 2
    const handleUploadA2 = async (e)=>{
      e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

       if (!file || !noControl || !nombreAlumno || !carrera) {
    alert("Faltan datos necesarios para subir el Anexo 2");
    console.error("Datos incompletos para subir el Anexo 2:", {
      file,
      noControl,
      nombreAlumno,
      Carrera: carrera
    });
    return;
  }

  try {
    const formData = new FormData();
    formData.append("idDoc", noControl); 
    formData.append("nombreAlumno", nombreAlumno);
    formData.append("documentoAdjunto", file); 
    formData.append("anexo", "Anexo2");
    formData.append("Carrera", carrera);
    formData.append("Ultimo_cambio", new Date().toISOString().split("T")[0]); // formato: yyyy-mm-dd

    if (!file) {
                alert('Por favor, selecciona un documento para subir.');
                return;
            }

    const res = await fetch("/api/documentos", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error al subir el Anexo 2: " + data.error );
    } else {
      alert("¡Anexo 2 subido exitosamente!");
    }
  } catch (error) {
    console.error("Error inesperado al subir el documento:", error);
    alert("Ocurrió un error al subir el Anexo 2.");
  }
      
    }

    //Subir doc a la base de datos /documentos
    const handleUploadA3 = async (e)=>{
      e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

       if (!noControl || !nombreAlumno || !carrera || !nombreProyecto || !asesor) {
          alert("Faltan datos necesarios para subir el Anexo 3");
      }
      
      try {
        const formData = new FormData();
        formData.append("idDoc", noControl);
        formData.append("nombreAlumno", nombreAlumno);
        formData.append("nombreProyecto", nombreProyecto);
        formData.append("nombreAsesor", asesor);
        formData.append("anexo", "Anexo3");
        formData.append("Carrera", carrera);
        formData.append("Ultimo_cambio", new Date().toISOString().split("T")[0]); // formato: yyyy-mm-dd

      const res = await fetch("/api/anexo3", {
      method: "POST",
      body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert("Anexo 3 subido correctamente");
        console.log("Respuesta del servidor:", data);
      } else {
        alert(`Error: ${data.error || "No se pudo subir el Anexo 3"}`);
      }
    } catch (error) {
      console.error("Error al subir Anexo 3:", error);
      alert("Ocurrió un error al subir el Anexo 3");
    }
    }
    


   console.log("noControl:", noControl);
    return (
      <div className="flex flex-col h-screen bg-white">
  
        {/* Contenido principal */}
        <div className="flex flex-1 ">
          {/* Barra lateral */}
          <aside className="w-1/4 bg-red-600 text-white p-4 flex flex-col justify-around">

            {/* Botones de anexos */}
            {[1,2,3,4,5].map((num) => (
              <button 
                key={num} 
                className="py-8 bg-white text-red-600 font-semibold rounded hover:bg-gray-200 mb-2"
                onClick={() => setSelectedAnexo(num)}
              >
                Anexo {num}
              </button>

            ))}
          </aside>
  
          {/* Área de contenido  dependiendo del anexo*/}
          <section className="flex-1 border bg-gray-100 p-4">

            { isClient && selectedAnexo === 1 && noControl &&(
              <><WordViewer docId={noControl}></WordViewer></>
            )}
            {isClient && selectedAnexo === 2 && noControl &&(
              <> <h1>Anexo2</h1>
                <form onSubmit={handleUploadA2}>
                  <input type='file' 
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf,.doc,.docx,.txt"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
                            file:text-sm file:font-semibold  file:bg-blue-500 file:text-white  hover:file:bg-blue-600 cursor-pointer
                  "/>
                  <button type='submit'
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >Subir Anexo 2</button>
                </form>
                

              </>
            )}
            {isClient && selectedAnexo === 3 && noControl &&(
              <>
              <h1 className='text-blue-500 font-bold text-center text-3xl pb-4'>Anexo3</h1>
              <label className='text-gray-600 text-center text-xl '>Cheque y rellene los datos</label>
              <form className='flex flex-col gap-4' onSubmit={handleUploadA3}>

                  <label className='text-blue-950 font-bold' >No.Control:</label>
                  <input type="text" id="idDoc" defaultValue={noControl}   required/>

                  <label className='text-blue-950 font-bold'>Nombre del Egresado:</label>
                  <input type="text" id="nombreAlumno" value={nombreAlumno} 
                  onChange={(e)=> setNombreAlumno(e.target.value)} required/>

                  <label className='text-blue-950 font-bold'>Nombre del Proyecto:</label>
                  <input type="text" id="nombreProyecto" name="nombreProyecto" 
                  onChange={(e)=> setNombreProyecto(e.target.value)} required/>
                  
                  <label className='text-blue-950 font-bold'>Carrera:</label>
                  <input type="text" id="Carrera" value={carrera} 
                  onChange={(e) => setCarrera(e.target.value)} required/>

                  <label className='text-blue-950 font-bold'>Nombre del Asesor:</label>
                  <input type="text" id="nombreAsesor" value={asesor} 
                  onChange={(e)=> setAsesor(e.target.value)} required/>

                 

                  <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">Enviar</button>
                </form>
              </>
            )}
            {isClient && selectedAnexo === 4 &&  noControl &&(
              <><h1>Anexo4</h1>
              <input type='file' 
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-500 file:text-white
                        hover:file:bg-blue-600
                        cursor-pointer
            "/>
              </>
              
            )}
            { isClient && selectedAnexo === 5 && noControl &&(
              <><h1>Anexo5</h1></>
            )}      
          </section>
        </div>

      </div>
    );
  }
  
  