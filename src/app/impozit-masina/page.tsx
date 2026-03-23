import type { Metadata } from "next";
import CalculatorImpozitAuto from "@/components/CalculatorImpozitAuto";

export const metadata: Metadata = {
  title: "Calculator Impozit Mașină România 2026 — Taxa Auto pe Județ",
  description:
    "Calculează impozitul anual pe mașină în România 2026, pe județ. Formula Codul Fiscal art. 470: bandă capacitate cilindrică × coeficient local. Autoturisme, motociclete, hibrid, electric.",
  keywords:
    "calculator impozit masina romania 2026, taxa auto judet, impozit auto capacitate cilindrica, impozit vehicul 2026, taxa auto bucuresti",
  openGraph: {
    title: "Calculator Impozit Mașină România 2026",
    description:
      "Află cât plătești impozit pe mașină în funcție de județ și capacitate cilindrică. Autoturisme, motociclete, hibrid, electric.",
  },
};

export default function ImpozitMasinaPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <a href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
          Calculator Impozit Mașină
        </h1>
        <p className="text-gray-500">
          România 2026 · Codul Fiscal art. 470 · Per județ
        </p>
      </div>

      {/* Calculator */}
      <CalculatorImpozitAuto />

      {/* SEO content */}
      <div className="max-w-2xl mx-auto mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Cum se calculează impozitul pe mașină în România 2026?
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 text-sm text-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-gray-800">1. Determinarea benzii</p>
              <p>Capacitatea cilindrică se încadrează într-una din cele 5 benzi (≤1.600, 1.601–2.000, 2.001–2.600, 2.601–3.000, peste 3.000 cm³)</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-gray-800">2. Formula de calcul</p>
              <p>⌈Capacitate ÷ 200⌉ × rată/200cm³ × coeficient local</p>
              <p className="text-xs text-gray-400 mt-1">Fracțiile se rotunjesc în sus</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-gray-800">3. Coeficientul local</p>
              <p>Consiliile locale pot majora cu până la 50% față de minimul Codul Fiscal</p>
              <p className="text-xs text-gray-400 mt-1">București aplică cota maximă</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-gray-800">4. Termene de plată</p>
              <p>Două rate egale: 31 martie și 30 septembrie</p>
              <p className="text-xs text-gray-400 mt-1">Plata integrală până la 31 martie → bonificație 10%</p>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100 space-y-1">
            <p className="font-semibold text-gray-800">Scutiri și reduceri:</p>
            <p>• Vehicule electrice: <span className="font-medium text-green-700">scutite integral</span> (art. 470 alin. 4)</p>
            <p>• Vehicule hibrid: <span className="font-medium text-blue-700">reducere 50%</span></p>
            <p>• Persoane cu handicap grav sau accentuat: scutite pentru un vehicul</p>
          </div>
        </div>
      </div>
    </main>
  );
}
