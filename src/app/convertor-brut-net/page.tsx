import type { Metadata } from "next";
import SalaryCalculator from "@/components/SalaryCalculator";

export const metadata: Metadata = {
  title: "Calculator Salariu Brut-Net România 2025 — Gratuit",
  description:
    "Calculează instant salariul net din brut în România 2025. Include CAS 25%, CASS 10%, impozit venit 10% și costul total al angajatorului.",
  keywords:
    "calculator salariu brut net romania 2025, convertor brut net, salariu net din brut, cas cass impozit",
  openGraph: {
    title: "Calculator Salariu Brut-Net România 2025",
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
          ← FaraNotar.ro
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
          Calculator Salariu Brut → Net
        </h1>
        <p className="text-gray-500">
          România 2025 · CAS 25% · CASS 10% · Impozit venit 10%
        </p>
      </div>

      {/* Calculator */}
      <SalaryCalculator />

      {/* SEO content */}
      <div className="max-w-2xl mx-auto mt-12 prose prose-gray">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Cum se calculează salariul net în România 2025?
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3 text-sm text-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-gray-800">1. CAS (Pensie)</p>
              <p>25% din salariul brut</p>
              <p className="text-xs text-gray-400">Contribuția la pilonul 1 de pensie</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-gray-800">2. CASS (Sănătate)</p>
              <p>10% din salariul brut</p>
              <p className="text-xs text-gray-400">Contribuția la sănătate</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-gray-800">3. Impozit venit</p>
              <p>10% din (brut - CAS - CASS)</p>
              <p className="text-xs text-gray-400">Impozit pe venitul din salarii</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-gray-800">4. CAM (Angajator)</p>
              <p>2.25% din brut</p>
              <p className="text-xs text-gray-400">Asigurare accidente muncă</p>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <p className="font-semibold text-gray-800">Formulă finală:</p>
            <code className="text-blue-600 font-mono text-xs bg-blue-50 px-2 py-1 rounded">
              Net = Brut − CAS − CASS − Impozit venit
            </code>
          </div>
        </div>
      </div>
    </main>
  );
}
