import type { Metadata } from "next";
import DocumentListClient from "@/components/DocumentListClient";

export const metadata: Metadata = {
  title: "Generator Documente Legale România — FaraNotar.ro",
  description:
    "Generează contracte și documente legale pentru România. Contract de vânzare-cumpărare, închiriere, procuri și altele. PDF instant, de la 10 lei/document.",
  alternates: { canonical: "/documente" },
  openGraph: {
    title: "Generator Documente Legale România — FaraNotar.ro",
    description:
      "Generează contracte și documente legale pentru România. Contract de vânzare-cumpărare, închiriere, procuri și altele. PDF instant, de la 10 lei/document.",
    url: "/documente",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generator Documente Legale România — FaraNotar.ro",
    description:
      "Generează contracte și documente legale pentru România. Contract de vânzare-cumpărare, închiriere, procuri și altele. PDF instant, de la 10 lei/document.",
  },
};

export default function DocumentePage() {
  return (
    <main className="min-h-screen py-10 px-4">

      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <a href="/" className="text-blue-600 text-sm font-medium hover:underline">
            ← Acasă
          </a>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Generator Documente
          </h1>
          <p className="text-gray-500 dark:text-slate-400 mb-6">
            Documente legale românești · PDF instant · de la 10 lei
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="text-green-500 font-bold">✓</span>
              Valabil fără notar pentru bunuri mobile
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-500 font-bold">✓</span>
              Conform Codului Civil 2026
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-500 font-bold">✓</span>
              PDF descărcabil instant
            </span>
          </div>
        </div>

        {/* Disclaimer banner */}
        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl px-5 py-4 mb-6 text-sm text-amber-800 dark:text-amber-300">
          <span className="text-lg shrink-0">⚠️</span>
          <p>
            <strong>Modele de documente, nu consultanță juridică.</strong>{" "}
            FaraNotar.ro nu verifică identitatea sau capacitatea juridică a semnatarilor și nu
            răspunde pentru modul de completare. Situațiile complexe necesită un avocat.{" "}
            <a href="/termeni" className="underline font-medium hover:text-amber-900">
              Termeni și Condiții
            </a>
          </p>
        </div>

        <DocumentListClient />

        {/* Footer note */}
        <p className="text-xs text-gray-400 dark:text-slate-500 text-center mt-8">
          Notarul rămâne obligatoriu pentru imobile, succesiuni și procuri autentice. ·{" "}
          <a href="/termeni" className="hover:underline">Termeni și Condiții</a>
        </p>
      </div>
    </main>
  );
}
