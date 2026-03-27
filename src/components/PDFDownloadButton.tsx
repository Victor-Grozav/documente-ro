"use client";

import dynamic from "next/dynamic";
import type { DocumentProps } from "@react-pdf/renderer";
import React from "react";

const PDFDownloadButtonInner = dynamic(
  () => import("@/components/PDFDownloadButtonInner"),
  {
    ssr: false,
    loading: () => (
      <button disabled className="inline-flex items-center gap-2 bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl text-lg cursor-not-allowed">
        Se pregateste PDF-ul...
      </button>
    ),
  }
);

interface Props {
  document: React.ReactElement<DocumentProps>;
  fileName: string;
  label?: string;
}

export default function PDFDownloadButton({ document, fileName, label }: Props) {
  return <PDFDownloadButtonInner document={document} fileName={fileName} label={label} />;
}
