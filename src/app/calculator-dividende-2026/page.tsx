import type { Metadata } from "next";
import Link from "next/link";
import CalculatorDividende from "@/components/CalculatorDividende";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Calculator Impozit Dividende 2026 România — Gratuit",
  description:
    "Calculează impozitul pe dividende 2026 în România: 8% impozit + CASS 10% (dacă aplicabil). Află cât primești net din dividendele distribuite.",
  keywords:
    "calculator dividende 2026, impozit dividende romania, cass dividende, dividende nete, impozit 8% dividende",
  alternates: { canonical: "/calculator-dividende-2026" },
  openGraph: {
    title: "Calculator Impozit Dividende 2026 România",
    description:
      "Calculează impozitul pe dividende 2026: 8% impozit + CASS 10%. Află exact cât primești net.",
    url: "/calculator-dividende-2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Impozit Dividende 2026 România",
    description:
      "Calculează impozitul pe dividende 2026: 8% impozit + CASS 10%. Gratuit și instant.",
  },
};

export default function CalculatorDividendePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Cât este impozitul pe dividende în 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Impozitul pe dividende în România 2026 este de 8% din valoarea brută a dividendelor distribuite, reținut la sursă de societate.",
              },
            },
            {
              "@type": "Question",
              "name": "Se plătește CASS pe dividende în 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "CASS de 10% se datorează pe dividende dacă valoarea anuală depășește 24.300 RON (6 salarii minime). Contribuția este plafonată la maximum 24.300 RON/an (60 salarii minime). Dacă ești deja asigurat prin salariu, nu mai datorezi CASS separat.",
              },
            },
            {
              "@type": "Question",
              "name": "Se plătește CAS (pensie) pe dividende?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nu. Dividendele nu sunt supuse CAS (contribuției la pensie), spre deosebire de salarii. Acesta este unul dintre avantajele distribuirii de dividende față de salariu.",
              },
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Calculator Dividende 2026" },
          ],
        },
      ]} />

      <div className="max-w-2xl mx-auto lg:max-w-4xl text-center mb-8">
        <Link href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Calculator Impozit Dividende 2026
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          România 2026 · Impozit 8% · CASS 10% (dacă aplicabil) · Fără CAS
        </p>
      </div>

      {/* Info box */}
      <div className="max-w-2xl mx-auto lg:max-w-4xl mb-8">
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-2xl px-6 py-5">
          <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">Cum funcționează calculatorul?</span>{" "}
            Introdu suma brută a dividendelor distribuite. Calculatorul aplică
            <strong> impozitul de 8%</strong> reținut la sursă de societate și verifică dacă
            se datorează <strong>CASS 10%</strong> — contribuția la sănătate se plătește
            doar dacă dividendele depășesc 6 salarii minime brute anual (~24.300 RON în 2026)
            și ești neasigurat prin alt venit. Nu se datorează CAS (pensie) pe dividende.
            Rezultatul arată suma netă primită efectiv și totalul contribuțiilor.
          </p>
        </div>
      </div>

      <CalculatorDividende />
    </main>
  );
}
