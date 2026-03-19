import type { Metadata } from "next";
import DocumentListClient from "@/components/DocumentListClient";

export const metadata: Metadata = {
  title: "Generator Documente Legale România — FaraNotar.ro",
  description:
    "Generează contracte și documente legale pentru România. Contract de vânzare-cumpărare, închiriere, procuri și altele. PDF instant, de la 10 lei/document.",
};

export default function DocumenrePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/" className="text-blue-600 text-sm font-medium hover:underline">
            ← Acasă
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Generator Documente
          </h1>
          <p className="text-gray-500">
            Documente legale românești · PDF instant · de la 10 lei
          </p>
        </div>

        {/* Hook */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-5 mb-6">
          <p className="text-sm text-blue-900 leading-relaxed">
            <span className="font-semibold">Românii merg la notar din obișnuință, nu din necesitate.</span>{" "}
            Notarul e obligatoriu pentru imobile și succesiuni — pentru restul,
            legea îți permite să semnezi singur, dacă documentul e corect redactat.
          </p>
        </div>

        <DocumentListClient />
      </div>
    </main>
  );
}
