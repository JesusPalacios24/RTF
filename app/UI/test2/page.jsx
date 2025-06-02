'use client';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export default function VisualizadorDoc({ idDoc }) {
  const docs = [
    {
      uri: `http://localhost:3000/api/documentos/21550761`,
      fileType: "docx", // opcional, react-doc-viewer lo detecta
      fileName: `21550761.docx`, // opcional, para mostrar en el visor
    },
  ];

  return (
    <div className="w-full h-[80vh]">
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
    </div>
  );
}