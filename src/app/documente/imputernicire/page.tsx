import type { Metadata } from "next";
import ImputernicireForm from "@/components/ImputernicireForm";

export const metadata: Metadata = {
  title: "Imputernicire / Procura Romania 2025 — PDF instant",
  description:
    "Genereaza o imputernicire sau procura conform legislatiei romane. Completeaza formularul, plateste 15 lei si descarca PDF-ul instant.",
  keywords:
    "imputernicire romania, procura simpla, generator imputernicire pdf, model procura romania",
};

export default function ImputernicirePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Imputernicire / Procura
          </h1>
          <p className="text-gray-500">
            Completeaza datele de mai jos · PDF gata de semnat · 15 lei
          </p>
        </div>

        <ImputernicireForm />
      </div>
    </main>
  );
}
