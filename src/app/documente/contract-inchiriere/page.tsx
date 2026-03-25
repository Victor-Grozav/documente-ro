import type { Metadata } from "next";
import ContractInchiriereForm from "@/components/ContractInchiriereForm";
import DocumentDisclaimer from "@/components/DocumentDisclaimer";

export const metadata: Metadata = {
  title: "Contract de Închiriere România 2026 — PDF instant",
  description:
    "Generează un contract de închiriere conform legislației române. Completează formularul, plătești 25 lei și descarcă PDF-ul instant.",
  keywords:
    "contract inchiriere romania, model contract chirie, generator contract inchiriere pdf",
  alternates: { canonical: "/documente/contract-inchiriere" },
  openGraph: {
    title: "Contract de Închiriere România 2026 — PDF instant",
    description:
      "Generează un contract de închiriere conform legislației române. PDF instant, fără notar, 25 lei.",
    url: "/documente/contract-inchiriere",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contract de Închiriere România 2026 — PDF instant",
    description:
      "Generează un contract de închiriere conform legislației române. PDF instant, fără notar, 25 lei.",
  },
};

export default function ContractInchirierePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </a>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Contract de Închiriere
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            Completează datele de mai jos · PDF gata de semnat · 25 lei
          </p>
        </div>

        <div className="mb-6">
          <DocumentDisclaimer
            valid="Contractul de închiriere este valabil sub semnătură privată conform art. 1777-1850 Cod Civil, indiferent de durată sau valoarea chiriei. Nu necesită autentificare notarială."
            atentie="Înregistrarea la ANAF este obligatorie dacă realizezi venituri din chirii. Poți înregistra contractul online pe portalul ANAF în termen de 30 de zile de la semnare."
          />
        </div>

        <ContractInchiriereForm />
      </div>
    </main>
  );
}
