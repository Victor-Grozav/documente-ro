import type { Metadata } from "next";
import Link from "next/link";
import CerereDemisieForm from "@/components/CerereDemisieForm";
import JsonLd from "@/components/JsonLd";
import SplitPageLayout from "@/components/SplitPageLayout";

export const metadata: Metadata = {
  title: "Cerere de Demisie Model 2026 — PDF instant | FaraNotar.ro",
  description:
    "Generează o cerere de demisie conformă Codului Muncii. Include preaviz, ultima zi de muncă și rubrică de confirmare primire. PDF instant, 15 lei.",
  keywords:
    "cerere demisie model, model cerere demisie 2026, cerere demisie word, notificare demisie angajat",
  alternates: { canonical: "/documente/cerere-demisie" },
  openGraph: {
    title: "Cerere de Demisie — PDF instant 2026",
    description: "Model cerere demisie conform Codului Muncii. PDF instant, 15 lei.",
    url: "/documente/cerere-demisie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cerere de Demisie — PDF instant 2026",
    description: "Model cerere demisie conform Codului Muncii. PDF instant, 15 lei.",
  },
};

export default function CerereDemiesiePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Cerere de Demisie — PDF instant",
          "description": "Model cerere de demisie 2026 conform Codului Muncii. PDF gata de semnat și depus, 15 lei.",
          "url": "https://faranotar.ro/documente/cerere-demisie",
          "brand": { "@type": "Brand", "name": "FaraNotar.ro" },
          "offers": {
            "@type": "Offer",
            "price": "15.00",
            "priceCurrency": "RON",
            "availability": "https://schema.org/InStock",
            "url": "https://faranotar.ro/documente/cerere-demisie",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Documente", "item": "https://faranotar.ro/documente" },
            { "@type": "ListItem", "position": 3, "name": "Cerere de Demisie" },
          ],
        },
      ]} />
      <SplitPageLayout documentType="cerere-demisie">
        <div className="text-center mb-8">
          <Link href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Cerere de Demisie
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            Conform Codului Muncii · PDF instant · 15 lei
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-2xl px-6 py-5 mb-6">
          <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">De ce ai nevoie de acest document?</span>{" "}
            Cererea de demisie este notificarea oficială prin care îți anunți angajatorul că
            îți încetezi activitatea, cu respectarea perioadei de preaviz. Conform art. 81
            din Codul Muncii, demisia nu necesită acordul angajatorului, dar trebuie
            notificată în scris. PDF-ul include rubrică de confirmare a primirii.
          </p>
        </div>

        <CerereDemisieForm />
      </SplitPageLayout>
    </main>
  );
}
