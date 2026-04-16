import type { Metadata } from "next";
import Link from "next/link";
import CalculatorSomaj from "@/components/CalculatorSomaj";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Calculator Indemnizație Șomaj România 2026 — Câți Bani Primești",
  description:
    "Calculează indemnizația de șomaj în România 2026 per Legea 76/2002. Component fix 375 RON + procent din salariu în funcție de stagiu. Durată 6, 9 sau 12 luni.",
  keywords:
    "calculator indemnizatie somaj romania 2026, cat primesc somaj, legea 76 2002, indemnizatie somaj calcul, ajofm somaj",
  alternates: { canonical: "/indemnizatie-somaj" },
  openGraph: {
    title: "Calculator Indemnizație Șomaj România 2026",
    description:
      "Calculează câți bani primești pe șomaj în funcție de salariu și stagiu de cotizare. Component fix + variabilă, durată, deduceri, net în mână.",
    url: "/indemnizatie-somaj",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Indemnizație Șomaj România 2026",
    description:
      "Calculează câți bani primești pe șomaj în funcție de salariu și stagiu de cotizare. Component fix + variabilă, durată, deduceri, net în mână.",
  },
};

export default function IndemnizatieSomajPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Cum se calculează indemnizația de șomaj în România 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Indemnizația de șomaj = componentă fixă (75% × ISR = 375 RON) + componentă variabilă (3–20% din media salariului brut din ultimele 12 luni, în funcție de stagiul de cotizare). Din total se rețin CASS 10% și impozit 10%.",
              },
            },
            {
              "@type": "Question",
              "name": "Cât timp primești șomaj în România?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Durata indemnizației de șomaj depinde de stagiul de cotizare: 6 luni pentru 1–5 ani stagiu, 9 luni pentru 5–10 ani, 12 luni pentru peste 10 ani.",
              },
            },
            {
              "@type": "Question",
              "name": "Ce condiții trebuie să îndeplinești pentru a primi șomaj?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Trebuie să fii disponibilizat (nu să fi demisionat), să ai cel puțin 12 luni de stagiu de cotizare în ultimele 24 de luni, să fii înregistrat la AJOFM în termen de 60 de zile de la data încetării contractului de muncă.",
              },
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Calculator Indemnizație Șomaj" },
          ],
        },
      ]} />
      <div className="max-w-2xl mx-auto lg:max-w-4xl text-center mb-8">
        <Link href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Calculator Indemnizație Șomaj
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          România 2026 · Legea 76/2002 · Component fix + variabilă
        </p>
      </div>

      {/* Info box */}
      <div className="max-w-2xl mx-auto lg:max-w-4xl mb-8">
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-2xl px-6 py-5">
          <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">Cum funcționează calculatorul?</span>{" "}
            Introdu salariul mediu brut din ultimele 12 luni și stagiul de cotizare (anii lucrați cu contribuții la șomaj).
            Conform <strong>Legii 76/2002</strong>, indemnizația are două componente: o sumă fixă de
            <strong> 75% din salariul minim brut</strong> (375 RON în 2026) și o parte variabilă
            între 3% și 10% din media salariului brut, în funcție de stagiu.
            Indemnizația se acordă pentru maximum 6–12 luni, în funcție de stagiul de cotizare.
          </p>
        </div>
      </div>

      <CalculatorSomaj />

    </main>
  );
}
