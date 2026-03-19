import type { Metadata } from "next";
import ProcesVerbalForm from "@/components/ProcesVerbalForm";

export const metadata: Metadata = {
  title: "Proces Verbal de Predare-Primire — FaraNotar.ro",
  description:
    "Generează un proces verbal de predare-primire pentru locuință. Stare proprietate, contoare, chei. PDF instant, 10 lei.",
};

export default function ProcesVerbalPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Înapoi la documente
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
            Proces Verbal de Predare-Primire
          </h1>
          <p className="text-gray-500">
            Document la predarea locuinței · PDF instant · 10 lei
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-5 mb-6">
          <p className="text-sm text-blue-900 leading-relaxed">
            <span className="font-semibold">De ce ai nevoie de acest document?</span>{" "}
            Procesul verbal de predare-primire documentează starea locuinței și indicii
            contoarelor la momentul predării. Te protejează pe tine ca proprietar sau ca
            chiriaș în caz de litigiu privind pagubele sau datoriile la utilități.
          </p>
        </div>

        <ProcesVerbalForm />
      </div>
    </main>
  );
}
