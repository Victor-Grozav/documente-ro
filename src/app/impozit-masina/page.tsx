import type { Metadata } from "next";
import CalculatorImpozitAuto from "@/components/CalculatorImpozitAuto";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Calculator Impozit Mașină România 2026 — Taxa Auto pe Județ",
  description:
    "Calculează impozitul anual pe mașină în România 2026, pe județ. Formula Codul Fiscal art. 470: bandă capacitate cilindrică × coeficient local. Autoturisme, motociclete, hibrid, electric.",
  keywords:
    "calculator impozit masina romania 2026, taxa auto judet, impozit auto capacitate cilindrica, impozit vehicul 2026, taxa auto bucuresti",
  alternates: { canonical: "/impozit-masina" },
  openGraph: {
    title: "Calculator Impozit Mașină România 2026",
    description:
      "Află cât plătești impozit pe mașină în funcție de județ și capacitate cilindrică. Autoturisme, motociclete, hibrid, electric.",
    url: "/impozit-masina",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Impozit Mașină România 2026",
    description:
      "Află cât plătești impozit pe mașină în funcție de județ și capacitate cilindrică. Autoturisme, motociclete, hibrid, electric.",
  },
};

export default function ImpozitMasinaPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Cum se calculează impozitul pe mașină în România 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Impozitul se calculează conform Codului Fiscal art. 470: capacitatea cilindrică se împarte în benzi, fiecare bandă are o rată per 200 cm³, multiplicată cu un coeficient local stabilit de consiliul județean. Formula: ⌈Capacitate ÷ 200⌉ × rată/200cm³ × coeficient local.",
              },
            },
            {
              "@type": "Question",
              "name": "Sunt scutite mașinile electrice de impozit în 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Da, vehiculele electrice sunt scutite integral de impozitul auto conform art. 470 alin. 4 din Codul Fiscal. Vehiculele hibrid beneficiază de o reducere de 50%.",
              },
            },
            {
              "@type": "Question",
              "name": "Când se plătește impozitul pe mașină?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Impozitul auto se plătește în două rate egale: 31 martie și 30 septembrie. Dacă plătești integral până la 31 martie, primești o bonificație de 10%.",
              },
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Calculator Impozit Mașină" },
          ],
        },
      ]} />
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <a href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </a>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Calculator Impozit Mașină
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          România 2026 · Codul Fiscal art. 470 · Per județ
        </p>
      </div>

      {/* Calculator */}
      <CalculatorImpozitAuto />

    </main>
  );
}
