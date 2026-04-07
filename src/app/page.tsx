import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, FileText, ArrowRight, Stethoscope, Car, TrendingDown, PiggyBank, Home, Briefcase, Percent } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "FaraNotar.ro — Contracte & Calculatoare pentru România",
    description: "Documente legale și calculatoare financiare pentru români. Fără notar, fără birou, fără așteptare.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FaraNotar.ro — Contracte & Calculatoare pentru România",
    description: "Documente legale și calculatoare financiare pentru români. Fără notar, fără birou, fără așteptare.",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FaraNotar.ro",
          "url": "https://faranotar.ro",
          "description": "Generează contracte legale PDF instant și calculatoare financiare pentru România. Fără notar, fără cont.",
          "applicationCategory": "LegalService",
          "operatingSystem": "Web",
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "10",
            "highPrice": "25",
            "priceCurrency": "RON",
            "offerCount": "9",
          },
          "inLanguage": "ro",
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "FaraNotar.ro",
          "url": "https://faranotar.ro",
          "logo": "https://faranotar.ro/icon.svg",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "faranotar@gmail.com",
            "contactType": "customer support",
          },
        },
      ]} />
      <div className="max-w-2xl w-full text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Actualizat 2026
        </div>

        {/* Hero */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Contracte fără notar,{" "}
          <span className="text-green-600 dark:text-green-400">în 5 minute.</span>
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-lg mb-8">
          Contracte legale și calculatoare financiare pentru România —{" "}
          <span className="text-gray-700 dark:text-slate-200 font-medium">simplu, conform legii, fără deplasări.</span>
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-10">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">17</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">unelte disponibile</p>
          </div>
          <div className="w-px bg-gray-200 dark:bg-slate-700" />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">9</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">documente disponibile</p>
          </div>
          <div className="w-px bg-gray-200 dark:bg-slate-700" />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">Fără cont</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">necesar</p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2">

          {/* Featured — Generator Contracte (full width) */}
          <Link
            href="/documente"
            className="group sm:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border-2 border-green-200 dark:border-green-800 p-6 text-left hover:border-green-400 dark:hover:border-green-600 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Generator Contracte</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">
                  Contracte de vânzare-cumpărare, închiriere, prestări servicii și procuri — conforme legislației române 2026. Fără notar, fără costuri.
                </p>
                <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
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
            className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 text-left hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
          >
            <span className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-semibold px-2 py-0.5 rounded-full">
              Popular
            </span>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center mb-4">
              <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Calculator Brut → Net</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
              Salariu net, rețineri CAS/CASS, impozit și cost angajator pentru 2026.
            </p>
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Impozit Mașină */}
          <Link
            href="/impozit-masina"
            className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 text-left hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded-xl flex items-center justify-center mb-4">
              <Car className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Calculator Impozit Mașină</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
              Taxa auto pe județ în funcție de capacitate cilindrică — autoturism, hibrid, electric.
            </p>
            <span className="text-purple-600 dark:text-purple-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Șomaj — Nou */}
          <Link
            href="/indemnizatie-somaj"
            className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 text-left hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transition-all"
          >
            <span className="absolute top-4 right-4 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 text-xs font-semibold px-2 py-0.5 rounded-full">
              Nou
            </span>
            <div className="w-10 h-10 bg-teal-100 dark:bg-teal-950 rounded-xl flex items-center justify-center mb-4">
              <TrendingDown className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Calculator Indemnizație Șomaj</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
              Câți bani primești pe șomaj în funcție de salariu și stagiu de cotizare.
            </p>
            <span className="text-teal-700 dark:text-teal-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Concediu Medical */}
          <Link
            href="/concediu-medical"
            className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 text-left hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950 rounded-xl flex items-center justify-center mb-4">
              <Stethoscope className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Calculator Concediu Medical</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
              Indemnizație CNAS zilnică și totală în funcție de veniturile anterioare.
            </p>
            <span className="text-orange-700 dark:text-orange-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Dividende 2026 — Nou */}
          <Link
            href="/calculator-dividende-2026"
            className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 text-left hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all"
          >
            <span className="absolute top-4 right-4 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-full">
              Nou
            </span>
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950 rounded-xl flex items-center justify-center mb-4">
              <PiggyBank className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Calculator Dividende 2026</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
              Impozit 8% + CASS după praguri. Cât rămâne net din dividendele distribuite.
            </p>
            <span className="text-emerald-700 dark:text-emerald-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Impozit Chirii — Nou */}
          <Link
            href="/calculator-impozit-chirii"
            className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 text-left hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all"
          >
            <span className="absolute top-4 right-4 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 text-xs font-semibold px-2 py-0.5 rounded-full">
              Nou
            </span>
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-950 rounded-xl flex items-center justify-center mb-4">
              <Home className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Calculator Impozit Chirii</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
              Impozit net pe chirii 2026 — deducere 20%, CASS și obligații ANAF.
            </p>
            <span className="text-indigo-700 dark:text-indigo-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Cost Angajator — Nou */}
          <Link
            href="/calculator-cost-angajator"
            className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 text-left hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-md transition-all"
          >
            <span className="absolute top-4 right-4 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 text-xs font-semibold px-2 py-0.5 rounded-full">
              Nou
            </span>
            <div className="w-10 h-10 bg-sky-100 dark:bg-sky-950 rounded-xl flex items-center justify-center mb-4">
              <Briefcase className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Calculator Cost Angajator</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
              Cost total angajare (CAM, tichete, beneficii) vs. salariul net al angajatului.
            </p>
            <span className="text-sky-700 dark:text-sky-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Dobândă Penalizatoare — Nou */}
          <Link
            href="/calculator-dobanda-penalizatoare"
            className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 text-left hover:border-red-300 dark:hover:border-red-600 hover:shadow-md transition-all"
          >
            <span className="absolute top-4 right-4 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 text-xs font-semibold px-2 py-0.5 rounded-full">
              Nou
            </span>
            <div className="w-10 h-10 bg-red-100 dark:bg-red-950 rounded-xl flex items-center justify-center mb-4">
              <Percent className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white mb-1">Calculator Dobândă Penalizatoare</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
              Dobânda legală pentru întârzieri la plată — Legea 72/2013, BNR live.
            </p>
            <span className="text-red-700 dark:text-red-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-8 text-xs text-gray-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <span className="text-green-500 font-bold">✓</span> Conform Codului Civil 2026
          </span>
          <span className="text-gray-300 dark:text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <span className="text-green-500 font-bold">✓</span> Fără cont necesar
          </span>
          <span className="text-gray-300 dark:text-slate-600">•</span>
          <span className="flex items-center gap-1">
            <span className="text-green-500 font-bold">✓</span> Date nesalvate
          </span>
        </div>

      </div>
    </main>
  );
}
