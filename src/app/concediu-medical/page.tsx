import type { Metadata } from "next";
import CalculatorConcediuMedical from "@/components/CalculatorConcediuMedical";

export const metadata: Metadata = {
  title: "Calculator Concediu Medical România 2026 — Indemnizație CNAS",
  description:
    "Calculează câți bani primești pe concediu medical în România 2026. Formula OUG 158/2005: baza de calcul, zilele plătite de angajator vs CNAS, rețineri.",
  keywords:
    "calculator concediu medical romania 2026, indemnizatie concediu medical, cnas concediu medical, oug 158 2005, cat primesc pe concediu medical",
  openGraph: {
    title: "Calculator Concediu Medical România 2026",
    description:
      "Calculează indemnizația de concediu medical. Angajator (zilele 1–5) vs CNAS (zilele 6+), rețineri, net în mână.",
  },
};

export default function ConcediuMedicalPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <a href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </a>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Calculator Concediu Medical
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          România 2026 · OUG 158/2005 · Indemnizație CNAS
        </p>
      </div>

      {/* Calculator */}
      <CalculatorConcediuMedical />

      {/* SEO content */}
      <div className="max-w-2xl mx-auto mt-12">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Cum se calculează indemnizația de concediu medical în România 2026?
        </h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 space-y-4 text-sm text-gray-600 dark:text-slate-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">1. Baza de calcul</p>
              <p>Media veniturilor brute din ultimele 6 luni</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Plafonată la 12 × salariul minim brut</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">2. Procentul de indemnizație</p>
              <p>75% — boală obișnuită</p>
              <p>85% — îngrijire copil bolnav</p>
              <p>100% — accident de muncă sau boli speciale</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">3. Cine plătește?</p>
              <p>Angajatorul: zilele 1–5</p>
              <p>CNAS: zilele 6 și următoarele</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Excepție: accident / boli speciale — CNAS de la ziua 1</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">4. Rețineri</p>
              <p>De la angajator: CAS 25% + CASS 10% + impozit 10%</p>
              <p>De la CNAS: doar CASS 10%</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Scutit de CAS și impozit venit conform Codului Fiscal</p>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100 dark:border-slate-700">
            <p className="font-semibold text-gray-800 dark:text-slate-100">Formulă:</p>
            <code className="text-orange-600 dark:text-orange-400 font-mono text-xs bg-orange-50 dark:bg-orange-950 px-2 py-1 rounded block mt-1">
              Indemnizație zilnică = (Medie brută / 30) × Procent (75–100%)
            </code>
          </div>
        </div>
      </div>
    </main>
  );
}
