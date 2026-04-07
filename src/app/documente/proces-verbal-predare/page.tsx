import type { Metadata } from "next";
import Link from "next/link";
import ProcesVerbalForm from "@/components/ProcesVerbalForm";
import JsonLd from "@/components/JsonLd";
import SplitPageLayout from "@/components/SplitPageLayout";

export const metadata: Metadata = {
  title: "Proces-Verbal de Predare-Primire Locuință România 2026 — PDF instant",
  description:
    "Generează un proces verbal de predare-primire pentru locuință. Stare proprietate, contoare, chei. PDF instant, 10 lei.",
  keywords:
    "proces verbal predare primire, proces verbal locuinta, model proces verbal chirie, predare cheie apartament",
  alternates: { canonical: "/documente/proces-verbal-predare" },
  openGraph: {
    title: "Proces-Verbal de Predare-Primire Locuință România 2026",
    description:
      "Documentează starea locuinței și contoarelor la predare. PDF instant, 10 lei.",
    url: "/documente/proces-verbal-predare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proces-Verbal de Predare-Primire Locuință România 2026",
    description:
      "Documentează starea locuinței și contoarelor la predare. PDF instant, 10 lei.",
  },
};

export default function ProcesVerbalPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Proces-Verbal de Predare-Primire Locuință — PDF instant",
          "description": "Documentează starea locuinței și contoarelor la predare. PDF instant, 10 lei.",
          "url": "https://faranotar.ro/documente/proces-verbal-predare",
          "brand": { "@type": "Brand", "name": "FaraNotar.ro" },
          "offers": {
            "@type": "Offer",
            "price": "10.00",
            "priceCurrency": "RON",
            "availability": "https://schema.org/InStock",
            "url": "https://faranotar.ro/documente/proces-verbal-predare",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Documente", "item": "https://faranotar.ro/documente" },
            { "@type": "ListItem", "position": 3, "name": "Proces-Verbal de Predare-Primire" },
          ],
        },
      ]} />
      <SplitPageLayout documentType="proces-verbal-predare">
        <div className="text-center mb-8">
          <Link href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Proces-Verbal de Predare-Primire
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
      </SplitPageLayout>
    </main>
  );
}
