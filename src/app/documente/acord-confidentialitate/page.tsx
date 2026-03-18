import type { Metadata } from "next";
import AcordConfidentialitateForm from "@/components/AcordConfidentialitateForm";

export const metadata: Metadata = {
  title: "Acord de Confidentialitate (NDA) Romania 2025 — PDF instant",
  description:
    "Genereaza un acord de confidentialitate (NDA) conform legislatiei romane. Completeaza formularul, plateste 20 lei si descarca PDF-ul instant.",
  keywords:
    "acord confidentialitate romania, NDA romania, generator NDA pdf, model acord confidentialitate",
};

export default function AcordConfidentialytatePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Acord de Confidentialitate (NDA)
          </h1>
          <p className="text-gray-500">
            Completeaza datele de mai jos · PDF gata de semnat · 20 lei
          </p>
        </div>

        <AcordConfidentialitateForm />
      </div>
    </main>
  );
}
