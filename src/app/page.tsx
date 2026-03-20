import Link from "next/link";
import { Calculator, FileText, ArrowRight, Stethoscope, Car, TrendingDown } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Actualizat 2026
        </div>

        {/* Hero */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">FaraNotar.ro</h1>
        <p className="text-gray-500 text-lg mb-8">
          Contracte legale și calculatoare financiare pentru România —{" "}
          <span className="text-gray-700 font-medium">simplu, conform legii, fără notar.</span>
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-10">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">9</p>
            <p className="text-xs text-gray-400 mt-0.5">unelte gratuite</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-xs text-gray-400 mt-0.5">tipuri de contracte</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">Fără cont</p>
            <p className="text-xs text-gray-400 mt-0.5">necesar</p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2">

          {/* Featured — Generator Contracte (full width) */}
          <Link
            href="/documente"
            className="group sm:col-span-2 bg-white rounded-2xl border-2 border-green-200 p-6 text-left hover:border-green-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg mb-1">Generator Contracte</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Contracte de vânzare-cumpărare, închiriere, împrumut și procuri — conforme legislației române 2026. Fără notar, fără costuri.
                </p>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Alege tipul de contract <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            <span className="shrink-0 bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl group-hover:bg-green-700 transition-colors whitespace-nowrap">
              Generează acum →
            </span>
          </Link>

          {/* Calculator Brut-Net — Popular */}
          <Link
            href="/convertor-brut-net"
            className="group relative bg-white rounded-2xl border border-gray-200 p-6 text-left hover:border-blue-300 hover:shadow-md transition-all"
          >
            <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              Popular
            </span>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Calculator className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Calculator Brut → Net</h2>
            <p className="text-sm text-gray-500 mb-4">
              Salariu net, rețineri CAS/CASS, impozit și cost angajator pentru 2026.
            </p>
            <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Impozit Mașină */}
          <Link
            href="/impozit-masina"
            className="group relative bg-white rounded-2xl border border-gray-200 p-6 text-left hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Car className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Calculator Impozit Mașină</h2>
            <p className="text-sm text-gray-500 mb-4">
              Taxa auto pe județ în funcție de capacitate cilindrică — autoturism, hibrid, electric.
            </p>
            <span className="text-purple-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Șomaj — Nou */}
          <Link
            href="/indemnizatie-somaj"
            className="group relative bg-white rounded-2xl border border-gray-200 p-6 text-left hover:border-teal-300 hover:shadow-md transition-all"
          >
            <span className="absolute top-4 right-4 bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              Nou
            </span>
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingDown className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Calculator Indemnizație Șomaj</h2>
            <p className="text-sm text-gray-500 mb-4">
              Câți bani primești pe șomaj în funcție de salariu și stagiu de cotizare.
            </p>
            <span className="text-teal-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Concediu Medical */}
          <Link
            href="/concediu-medical"
            className="group relative bg-white rounded-2xl border border-gray-200 p-6 text-left hover:border-orange-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Stethoscope className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Calculator Concediu Medical</h2>
            <p className="text-sm text-gray-500 mb-4">
              Indemnizație CNAS zilnică și totală în funcție de veniturile anterioare.
            </p>
            <span className="text-orange-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-8 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="text-green-500 font-bold">✓</span> Conform Codului Civil 2025
          </span>
          <span className="text-gray-200">•</span>
          <span className="flex items-center gap-1">
            <span className="text-green-500 font-bold">✓</span> Fără cont necesar
          </span>
          <span className="text-gray-200">•</span>
          <span className="flex items-center gap-1">
            <span className="text-green-500 font-bold">✓</span> Date nesalvate
          </span>
        </div>

      </div>
    </main>
  );
}
