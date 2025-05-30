import React, { useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export default function PDFViewer({ url }) {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    let isCancelled = false;

    async function renderPDF() {
      try {
        // Cancela renderizado previo si existe
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        const loadingTask = getDocument(url);
        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        const page = await pdf.getPage(1);
        if (isCancelled) return;

        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');

        // Ajustar tamaño canvas
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Renderizar página
        renderTaskRef.current = page.render({ canvasContext: context, viewport });

        await renderTaskRef.current.promise;

        renderTaskRef.current = null;
      } catch (err) {
        if (err?.name === 'RenderingCancelledException') {
          // Se canceló el renderizado, está bien, no hacer nada
        } else {
          console.error('Error renderizando PDF:', err);
        }
      }
    }

    renderPDF();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [url]);

  return <canvas ref={canvasRef} />;
}
