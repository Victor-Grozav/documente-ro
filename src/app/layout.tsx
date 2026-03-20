import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FaraNotar.ro — Contracte & Calculatoare pentru România",
  description:
    "Generează contracte și documente legale fără notar. Calculatoare de salariu, pensie, șomaj și altele. Rapid, corect, 100% legal.",
  keywords:
    "fara notar, contracte online, documente legale romania, calculator salariu brut net, calculator pensie, contract vanzare cumparare",
  openGraph: {
    title: "FaraNotar.ro — Contracte & Calculatoare pentru România",
    description:
      "Documente legale și calculatoare financiare pentru români. Fără notar, fără birou, fără așteptare.",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${geist.variable} antialiased bg-gray-50 text-gray-900`}>
        {children}
        <footer className="text-center py-6 px-4 border-t border-gray-100 mt-4">
          <p className="text-xs text-gray-400">
            FaraNotar.ro oferă modele de documente precompletate, nu consultanță juridică. Nu răspundem pentru
            modul de completare, corectitudinea datelor sau capacitatea juridică a semnatarilor.{" "}
            <a href="/termeni" className="underline hover:text-gray-600">Termeni și Condiții</a>
            {" "}·{" "}
            <a href="/confidentialitate" className="underline hover:text-gray-600">Confidențialitate</a>
          </p>
        </footer>
        <CookieBanner />
      </body>
    </html>
  );
}
