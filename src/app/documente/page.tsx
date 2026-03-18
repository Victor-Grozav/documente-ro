import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Generator Documente Legale România — Documente.ro",
  description:
    "Generează contracte și documente legale pentru România. Contract de vânzare-cumpărare, închiriere, procuri și altele. PDF instant, de la 10 lei/document.",
};

const documente = [
  {
    slug: "contract-vanzare-cumparare",
    titlu: "Contract de Vânzare-Cumpărare",
    descriere: "Pentru vânzarea oricărui bun mobil: mașini, electronice, bunuri personale.",
    pret: "10 lei",
    disponibil: true,
  },
  {
    slug: "imputernicire",
    titlu: "Împuternicire / Procură",
    descriere: "Delegarea dreptului de a acționa în numele tău.",
    pret: "15 lei",
    disponibil: true,
  },
  {
    slug: "acord-confidentialitate",
    titlu: "Acord de Confidențialitate (NDA)",
    descriere: "Protejarea informațiilor confidențiale între două părți.",
    pret: "20 lei",
    disponibil: true,
  },
  {
    slug: "contract-inchiriere",
    titlu: "Contract de Închiriere",
    descriere: "Contract de închiriere pentru spații locative sau comerciale.",
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
            ← Acasă
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Generator Documente
          </h1>
          <p className="text-gray-500">
            Documente legale românești · PDF instant · de la 10 lei
          </p>
        </div>

        {/* Hook */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-5 mb-6">
          <p className="text-sm text-blue-900 leading-relaxed">
            <span className="font-semibold">Românii merg la notar din obișnuință, nu din necesitate.</span>{" "}
            Notarul e obligatoriu pentru imobile și succesiuni — pentru restul,
            legea îți permite să semnezi singur, dacă documentul e corect redactat.
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
                  <span className="text-sm text-gray-400">În curând</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
