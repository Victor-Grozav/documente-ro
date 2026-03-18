"use client";

import { PDFDownloadLink, DocumentProps } from "@react-pdf/renderer";
import React from "react";

interface Props {
  document: React.ReactElement<DocumentProps>;
  fileName: string;
  label?: string;
}

export default function PDFDownloadButtonInner({ document, fileName, label = "Descarca PDF" }: Props) {
  return (
    <PDFDownloadLink
      document={document}
      fileName={fileName}
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-md"
    >
      {({ loading }) => loading ? "Se genereaza PDF..." : label}
    </PDFDownloadLink>
  );
}
