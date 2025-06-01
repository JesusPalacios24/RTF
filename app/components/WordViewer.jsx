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
        setHtml(result.value);
      } catch (err) {
        console.error(err);
        setError('No se pudo visualizar el documento.');
      }
    };

    fetchAndConvertDocx();
  }, [docId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div
      style={{ padding: '1rem', border: '1px solid #ccc' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
