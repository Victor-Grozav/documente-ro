import type { Metadata } from "next";
import Link from "next/link";
import ContractInchiriereForm from "@/components/ContractInchiriereForm";
import DocumentDisclaimer from "@/components/DocumentDisclaimer";
import JsonLd from "@/components/JsonLd";
import SplitPageLayout from "@/components/SplitPageLayout";

export const metadata: Metadata = {
  title: "Contract de Închiriere România 2026 — PDF instant",
  description:
    "Generează un contract de închiriere conform legislației române. Completează formularul, plătești 25 lei și descarcă PDF-ul instant.",
  keywords:
    "contract inchiriere romania, model contract chirie, generator contract inchiriere pdf",
  alternates: { canonical: "/documente/contract-inchiriere" },
  openGraph: {
    title: "Contract de Închiriere România 2026 — PDF instant",
    description:
      "Generează un contract de închiriere conform legislației române. PDF instant, fără notar, 25 lei.",
    url: "/documente/contract-inchiriere",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contract de Închiriere România 2026 — PDF instant",
    description:
      "Generează un contract de închiriere conform legislației române. PDF instant, fără notar, 25 lei.",
  },
};

export default function ContractInchirierePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Contract de Închiriere — PDF instant",
          "description": "Contract de închiriere locuință conform art. 1777-1850 Cod Civil. Generat instant, valabil fără notar.",
          "url": "https://faranotar.ro/documente/contract-inchiriere",
          "brand": { "@type": "Brand", "name": "FaraNotar.ro" },
          "offers": {
            "@type": "Offer",
            "price": "25.00",
            "priceCurrency": "RON",
            "availability": "https://schema.org/InStock",
            "url": "https://faranotar.ro/documente/contract-inchiriere",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Documente", "item": "https://faranotar.ro/documente" },
            { "@type": "ListItem", "position": 3, "name": "Contract de Închiriere" },
          ],
        },
      ]} />
      <SplitPageLayout documentType="contract-inchiriere">
        <div className="text-center mb-8">
          <Link href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Contract de Închiriere
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            Completează datele de mai jos · PDF gata de semnat · 25 lei
          </p>
        </div>

        {/* Bonus PV */}
        <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl px-5 py-3.5 mb-4 text-sm">
          <span className="text-lg shrink-0">🎁</span>
          <p className="text-green-800 dark:text-green-300">
            <span className="font-semibold">Inclus gratuit:</span> Proces-Verbal de Predare-Primire precompletat cu datele din contract — primit automat după plată.
          </p>
        </div>

        <div className="mb-6">
          <DocumentDisclaimer
            valid="Contractul de închiriere este valabil sub semnătură privată conform art. 1777-1850 Cod Civil, indiferent de durată sau valoarea chiriei. Nu necesită autentificare notarială."
            atentie="Înregistrarea la ANAF este obligatorie dacă realizezi venituri din chirii. Poți înregistra contractul online pe portalul ANAF în termen de 30 de zile de la semnare."
          />
        </div>

        <ContractInchiriereForm />
      </SplitPageLayout>
    </main>
  );
}
