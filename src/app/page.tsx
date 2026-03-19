import Link from "next/link";
import { Calculator, FileText, ArrowRight, Stethoscope, Car, TrendingDown } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">FaraNotar.ro</h1>
        <p className="text-gray-500 text-lg mb-12">
          Contracte legale și calculatoare financiare pentru România
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Documente */}
          <Link
            href="/documente"
            className="group bg-white rounded-2xl border border-gray-200 p-6 text-left hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Generator Contracte</h2>
            <p className="text-sm text-gray-500 mb-4">
              Contracte de vânzare-cumpărare, închiriere, procuri și altele. Fără notar.
            </p>
            <span className="text-green-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Vezi documente <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Brut-Net */}
          <Link
            href="/convertor-brut-net"
            className="group bg-white rounded-2xl border border-gray-200 p-6 text-left hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Calculator className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Calculator Brut → Net</h2>
            <p className="text-sm text-gray-500 mb-4">
              Calculează salariul net, reținerile și costul angajatorului pentru 2025.
            </p>
            <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Impozit Mașină */}
          <Link
            href="/impozit-masina"
            className="group bg-white rounded-2xl border border-gray-200 p-6 text-left hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Car className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Calculator Impozit Mașină</h2>
            <p className="text-sm text-gray-500 mb-4">
              Taxa auto pe județ în funcție de capacitatea cilindrică. Autoturisme, hibrid, electric.
            </p>
            <span className="text-purple-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Șomaj */}
          <Link
            href="/indemnizatie-somaj"
            className="group bg-white rounded-2xl border border-gray-200 p-6 text-left hover:border-teal-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingDown className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Calculator Indemnizație Șomaj</h2>
            <p className="text-sm text-gray-500 mb-4">
              Calculează câți bani primești pe șomaj în funcție de salariu și stagiu de cotizare.
            </p>
            <span className="text-teal-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Calculator Concediu Medical */}
          <Link
            href="/concediu-medical"
            className="group bg-white rounded-2xl border border-gray-200 p-6 text-left hover:border-orange-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Stethoscope className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Calculator Concediu Medical</h2>
            <p className="text-sm text-gray-500 mb-4">
              Calculează indemnizația CNAS, zilele plătite de angajator și ce primești net în mână.
            </p>
            <span className="text-orange-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculează gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-10">
          Documentele pentru bunuri mobile sunt valabile sub semnătură privată, conform Codului Civil român.
          Notarul rămâne obligatoriu pentru imobile, succesiuni și procuri autentice.
        </p>
      </div>
    </main>
  );
}
