import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Documente.ro — Contracte & Calculatoare pentru Romania",
  description:
    "Calculeaza salariul net din brut, genereaza contracte si documente legale in Romania. Rapid, gratuit si corect pentru 2025.",
  keywords:
    "convertor brut net, calculator salariu romania, contract vanzare cumparare, documente legale romania",
  openGraph: {
    title: "Documente.ro — Contracte & Calculatoare pentru Romania",
    description:
      "Calculator salariu brut-net si generator de documente legale pentru Romania.",
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
      </body>
    </html>
  );
}
