import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRODUSE: Record<string, { name: string; price: number }> = {
  "contract-vanzare-cumparare": {
    name: "Contract de Vanzare-Cumparare",
    price: 100, // $1.00 in cents
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
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
