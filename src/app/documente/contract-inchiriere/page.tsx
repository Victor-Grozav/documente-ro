import type { Metadata } from "next";
import ContractInchiriereForm from "@/components/ContractInchiriereForm";

export const metadata: Metadata = {
  title: "Contract de Inchiriere Romania 2025 — PDF instant",
  description:
    "Genereaza un contract de inchiriere conform legislatiei romane. Completeaza formularul, plateste 25 lei si descarca PDF-ul instant.",
  keywords:
    "contract inchiriere romania, model contract chirie, generator contract inchiriere pdf",
};

export default function ContractInchirierePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Contract de Inchiriere
          </h1>
          <p className="text-gray-500">
            Completeaza datele de mai jos · PDF gata de semnat · 25 lei
          </p>
        </div>

        <ContractInchiriereForm />
      </div>
    </main>
  );
}
