import type { Metadata } from "next";
import ContractVanzareForm from "@/components/ContractVanzareForm";
import DocumentDisclaimer from "@/components/DocumentDisclaimer";

export const metadata: Metadata = {
  title: "Contract de Vânzare-Cumpărare România 2025 — PDF instant",
  description:
    "Generează un contract de vânzare-cumpărare conform legislației române. Completează formularul, plătește 10 lei și descarcă PDF-ul instant.",
  keywords:
    "contract vanzare cumparare romania, model contract vanzare, generator contract pdf romania",
};

export default function ContractVanzarePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Contract de Vânzare-Cumpărare
          </h1>
          <p className="text-gray-500">
            Completează datele de mai jos · PDF gata de semnat · 10 lei
          </p>
        </div>

        <div className="mb-6">
          <DocumentDisclaimer
            valid="Conform art. 1674 Cod Civil, transferul proprietății bunurilor mobile se realizează prin simplu acord de voință. Documentul este valabil sub semnătură privată, fără autentificare notarială."
            atentie="Notarul este obligatoriu pentru bunuri imobile (case, apartamente, terenuri). Pentru autovehicule, contractul este valabil, dar transcrierea proprietății la DRPCIV necesită prezența la Poliție."
          />
        </div>

        <ContractVanzareForm />
      </div>
    </main>
  );
}
