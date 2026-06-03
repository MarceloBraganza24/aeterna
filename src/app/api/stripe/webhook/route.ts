import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { resend } from "@/lib/resend";
import { getProductById } from "@/data/products";
import { connectDB } from "@/lib/mongoose";
import Purchase from "@/models/Purchase";

const downloadLinks: Record<string, string> = {
  kit_escape: "/pdfs/kit-escape.pdf",
  admin_digital: "/pdfs/admin-digital.pdf",
  programa_hibrido: "/pdfs/programa-hibrido.pdf",
};

const downloadNames: Record<string, string> = {
  kit_escape: "Kit de Escape",
  admin_digital: "Método Admin.digital",
  programa_hibrido: "Programa Híbrido",
};

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature error:", error);

    return new Response("Webhook Error", {
      status: 400,
    });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerEmail =
        session.customer_details?.email || session.customer_email;

      const customerName = session.customer_details?.name || "";

      const productIds = session.metadata?.productIds?.split(",") || [];

      const downloadIds = productIds.flatMap((id) => {
        const product = getProductById(id);
        return product?.downloads ?? [];
      });

      const uniqueDownloadIds = Array.from(new Set(downloadIds));

      if (!customerEmail) {
        console.log("Compra sin email:", session.id);
        return Response.json({ received: true });
      }

      await connectDB();

      const existingPurchase = await Purchase.findOne({
        stripeSessionId: session.id,
      });

      if (!existingPurchase) {
        await Purchase.create({
          email: customerEmail,
          customerName,
          stripeSessionId: session.id,
          stripePaymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : undefined,
          products: productIds,
          downloads: uniqueDownloadIds,
          amountTotal: session.amount_total ? session.amount_total / 100 : 0,
          currency: session.currency || "usd",
          paymentStatus: session.payment_status,
        });
      }

      if (uniqueDownloadIds.length > 0) {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

        const linksHtml = uniqueDownloadIds
          .map((id) => {
            return `
              <li style="margin-bottom: 12px;">
                <a href="${baseUrl}${downloadLinks[id]}" style="color:#0f5132;font-weight:600;">
                  Descargar ${downloadNames[id]}
                </a>
              </li>
            `;
          })
          .join("");

        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: customerEmail,
          subject: "Tu compra en AETERNA",
          html: `
            <div style="font-family: Arial, sans-serif; background:#03170f; padding:40px;">
              <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:24px;padding:32px;">
                <p style="letter-spacing:6px;color:#0f5132;font-weight:700;">AETERNA</p>

                <h1 style="color:#111827;">Gracias por tu compra</h1>

                <p style="color:#374151;line-height:1.7;">
                  Tu pago fue confirmado correctamente. Ya podés descargar tus guías digitales.
                </p>

                <ul style="padding-left:20px;margin-top:24px;">
                  ${linksHtml}
                </ul>

                <p style="color:#6b7280;font-size:14px;margin-top:32px;">
                  Te recomendamos guardar este email para acceder nuevamente a tus guías.
                </p>

                <p style="color:#111827;margin-top:32px;">
                  Equipo AETERNA
                </p>
              </div>
            </div>
          `,
        });
      }

      console.log("Compra guardada:", session.id);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);

    return new Response("Webhook Handler Error", {
      status: 500,
    });
  }
}