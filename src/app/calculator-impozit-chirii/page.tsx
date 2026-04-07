import type { Metadata } from "next";
import Link from "next/link";
import CalculatorChirii from "@/components/CalculatorChirii";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Calculator Impozit Chirii 2026 România — Gratuit",
  description:
    "Calculează impozitul pe veniturile din chirii în România 2026. Deducere forfetară 20%, impozit 10%, CASS. Află cât rămâne net din chiria lunară.",
  keywords:
    "calculator impozit chirii 2026, impozit venituri chirii romania, deducere forfetara chirie, declaratie unica chirii, cass chirii",
  alternates: { canonical: "/calculator-impozit-chirii" },
  openGraph: {
    title: "Calculator Impozit Chirii 2026 România",
    description:
      "Calculează impozitul pe chirii 2026: deducere 20% + impozit 10% + CASS. Gratuit și instant.",
    url: "/calculator-impozit-chirii",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Impozit Chirii 2026 România",
    description:
      "Calculează impozitul pe chirii 2026: deducere 20% + impozit 10% + CASS. Gratuit și instant.",
  },
};

export default function CalculatorChiriiPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Cât este impozitul pe chirii în 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Impozitul pe veniturile din chirii în 2026 este de 10% aplicat asupra venitului net impozabil, care se calculează scăzând deducerea forfetară de 20% din venitul brut (chiria încasată).",
              },
            },
            {
              "@type": "Question",
              "name": "Ce este deducerea forfetară de 20% la chirii?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ANAF permite deducerea automată a 20% din venitul brut din chirii, reprezentând cheltuielile cu proprietatea (întreținere, reparații etc.), fără a prezenta documente justificative.",
              },
            },
            {
              "@type": "Question",
              "name": "Trebuie să plătesc CASS pe veniturile din chirii?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "CASS de 10% se datorează dacă veniturile brute din chirii depășesc 24.300 RON/an (6 salarii minime). Este plafonat la maximum 24.300 RON/an. Dacă ești asigurat prin salariu, nu mai datorezi CASS separat.",
              },
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Calculator Impozit Chirii 2026" },
          ],
        },
      ]} />

      <div className="max-w-2xl mx-auto text-center mb-8">
        <Link href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Calculator Impozit Chirii 2026
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          România 2026 · Deducere forfetară 20% · Impozit 10% · CASS dacă aplicabil
        </p>
      </div>

      {/* Info box */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-2xl px-6 py-5">
          <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">Cum funcționează calculatorul?</span>{" "}
            Introdu chiria lunară brută și numărul de luni de închiriere pe an. Din venitul brut
            se aplică o <strong>deducere forfetară de 20%</strong> (cheltuieli), iar din venitul net
            rezultat se calculează <strong>impozitul de 10%</strong>. Dacă venitul din chirii
            depășește 6 salarii minime brute anual (~24.300 RON), se datorează și
            <strong> CASS 10%</strong>. Impozitul se declară și plătește anual prin
            Declarația Unică (D212), până pe 25 mai.
          </p>
        </div>
      </div>

      <CalculatorChirii />
    </main>
  );
}
