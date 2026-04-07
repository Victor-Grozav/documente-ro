import { NextResponse } from "next/server";

const BNR_URL = "https://www.bnr.ro/Dobanda-de-referinta-BNR-1317.aspx";

// Încearcă mai multe patternuri pentru a fi robust față de schimbări de layout BNR
function parseRataFromHTML(html: string): number | null {
  const patterns = [
    // "este de 6,50% pe an" sau "este de 6.50% pe an"
    /este\s+de\s+(\d+[,\.]\d+)\s*%/i,
    // "6,50%" în context de dobândă referință
    /dobând[aă]\s+de\s+referin[tț][aă][^<]{0,100}?(\d+[,\.]\d+)\s*%/i,
    // Orice număr urmat de "% pe an"
    /(\d+[,\.]\d+)\s*%\s*pe\s+an/i,
    // Fallback: primul procent din pagină între 1 și 30
    /\b([1-9]\d?[,\.]\d{1,2})\s*%/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      const raw = match[1].replace(",", ".");
      const value = parseFloat(raw);
      // Validare: rata BNR e realist între 1% și 30%
      if (!isNaN(value) && value >= 1 && value <= 30) {
        return value;
      }
    }
  }

  return null;
}

export async function GET() {
  // Fallback din .env.local (actualizat manual când BNR schimbă rata)
  const fallbackRate = parseFloat(process.env.DOBANDA_BNR ?? "6.5");

  try {
    // Next.js cachează acest fetch 30 de zile pe Vercel
    // Cron job-ul din vercel.json reîmprospătează cache-ul pe 1 ale lunii
    const response = await fetch(BNR_URL, {
      next: { revalidate: 60 * 60 * 24 * 30 }, // 30 zile
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; faranotar.ro/1.0)",
        "Accept-Language": "ro-RO,ro;q=0.9",
      },
    });

    if (!response.ok) {
      console.warn(`[BNR] HTTP ${response.status} — folosesc fallback ${fallbackRate}%`);
      return NextResponse.json({ rate: fallbackRate, source: "fallback" });
    }

    const html = await response.text();
    const rate = parseRataFromHTML(html);

    if (rate === null) {
      console.warn(`[BNR] Nu am găsit rata în HTML — folosesc fallback ${fallbackRate}%`);
      return NextResponse.json({ rate: fallbackRate, source: "fallback" });
    }

    console.log(`[BNR] Rata citită din site: ${rate}%`);
    return NextResponse.json({
      rate,
      source: "bnr",
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[BNR] Eroare scraping:", error);
    return NextResponse.json({ rate: fallbackRate, source: "fallback" });
  }
}
