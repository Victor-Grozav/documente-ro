import type { Metadata } from "next";
import Link from "next/link";
import CalculatorDobandaPenalizatoare from "@/components/CalculatorDobandaPenalizatoare";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Calculator Dobândă Penalizatoare 2026 România — Gratuit",
  description:
    "Calculează dobânda penalizatoare pentru întârzieri la plată conform Legii 72/2013: BNR + 8% (comercial) sau BNR + 4% (civil). Află suma totală de recuperat.",
  keywords:
    "calculator dobanda penalizatoare, dobanda legala intarziere plata, legea 72/2013, dobanda bnr penalizatoare, creanta intarziata romania",
  alternates: { canonical: "/calculator-dobanda-penalizatoare" },
  openGraph: {
    title: "Calculator Dobândă Penalizatoare 2026 România",
    description:
      "Calculează dobânda pentru întârzieri la plată: BNR + 8% (B2B) sau BNR + 4% (civil). Legea 72/2013.",
    url: "/calculator-dobanda-penalizatoare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Dobândă Penalizatoare 2026 România",
    description:
      "Calculează dobânda pentru întârzieri la plată conform Legii 72/2013. Gratuit și instant.",
  },
};

export default function CalculatorDobandaPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Cum se calculează dobânda penalizatoare în România?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dobânda penalizatoare = Suma × Rata%/an / 365 × nr. zile întârziere. Rata legală conform Legii 72/2013: dobânda de referință BNR + 8 puncte procentuale pentru tranzacții comerciale (B2B), sau BNR + 4pp pentru alte creanțe.",
              },
            },
            {
              "@type": "Question",
              "name": "Ce este Legea 72/2013?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Legea 72/2013 reglementează măsurile pentru combaterea întârzierii în executarea obligațiilor de plată a unor sume de bani rezultând din contracte încheiate între profesioniști sau între profesioniști și autorități contractante.",
              },
            },
            {
              "@type": "Question",
              "name": "Pot percepe o dobândă mai mare decât cea legală?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Da. Dacă contractul prevede o rată de dobândă penalizatoare specifică, aceea se aplică în locul ratei legale. Folosiți opțiunea 'Dobândă contractuală' din calculator.",
              },
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Calculator Dobândă Penalizatoare 2026" },
          ],
        },
      ]} />

      <div className="max-w-2xl mx-auto text-center mb-8">
        <Link href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Calculator Dobândă Penalizatoare 2026
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          Legea 72/2013 · BNR + 8% comercial · BNR + 4% civil · Sau rată contractuală
        </p>
      </div>

      {/* Info box */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-2xl px-6 py-5">
          <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">Cum funcționează calculatorul?</span>{" "}
            Introdu suma datorată, data scadenței și data plății efective. Conform
            <strong> Legii 72/2013</strong>, dobânda legală penalizatoare este:
            rata BNR + 8 puncte procentuale pentru datorii comerciale (între profesioniști) și
            rata BNR + 4 puncte procentuale pentru datorii civile. Poți folosi și o rată
            contractuală proprie, dacă părțile au convenit altfel. Calculatorul arată dobânda
            totală și defalcarea pe zile de întârziere.
          </p>
        </div>
      </div>

      <CalculatorDobandaPenalizatoare />
    </main>
  );
}
