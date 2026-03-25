import type { Metadata } from "next";
import ProcesVerbalForm from "@/components/ProcesVerbalForm";

export const metadata: Metadata = {
  title: "Proces Verbal de Predare-Primire Locuință România 2026 — PDF instant",
  description:
    "Generează un proces verbal de predare-primire pentru locuință. Stare proprietate, contoare, chei. PDF instant, 10 lei.",
  keywords:
    "proces verbal predare primire, proces verbal locuinta, model proces verbal chirie, predare cheie apartament",
  alternates: { canonical: "/documente/proces-verbal-predare" },
  openGraph: {
    title: "Proces Verbal de Predare-Primire Locuință România 2026",
    description:
      "Documentează starea locuinței și contoarelor la predare. PDF instant, 10 lei.",
    url: "/documente/proces-verbal-predare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proces Verbal de Predare-Primire Locuință România 2026",
    description:
      "Documentează starea locuinței și contoarelor la predare. PDF instant, 10 lei.",
  },
};

export default function ProcesVerbalPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </a>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Proces Verbal de Predare-Primire
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            Document la predarea locuinței · PDF instant · 10 lei
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-2xl px-6 py-5 mb-6">
          <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
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
