import type { Metadata } from "next";
import Link from "next/link";
import CalculatorCostAngajator from "@/components/CalculatorCostAngajator";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Calculator Cost Angajator 2026 România — Gratuit",
  description:
    "Calculează costul total al unui angajat pentru firmă în 2026: salariu brut, CAM 2.25%, tichete de masă, telefon, mașină, asigurare medicală. Compară cu remunerația netă.",
  keywords:
    "calculator cost angajator 2026, cost total angajat firma, cam 2.25%, tichete masa 2026, beneficii extrasalariale, cost angajare romania",
  alternates: { canonical: "/calculator-cost-angajator" },
  openGraph: {
    title: "Calculator Cost Angajator 2026 România",
    description:
      "Cât costă un angajat cu adevărat? Calcul complet: brut + CAM + beneficii extrasalariale.",
    url: "/calculator-cost-angajator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Cost Angajator 2026 România",
    description:
      "Cât costă un angajat cu adevărat? Calcul complet: brut + CAM + beneficii extrasalariale.",
  },
};

export default function CalculatorCostAngajatorPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Cât plătește angajatorul peste salariul brut în 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Angajatorul plătește CAM (contribuția asiguratorie pentru muncă) de 2,25% din salariul brut. La un salariu brut de 7.000 RON, costul suplimentar este de ~158 RON/lună. La aceasta se adaugă eventualele beneficii extrasalariale.",
              },
            },
            {
              "@type": "Question",
              "name": "Sunt tichetele de masă impozabile în 2026?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Tichetele de masă sunt neimpozabile pentru angajat în limita valorii maxime legale (40 RON/zi în 2026). Reprezintă un beneficiu eficient: angajatorul deduce integral costul, iar angajatul primește valoarea completă fără impozit.",
              },
            },
            {
              "@type": "Question",
              "name": "Ce beneficii extrasalariale sunt neimpozabile?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Neimpozabile: tichete de masă (până la 40 RON/zi), telefon de serviciu (utilizare profesională), asigurare medicală privată (până la 400 EUR/an). Mașina de serviciu folosită și personal generează un avantaj în natură impozabil.",
              },
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Calculator Cost Angajator 2026" },
          ],
        },
      ]} />

      <div className="max-w-2xl mx-auto lg:max-w-4xl text-center mb-8">
        <Link href="/" className="text-blue-600 text-sm font-medium hover:underline">
          ← Acasă
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Calculator Cost Angajator 2026
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          Cost total: salariu brut + CAM 2.25% + beneficii extrasalariale
        </p>
      </div>

      {/* Info box */}
      <div className="max-w-2xl mx-auto lg:max-w-4xl mb-8">
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-2xl px-6 py-5">
          <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">Cum funcționează calculatorul?</span>{" "}
            Introdu salariul brut negociat cu angajatul. Costul real pentru angajator include
            salariul brut plus <strong>CAM 2,25%</strong> (contribuția asiguratorie pentru muncă),
            singura contribuție suportată de angajator în 2026. Dacă adaugi beneficii extrasalariale
            (tichete de masă, abonamente, alte avantaje), calculatorul le include în costul total.
            Util pentru a înțelege bugetul real al unui post sau pentru comparații între variante de remunerare.
          </p>
        </div>
      </div>

      <CalculatorCostAngajator />
    </main>
  );
}
