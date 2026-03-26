import type { Metadata } from "next";
import Link from "next/link";
import ContractPrestariServiciiForm from "@/components/ContractPrestariServiciiForm";
import DocumentDisclaimer from "@/components/DocumentDisclaimer";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contract de Prestări Servicii România 2026 — PDF instant",
  description:
    "Generează un contract de prestări servicii conform Codului Civil român. Completează formularul, plătești 25 lei și descarcă PDF-ul instant. Valabil pentru freelanceri, PFA și firme.",
  keywords:
    "contract prestari servicii romania, model contract servicii, generator contract freelancer pdf",
  alternates: { canonical: "/documente/contract-prestari-servicii" },
  openGraph: {
    title: "Contract de Prestări Servicii România 2026 — PDF instant",
    description:
      "Generează un contract de prestări servicii conform legislației române. PDF instant, fără notar, 25 lei.",
    url: "/documente/contract-prestari-servicii",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contract de Prestări Servicii România 2026 — PDF instant",
    description:
      "Generează un contract de prestări servicii conform legislației române. PDF instant, fără notar, 25 lei.",
  },
};

export default function ContractPrestariServiciiPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Contract de Prestări Servicii — PDF instant",
          "description": "Contract de prestări servicii conform art. 1851-1881 Cod Civil. Suportă PF și PJ, clauze opționale de confidențialitate și drepturi PI. Generat instant, valabil fără notar.",
          "url": "https://faranotar.ro/documente/contract-prestari-servicii",
          "brand": { "@type": "Brand", "name": "FaraNotar.ro" },
          "offers": {
            "@type": "Offer",
            "price": "25.00",
            "priceCurrency": "RON",
            "availability": "https://schema.org/InStock",
            "url": "https://faranotar.ro/documente/contract-prestari-servicii",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Documente", "item": "https://faranotar.ro/documente" },
            { "@type": "ListItem", "position": 3, "name": "Contract de Prestări Servicii" },
          ],
        },
      ]} />
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Contract de Prestări Servicii
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            Completează datele de mai jos · PDF gata de semnat · 25 lei
          </p>
        </div>

        <div className="mb-6">
          <DocumentDisclaimer
            valid="Contractul de prestări servicii este valabil sub semnătură privată conform art. 1851-1881 Cod Civil. Nu necesită autentificare notarială."
            atentie="PFA-urile și freelancerii au nevoie de acest contract pentru evidența fiscală la ANAF. Asigură-te că emiti și factura aferentă serviciilor prestate."
          />
        </div>

        <ContractPrestariServiciiForm />
      </div>
    </main>
  );
}
