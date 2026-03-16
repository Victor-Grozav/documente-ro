import Link from "next/link";
import { Calculator, FileText, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Documente.ro</h1>
        <p className="text-gray-500 text-lg mb-12">
          Calculatoare si documente legale pentru Romania
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Convertor */}
          <Link
            href="/convertor-brut-net"
            className="group bg-white rounded-2xl border border-gray-200 p-6 text-left hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Calculator className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Calculator Brut → Net</h2>
            <p className="text-sm text-gray-500 mb-4">
              Calculeaza salariul net, retinerile si costul angajatorului pentru 2025.
            </p>
            <span className="text-blue-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Calculeaza gratuit <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Documente — coming soon */}
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 text-left opacity-60">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <h2 className="font-bold text-gray-900 mb-1">Generator Contracte</h2>
            <p className="text-sm text-gray-500 mb-4">
              Contracte de vanzare-cumparare, inchiriere, procuri si altele.
            </p>
            <span className="text-gray-400 text-sm font-medium">In curand</span>
          </div>
        </div>
      </div>
    </main>
  );
}
