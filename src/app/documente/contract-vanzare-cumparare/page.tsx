import type { Metadata } from "next";
import ContractVanzareForm from "@/components/ContractVanzareForm";

export const metadata: Metadata = {
  title: "Contract de Vanzare-Cumparare Romania 2025 — PDF instant",
  description:
    "Genereaza un contract de vanzare-cumparare conform legislatiei romane. Completeaza formularul, plateste $1 si descarca PDF-ul instant.",
  keywords:
    "contract vanzare cumparare romania, model contract vanzare, generator contract pdf romania",
};

export default function ContractVanzarePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Contract de Vanzare-Cumparare
          </h1>
          <p className="text-gray-500">
            Completeaza datele de mai jos · PDF gata de semnat · $1
          </p>
        </div>

        <ContractVanzareForm />
      </div>
    </main>
  );
}
