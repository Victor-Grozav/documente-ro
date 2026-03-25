import type { Metadata } from "next";
import AcordConfidentialitateForm from "@/components/AcordConfidentialitateForm";
import DocumentDisclaimer from "@/components/DocumentDisclaimer";

export const metadata: Metadata = {
  title: "Acord de Confidențialitate (NDA) România 2026 — PDF instant",
  description:
    "Generează un acord de confidențialitate (NDA) conform legislației române. Completează formularul, plătește 20 lei și descarcă PDF-ul instant.",
  keywords:
    "acord confidentialitate romania, NDA romania, generator NDA pdf, model acord confidentialitate",
  alternates: { canonical: "/documente/acord-confidentialitate" },
  openGraph: {
    title: "Acord de Confidențialitate (NDA) România 2026 — PDF instant",
    description:
      "Generează un NDA conform legislației române. PDF instant, fără notar, 20 lei.",
    url: "/documente/acord-confidentialitate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acord de Confidențialitate (NDA) România 2026 — PDF instant",
    description:
      "Generează un NDA conform legislației române. PDF instant, fără notar, 20 lei.",
  },
};

export default function AcordConfidentialytatePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </a>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Acord de Confidențialitate (NDA)
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            Completează datele de mai jos · PDF gata de semnat · 20 lei
          </p>
        </div>

        <div className="mb-6">
          <DocumentDisclaimer
            valid="Acordul de confidențialitate (NDA) este valabil sub semnătură privată, indiferent de subiect sau valoare. Nu necesită autentificare notarială."
          />
        </div>

        <AcordConfidentialitateForm />
      </div>
    </main>
  );
}
