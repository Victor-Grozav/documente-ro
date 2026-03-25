import type { Metadata } from "next";
import CalculatorSomaj from "@/components/CalculatorSomaj";

export const metadata: Metadata = {
  title: "Calculator Indemnizație Șomaj România 2026 — Câți Bani Primești",
  description:
    "Calculează indemnizația de șomaj în România 2026 per Legea 76/2002. Component fix 375 RON + procent din salariu în funcție de stagiu. Durată 6, 9 sau 12 luni.",
  keywords:
    "calculator indemnizatie somaj romania 2026, cat primesc somaj, legea 76 2002, indemnizatie somaj calcul, ajofm somaj",
  alternates: { canonical: "/indemnizatie-somaj" },
  openGraph: {
    title: "Calculator Indemnizație Șomaj România 2026",
    description:
      "Calculează câți bani primești pe șomaj în funcție de salariu și stagiu de cotizare. Component fix + variabilă, durată, deduceri, net în mână.",
    url: "/indemnizatie-somaj",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Indemnizație Șomaj România 2026",
    description:
      "Calculează câți bani primești pe șomaj în funcție de salariu și stagiu de cotizare. Component fix + variabilă, durată, deduceri, net în mână.",
  },
};

export default function IndemnizatieSomajPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <a href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </a>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Calculator Indemnizație Șomaj
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          România 2026 · Legea 76/2002 · Component fix + variabilă
        </p>
      </div>

      <CalculatorSomaj />

      <div className="max-w-2xl mx-auto mt-12">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Cum se calculează indemnizația de șomaj în România 2026?
        </h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 space-y-4 text-sm text-gray-600 dark:text-slate-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">1. Component fix</p>
              <p>75% × ISR = 75% × 500 RON = <strong>375 RON</strong></p>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">Același pentru toți, indiferent de salariu</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">2. Component variabilă</p>
              <p>3–20% din media salariului brut din ultimele 12 luni</p>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">Procentul crește cu stagiul de cotizare</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">3. Durată</p>
              <p>6 luni (1–5 ani stagiu) · 9 luni (5–10 ani) · 12 luni (10+ ani)</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="font-semibold text-gray-800 dark:text-slate-100">4. Deduceri</p>
              <p>CASS 10% + impozit venit 10%</p>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">CAS (pensie) nu se reține</p>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100 dark:border-slate-700">
            <p className="font-semibold text-gray-800 dark:text-slate-100">Formulă:</p>
            <code className="text-teal-600 dark:text-teal-400 font-mono text-xs bg-teal-50 dark:bg-teal-950 px-2 py-1 rounded block mt-1">
              Indemnizație brută = 375 RON + (procent% × salariu mediu brut)
            </code>
          </div>
        </div>
      </div>
    </main>
  );
}
