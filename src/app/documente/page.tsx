import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Generator Documente Legale Romania — Documente.ro",
  description:
    "Genereaza contracte si documente legale pentru Romania. Contract de vanzare-cumparare, inchiriere, procuri si altele. PDF instant, de la 10 lei/document.",
};

const documente = [
  {
    slug: "contract-vanzare-cumparare",
    titlu: "Contract de Vanzare-Cumparare",
    descriere: "Pentru vanzarea oricarui bun mobil: masini, electronice, bunuri personale.",
    pret: "10 lei",
    disponibil: true,
  },
  {
    slug: "imputernicire",
    titlu: "Imputernicire / Procura",
    descriere: "Delegarea dreptului de a actiona in numele tau.",
    pret: "15 lei",
    disponibil: true,
  },
  {
    slug: "acord-confidentialitate",
    titlu: "Acord de Confidentialitate (NDA)",
    descriere: "Protejarea informatiilor confidentiale intre doua parti.",
    pret: "20 lei",
    disponibil: true,
  },
  {
    slug: "contract-inchiriere",
    titlu: "Contract de Inchiriere",
    descriere: "Contract de inchiriere pentru spatii locative sau comerciale.",
    pret: "25 lei",
    disponibil: true,
  },
];

export default function DocumenrePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/" className="text-blue-600 text-sm font-medium hover:underline">
            ← Acasa
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Generator Documente
          </h1>
          <p className="text-gray-500">
            Documente legale romanesti · PDF instant · de la 10 lei
          </p>
        </div>

        <div className="space-y-3">
          {documente.map((doc) =>
            doc.disponibil ? (
              <Link
                key={doc.slug}
                href={`/documente/${doc.slug}`}
                className="group flex items-center justify-between bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all"
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
                  <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
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
                  <span className="text-sm text-gray-400">In curand</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
