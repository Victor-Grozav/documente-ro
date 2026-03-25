import type { Metadata } from "next";
import SalaryCalculator from "@/components/SalaryCalculator";

export const metadata: Metadata = {
  title: "Calculator Salariu Brut-Net România 2026 — Gratuit",
  description:
    "Calculează instant salariul net din brut în România 2026. Include CAS 25%, CASS 10%, impozit venit 10% și costul total al angajatorului.",
  keywords:
    "calculator salariu brut net romania 2026, convertor brut net, salariu net din brut, cas cass impozit",
  alternates: { canonical: "/convertor-brut-net" },
  openGraph: {
    title: "Calculator Salariu Brut-Net România 2026",
    description:
      "Calculează instant salariul net din brut. CAS, CASS, impozit venit — tot ce trebuie să știi.",
    url: "/convertor-brut-net",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Salariu Brut-Net România 2026",
    description:
      "Calculează instant salariul net din brut. CAS, CASS, impozit venit — tot ce trebuie să știi.",
  },
};

export default function ConvertorPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <a href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </a>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Calculator Salariu Brut → Net
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          România 2026 · CAS 25% · CASS 10% · Impozit venit 10%
        </p>
      </div>

      {/* Calculator */}
      <SalaryCalculator />

      {/* SEO content */}
      <div className="max-w-2xl mx-auto mt-12 prose prose-gray">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Cum se calculează salariul net în România 2026?
        </h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 space-y-3 text-sm text-gray-600 dark:text-slate-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">1. CAS (Pensie)</p>
              <p>25% din salariul brut</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Contribuția la pilonul 1 de pensie</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">2. CASS (Sănătate)</p>
              <p>10% din salariul brut</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Contribuția la sănătate</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">3. Impozit venit</p>
              <p>10% din (brut - CAS - CASS)</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Impozit pe venitul din salarii</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">4. CAM (Angajator)</p>
              <p>2.25% din brut</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">Asigurare accidente muncă</p>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100 dark:border-slate-700">
            <p className="font-semibold text-gray-800 dark:text-slate-100">Formulă finală:</p>
            <code className="text-blue-600 dark:text-blue-400 font-mono text-xs bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded">
              Net = Brut − CAS − CASS − Impozit venit
            </code>
          </div>
        </div>
      </div>
    </main>
  );
}
