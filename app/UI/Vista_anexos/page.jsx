"use client";

import WordViewer from '@/app/components/WordViewer';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';


const PDFViewer = dynamic(() => import('@/app/components/PDFviewer'), { ssr: false });

 


export default function AvAlB() {

   const searchParams = useSearchParams();
   const noControl = searchParams.get('noControl');

   console.log("noControl:", noControl);
 
  


    return (
      <div className="flex flex-col h-screen bg-white">
  
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
          <section className="flex-1 border bg-gray-100 p-4">

            <WordViewer docId={noControl}></WordViewer>
      
          </section>
        </div>

      </div>
    );
  }
  
  