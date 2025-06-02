// components/WordViewer.jsx
import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';

export default function WordViewer({ docId }) {
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!docId) return;

    const fetchAndConvertDocx = async () => {
      try {
        const response = await fetch(`/api/documentos/${docId}`);
        if (!response.ok) throw new Error('No se pudo cargar el documento');

        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });

        // Envolver en una clase para mejor control
        setHtml(`<div class="doc-content">${result.value}</div>`);
      } catch (err) {
        console.error(err);
        setError('No se pudo visualizar el documento.');
      }
    };

    fetchAndConvertDocx();
  }, [docId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <div
        className="word-viewer"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <style jsx>{`
        .word-viewer {
          padding: 2rem;
          background-color: #fdfdfd;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-family: 'Segoe UI', sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: #333;
          max-width: 850px;
          margin: auto;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .doc-content p {
          margin: 0.5rem 0;
        }

        .doc-content strong {
          font-weight: 600;
          color: #111;
        }

        .doc-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 14px;
        }

        .doc-content th,
        .doc-content td {
          border: 1px solid #999;
          padding: 6px 10px;
          text-align: left;
        }

        .doc-content th {
          background-color: #f2f2f2;
        }

        .doc-content input[type='checkbox'] {
          transform: scale(1.2);
          margin-right: 6px;
        }
      `}</style>
    </>
  );
}
