import type { Metadata } from "next";
import Link from "next/link";
import AdeverintaSalariatForm from "@/components/AdeverintaSalariatForm";
import JsonLd from "@/components/JsonLd";
import SplitPageLayout from "@/components/SplitPageLayout";

export const metadata: Metadata = {
  title: "Adeverință de Salariat Model 2026 — PDF instant | FaraNotar.ro",
  description:
    "Generează o adeverință de salariat pentru bancă, viză sau chirie. Include funcția, data angajării și opțional salariul. PDF instant, 10 lei.",
  keywords:
    "adeverinta salariat model, adeverinta de angajat, adeverinta pentru banca, adeverinta venit 2026",
  alternates: { canonical: "/documente/adeverinta-salariat" },
  openGraph: {
    title: "Adeverință de Salariat — PDF instant 2026",
    description: "Model adeverință salariat pentru bancă, viză sau chirie. PDF instant, 10 lei.",
    url: "/documente/adeverinta-salariat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adeverință de Salariat — PDF instant 2026",
    description: "Model adeverință salariat pentru bancă, viză sau chirie. PDF instant, 10 lei.",
  },
};

export default function AdeverintaSalariatPage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Adeverință de Salariat — PDF instant",
          "description": "Model adeverință de salariat 2026 pentru bancă, viză sau chirie. PDF gata de semnat și ștampilat, 10 lei.",
          "url": "https://faranotar.ro/documente/adeverinta-salariat",
          "brand": { "@type": "Brand", "name": "FaraNotar.ro" },
          "offers": {
            "@type": "Offer",
            "price": "10.00",
            "priceCurrency": "RON",
            "availability": "https://schema.org/InStock",
            "url": "https://faranotar.ro/documente/adeverinta-salariat",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://faranotar.ro" },
            { "@type": "ListItem", "position": 2, "name": "Documente", "item": "https://faranotar.ro/documente" },
            { "@type": "ListItem", "position": 3, "name": "Adeverință de Salariat" },
          ],
        },
      ]} />
      <SplitPageLayout documentType="adeverinta-salariat">
        <div className="text-center mb-8">
          <Link href="/documente" className="text-blue-600 text-sm font-medium hover:underline">
            ← Documente
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Adeverință de Salariat
          </h1>
          <p className="text-gray-500 dark:text-slate-400">
            Pentru bancă, viză, chirie · PDF instant · 10 lei
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-2xl px-6 py-5 mb-6">
          <p className="text-sm text-blue-900 dark:text-blue-300 leading-relaxed">
            <span className="font-semibold">De ce ai nevoie de acest document?</span>{" "}
            Adeverința de salariat confirmă statutul de angajat al unei persoane și este solicitată
            frecvent de bănci (pentru credite), ambasade (pentru vize), proprietari (pentru chirii)
            sau alte instituții. PDF-ul include antet cu datele firmei, funcția, data angajării,
            opțional salariul, și spațiu pentru semnătură și ștampilă.
          </p>
        </div>

        <AdeverintaSalariatForm />
      </SplitPageLayout>
    </main>
  );
}
