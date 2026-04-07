import type { Metadata } from "next";
import Link from "next/link";
import SalaryCalculator from "@/components/SalaryCalculator";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Calculator Salariu Brut-Net România 2026 — Gratuit",
  description:
    "Calculează instant salariul net din brut în România 2026. Include CAS 25%, CASS 10%, impozit venit 10% și costul total al angajatorului.",
  keywords:
    "calculator salariu brut net romania 2026, convertor brut net, salariu net din brut, cas cass impozit",
  alternates: { canonical: "/convertor-brut-net" },
  openGraph: {
    title: "Calculator Salariu Brut-Net România 2026",
    description:
      "Calculează instant salariul net din brut. CAS, CASS, impozit venit — tot ce trebuie să știi.",
    url: "/convertor-brut-net",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Salariu Brut-Net România 2026",
    description:
      "Calculează instant salariul net din brut. CAS, CASS, impozit venit — tot ce trebuie să știi.",
  },
};

export default function ConvertorPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Cum se calculează salariul net din brut în România 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Din salariul brut se rețin: CAS 25% (pensie), CASS 10% (sănătate) și impozit pe venit 10% calculat din brut minus CAS minus CASS. Formula: Net = Brut − CAS − CASS − Impozit venit.",
              },
            },
            {
              "@type": "Question",
              "name": "Cât este CAS și CASS în 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "CAS (contribuția la pensie) este 25% din salariul brut. CASS (contribuția la sănătate) este 10% din salariul brut. Ambele sunt reținute din salariul angajatului.",
              },
            },
            {
              "@type": "Question",
              "name": "Cât plătește angajatorul peste salariul brut?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Angajatorul plătește CAM (contribuția asiguratorie pentru muncă) de 2,25% din salariul brut. Costul total al angajatorului este salariul brut plus 2,25%.",
              },
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Calculator Salariu Brut-Net" },
          ],
        },
      ]} />
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <Link href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Calculator Salariu Brut → Net
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          România 2026 · CAS 25% · CASS 10% · Impozit venit 10%
        </p>
      </div>

      {/* Info box */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-2xl px-6 py-5">
          <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">Cum funcționează calculatorul?</span>{" "}
            Introdu salariul brut și calculatorul determină automat reținerile conform legislației 2026:
            <strong> CAS 25%</strong> (contribuție la pensie), <strong>CASS 10%</strong> (contribuție la sănătate)
            și <strong>impozit pe venit 10%</strong> aplicat la venitul rămas. Rezultatul îți arată
            salariul net în mână și costul total suportat de angajator (brut + CAM 2,25%).
            Util la negocierea salariului sau la verificarea fluturașului de salariu.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <SalaryCalculator />

    </main>
  );
}
