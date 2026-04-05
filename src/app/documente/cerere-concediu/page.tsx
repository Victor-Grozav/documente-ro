import type { Metadata } from "next";
import Link from "next/link";
import CerereConceduForm from "@/components/CerereConceduForm";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Cerere Concediu de Odihnă Model 2026 — PDF instant | FaraNotar.ro",
  description:
    "Generează o cerere de concediu de odihnă completă și corectă legal. PDF gata de semnat și depus, 10 lei. Fără cont necesar.",
  keywords:
    "cerere concediu odihna model, cerere concediu 2026, model cerere concediu word, cerere concediu angajat",
  alternates: { canonical: "/documente/cerere-concediu" },
  openGraph: {
    title: "Cerere de Concediu de Odihnă — PDF instant 2026",
    description: "Model cerere concediu de odihnă completat automat. PDF instant, 10 lei.",
    url: "/documente/cerere-concediu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cerere de Concediu de Odihnă — PDF instant 2026",
    description: "Model cerere concediu de odihnă completat automat. PDF instant, 10 lei.",
  },
};

export default function CerereConceduPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Cerere de Concediu de Odihnă — PDF instant",
          "description": "Model cerere concediu de odihnă 2026 completat automat cu datele tale. PDF gata de semnat, 10 lei.",
          "url": "https://faranotar.ro/documente/cerere-concediu",
          "brand": { "@type": "Brand", "name": "FaraNotar.ro" },
          "offers": {
            "@type": "Offer",
            "price": "8.00",
            "priceCurrency": "RON",
            "availability": "https://schema.org/InStock",
            "url": "https://faranotar.ro/documente/cerere-concediu",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Documente", "item": "https://faranotar.ro/documente" },
            { "@type": "ListItem", "position": 3, "name": "Cerere Concediu de Odihnă" },
          ],
        },
      ]} />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Cerere de Concediu de Odihnă
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            Model completat automat · PDF instant · 10 lei
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-2xl px-6 py-5 mb-6">
          <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">De ce ai nevoie de acest document?</span>{" "}
            Cererea de concediu este documentul oficial prin care soliciți angajatorului aprobarea
            zilelor de concediu. Include toate datele necesare: perioadă, număr de zile și tipul
            concediului. PDF-ul generat include și o rubrică pentru aprobarea angajatorului.
          </p>
        </div>

        <CerereConceduForm />
      </div>
    </main>
  );
}
