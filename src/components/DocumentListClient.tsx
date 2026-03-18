"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FileText, ArrowRight, Clock, Eye, X } from "lucide-react";
import type { PreviewDocumentType } from "@/components/PreviewPDFViewerInner";

const PreviewPDFViewerInner = dynamic(
  () => import("@/components/PreviewPDFViewerInner"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Se generează previzualizarea...</p>
      </div>
    ),
  }
);

const TITLURI: Record<PreviewDocumentType, string> = {
  "contract-vanzare-cumparare": "Contract de Vânzare-Cumpărare",
  "imputernicire": "Împuternicire / Procură",
  "acord-confidentialitate": "Acord de Confidențialitate (NDA)",
  "contract-inchiriere": "Contract de Închiriere",
};

const documente = [
  {
    slug: "contract-vanzare-cumparare" as PreviewDocumentType,
    titlu: "Contract de Vânzare-Cumpărare",
    descriere: "Pentru vânzarea oricărui bun mobil: mașini, electronice, bunuri personale.",
    pret: "10 lei",
    disponibil: true,
  },
  {
    slug: "imputernicire" as PreviewDocumentType,
    titlu: "Împuternicire / Procură",
    descriere: "Delegarea dreptului de a acționa în numele tău.",
    pret: "15 lei",
    disponibil: true,
  },
  {
    slug: "acord-confidentialitate" as PreviewDocumentType,
    titlu: "Acord de Confidențialitate (NDA)",
    descriere: "Protejarea informațiilor confidențiale între două părți.",
    pret: "20 lei",
    disponibil: true,
  },
  {
    slug: "contract-inchiriere" as PreviewDocumentType,
    titlu: "Contract de Închiriere",
    descriere: "Contract de închiriere pentru spații locative sau comerciale.",
    pret: "25 lei",
    disponibil: true,
  },
];

export default function DocumentListClient() {
  const [preview, setPreview] = useState<PreviewDocumentType | null>(null);

  return (
    <>
      <div className="space-y-3">
        {documente.map((doc) =>
          doc.disponibil ? (
            <div key={doc.slug} className="relative group/card">
              <Link
                href={`/documente/${doc.slug}`}
                className="flex items-center justify-between bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all pr-16"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{doc.titlu}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{doc.descriere}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="font-bold text-gray-900">{doc.pret}</span>
                  <ArrowRight className="w-4 h-4 text-blue-400 group-hover/card:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Buton previzualizare */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPreview(doc.slug);
                }}
                className="absolute right-[52px] top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                title="Vezi model document"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              key={doc.slug}
              className="flex items-center justify-between bg-white rounded-2xl border border-dashed border-gray-200 p-5 opacity-50"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{doc.titlu}</p>
                  <p className="text-sm text-gray-400 mt-0.5">{doc.descriere}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <Clock className="w-4 h-4 text-gray-300" />
                <span className="text-sm text-gray-400">În curând</span>
              </div>
            </div>
          )
        )}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-3xl flex flex-col shadow-2xl"
            style={{ height: "88vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header modal */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">Model document</p>
                <h2 className="font-bold text-gray-900 text-sm">{TITLURI[preview]}</h2>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden rounded-b-none">
              <PreviewPDFViewerInner documentType={preview} />
            </div>

            {/* Footer modal */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between shrink-0">
              <p className="text-xs text-gray-400">Document generat cu date de exemplu</p>
              <Link
                href={`/documente/${preview}`}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                onClick={() => setPreview(null)}
              >
                Generează documentul →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
