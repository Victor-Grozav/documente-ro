import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeProvider from "@/components/ThemeProvider";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://faranotar.ro"),
  title: "FaraNotar.ro — Contracte & Calculatoare pentru România",
  description:
    "Generează contracte legale PDF instant — vânzare, închiriere, împrumut, procuri. Calculatoare de salariu brut-net, impozit mașină, șomaj și concediu medical. Fără notar, fără cont.",
  keywords:
    "fara notar, contracte online, documente legale romania, calculator salariu brut net, calculator pensie, contract vanzare cumparare",
  openGraph: {
    title: "FaraNotar.ro — Contracte & Calculatoare pentru România",
    description:
      "Documente legale și calculatoare financiare pentru români. Fără notar, fără birou, fără așteptare.",
    url: "https://faranotar.ro",
    siteName: "FaraNotar.ro",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FaraNotar.ro — Contracte & Calculatoare pentru România",
    description:
      "Documente legale și calculatoare financiare pentru români. Fără notar, fără birou, fără așteptare.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${geist.variable} antialiased bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100`}>
        <ThemeProvider>
          <Header />
{children}
          <footer className="text-center py-6 px-4 border-t border-gray-100 dark:border-slate-800 mt-4">
            <p className="text-xs text-gray-500 dark:text-slate-400">
              FaraNotar.ro oferă modele de documente precompletate, nu consultanță juridică. Nu răspundem pentru
              modul de completare, corectitudinea datelor sau capacitatea juridică a semnatarilor.{" "}
              <a href="/termeni" className="underline hover:text-gray-600 dark:hover:text-slate-300">Termeni și Condiții</a>
              {" "}·{" "}
              <a href="/confidentialitate" className="underline hover:text-gray-600 dark:hover:text-slate-300">Confidențialitate</a>
            </p>
          </footer>
          <CookieBanner />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
