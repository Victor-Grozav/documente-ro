import type { Metadata } from "next";
import CalculatorConcediuMedical from "@/components/CalculatorConcediuMedical";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Calculator Concediu Medical România 2026 — Indemnizație CNAS",
  description:
    "Calculează câți bani primești pe concediu medical în România 2026. Formula OUG 158/2005: baza de calcul, zilele plătite de angajator vs CNAS, rețineri.",
  keywords:
    "calculator concediu medical romania 2026, indemnizatie concediu medical, cnas concediu medical, oug 158 2005, cat primesc pe concediu medical",
  alternates: { canonical: "/concediu-medical" },
  openGraph: {
    title: "Calculator Concediu Medical România 2026",
    description:
      "Calculează indemnizația de concediu medical. Angajator (zilele 1–5) vs CNAS (zilele 6+), rețineri, net în mână.",
    url: "/concediu-medical",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Concediu Medical România 2026",
    description:
      "Calculează indemnizația de concediu medical. Angajator (zilele 1–5) vs CNAS (zilele 6+), rețineri, net în mână.",
  },
};

export default function ConcediuMedicalPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Cum se calculează indemnizația de concediu medical în România 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Indemnizația zilnică = (media veniturilor brute din ultimele 6 luni ÷ 30) × procentul de indemnizație (75% boală obișnuită, 85% îngrijire copil, 100% accident muncă). Primele 5 zile le plătește angajatorul, din ziua 6 plătește CNAS.",
              },
            },
            {
              "@type": "Question",
              "name": "Cine plătește concediul medical — angajatorul sau CNAS?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Angajatorul plătește zilele 1–5 de concediu medical, iar CNAS plătește din ziua 6. Excepție: pentru accidente de muncă sau boli profesionale, CNAS plătește de la prima zi.",
              },
            },
            {
              "@type": "Question",
              "name": "Ce taxe se rețin din indemnizația de concediu medical?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Din indemnizația plătită de angajator se rețin CAS 25%, CASS 10% și impozit pe venit 10%. Din indemnizația plătită de CNAS se reține doar CASS 10% — indemnizația CNAS este scutită de CAS și impozit venit.",
              },
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Calculator Concediu Medical" },
          ],
        },
      ]} />
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <a href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </a>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Calculator Concediu Medical
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          România 2026 · OUG 158/2005 · Indemnizație CNAS
        </p>
      </div>

      {/* Calculator */}
      <CalculatorConcediuMedical />

    </main>
  );
}
