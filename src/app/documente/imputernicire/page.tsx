import type { Metadata } from "next";
import ImputernicireForm from "@/components/ImputernicireForm";
import DocumentDisclaimer from "@/components/DocumentDisclaimer";

export const metadata: Metadata = {
  title: "Împuternicire / Procură România 2026 — PDF instant",
  description:
    "Generează o împuternicire sau procură conform legislației române. Completează formularul, plătește 15 lei și descarcă PDF-ul instant.",
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
            Împuternicire / Procură
          </h1>
          <p className="text-gray-500">
            Completează datele de mai jos · PDF gata de semnat · 15 lei
          </p>
        </div>

        <div className="mb-6">
          <DocumentDisclaimer
            valid="Împuternicirea sub semnătură privată este valabilă pentru acte de administrare curentă: reprezentare la instituții publice, primire colete, depunere documente, negociere contracte etc."
            atentie="Pentru vânzarea de imobile, succesiuni, acte la notar sau orice act care prin natura sa necesită formă autentică, împuternicirea trebuie autentificată de un notar public."
          />
        </div>

        <ImputernicireForm />
      </div>
    </main>
  );
}
