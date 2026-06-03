import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductById } from "@/data/products";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "No hay productos en el carrito" },
        { status: 400 }
      );
    }

    const products = items
      .map((id) => getProductById(id))
      .filter(Boolean);

    if (products.length === 0) {
      return NextResponse.json(
        { error: "Productos no encontrados" },
        { status: 404 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: products.map((product) => ({
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: product!.name,
            description: product!.title,
          },
          unit_amount: product!.price * 100,
        },
      })),

      metadata: {
        productIds: products.map((product) => product!.id).join(","),
      },

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}&products=${products
        .map((product) => product!.id)
        .join(",")}`,

      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error creando checkout" },
      { status: 500 }
    );
  }
}