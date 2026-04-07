import { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://faranotar.ro";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/documente`, lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/documente/contract-vanzare-cumparare`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/documente/contract-inchiriere`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/documente/acord-confidentialitate`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/documente/imputernicire`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/documente/proces-verbal-predare`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/documente/contract-prestari-servicii`, lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/documente/cerere-concediu`, lastModified: new Date("2026-04-07"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/documente/cerere-demisie`, lastModified: new Date("2026-04-07"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/documente/adeverinta-salariat`, lastModified: new Date("2026-04-07"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/convertor-brut-net`, lastModified: new Date("2026-01-01"), changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/calculator-dividende-2026`, lastModified: new Date("2026-04-06"), changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/calculator-impozit-chirii`, lastModified: new Date("2026-04-06"), changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/calculator-cost-angajator`, lastModified: new Date("2026-04-06"), changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/calculator-dobanda-penalizatoare`, lastModified: new Date("2026-04-06"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/impozit-masina`, lastModified: new Date("2026-01-01"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/indemnizatie-somaj`, lastModified: new Date("2026-03-01"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/concediu-medical`, lastModified: new Date("2026-03-01"), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/termeni`, lastModified: new Date("2026-03-01"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/confidentialitate`, lastModified: new Date("2026-03-01"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
