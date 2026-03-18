import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const PRODUSE: Record<string, { name: string; price: number }> = {
  "contract-vanzare-cumparare": {
    name: "Contract de Vanzare-Cumparare",
    price: 1000, // 10 RON in bani
  },
  "imputernicire": {
    name: "Imputernicire / Procura",
    price: 1500, // 15 RON in bani
  },
  "acord-confidentialitate": {
    name: "Acord de Confidentialitate (NDA)",
    price: 2000, // 20 RON in bani
  },
  "contract-inchiriere": {
    name: "Contract de Inchiriere",
    price: 2500, // 25 RON in bani
  },
};

export async function POST(req: NextRequest) {
  try {
    const { tip } = await req.json();
    const produs = PRODUSE[tip];

    if (!produs) {
      return NextResponse.json({ error: "Produs invalid" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: produs.name,
              description: "Document PDF generat instant dupa plata",
            },
            unit_amount: produs.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/documente/${tip}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/documente/${tip}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Eroare la crearea sesiunii de plata" },
      { status: 500 }
    );
  }
}
