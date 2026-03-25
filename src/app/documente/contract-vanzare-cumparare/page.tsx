import type { Metadata } from "next";
import ContractVanzareForm from "@/components/ContractVanzareForm";
import DocumentDisclaimer from "@/components/DocumentDisclaimer";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contract de Vânzare-Cumpărare România 2026 — PDF instant",
  description:
    "Generează un contract de vânzare-cumpărare conform legislației române. Completează formularul, plătește 25 lei și descarcă PDF-ul instant.",
  keywords:
    "contract vanzare cumparare romania, model contract vanzare, generator contract pdf romania",
  alternates: { canonical: "/documente/contract-vanzare-cumparare" },
  openGraph: {
    title: "Contract de Vânzare-Cumpărare România 2026 — PDF instant",
    description:
      "Generează un contract de vânzare-cumpărare conform legislației române. PDF instant, fără notar, 25 lei.",
    url: "/documente/contract-vanzare-cumparare",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contract de Vânzare-Cumpărare România 2026 — PDF instant",
    description:
      "Generează un contract de vânzare-cumpărare conform legislației române. PDF instant, fără notar, 25 lei.",
  },
};

export default function ContractVanzarePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Contract de Vânzare-Cumpărare — PDF instant",
          "description": "Contract de vânzare-cumpărare bunuri mobile conform Codului Civil român. Generat instant, valabil fără notar.",
          "url": "https://faranotar.ro/documente/contract-vanzare-cumparare",
          "brand": { "@type": "Brand", "name": "FaraNotar.ro" },
          "offers": {
            "@type": "Offer",
            "price": "25.00",
            "priceCurrency": "RON",
            "availability": "https://schema.org/InStock",
            "url": "https://faranotar.ro/documente/contract-vanzare-cumparare",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Documente", "item": "https://faranotar.ro/documente" },
            { "@type": "ListItem", "position": 3, "name": "Contract de Vânzare-Cumpărare" },
          ],
        },
      ]} />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <a href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </a>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Contract de Vânzare-Cumpărare
          </h1>
          <p className="text-gray-500">
            Completează datele de mai jos · PDF gata de semnat · 25 lei
          </p>
        </div>

        <div className="mb-6">
          <DocumentDisclaimer
            valid="Conform art. 1674 Cod Civil, transferul proprietății bunurilor mobile se realizează prin simplu acord de voință. Documentul este valabil sub semnătură privată, fără autentificare notarială."
            atentie="Notarul este obligatoriu pentru bunuri imobile (case, apartamente, terenuri). Pentru autovehicule, contractul este valabil, dar transcrierea proprietății la DRPCIV necesită prezența la Poliție."
          />
        </div>

        <ContractVanzareForm />
      </div>
    </main>
  );
}
