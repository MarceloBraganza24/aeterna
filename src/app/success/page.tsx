import Link from "next/link";
import { getProductById } from "@/data/products";
import SuccessCleanup from "@/components/SuccessCleanup";
import PurchaseTracker from "@/components/PurchaseTracker";

const downloads: Record<string, string> = {
  kit_escape: "/pdfs/kit-escape.pdf",
  admin_digital: "/pdfs/admin-digital.pdf",
  programa_hibrido: "/pdfs/programa-hibrido.pdf",
};

const downloadNames: Record<string, string> = {
  kit_escape: "Kit de Escape",
  admin_digital: "Método Admin.digital",
  programa_hibrido: "Programa Híbrido",
};

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{
    products?: string;
    session_id?: string;
  }>;
}) {
  const { products, session_id } = await searchParams;

  const productIds = products ? products.split(",") : [];

  const downloadIds = productIds.flatMap((id) => {
    const product = getProductById(id);
    return product?.downloads ?? [];
  });

  const uniqueDownloadIds = Array.from(new Set(downloadIds));

  const purchasedProducts = productIds
    .map((id) => getProductById(id))
    .filter(Boolean);

  const total = purchasedProducts.reduce(
    (acc, product) => acc + (product?.price ?? 0),
    0
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#03170f] px-5">
      <PurchaseTracker
        productIds={productIds}
        value={total}
        transactionId={session_id ?? "manual-success"}
      />
      <SuccessCleanup />

      <div className="glass w-full max-w-xl rounded-[2rem] p-10 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
          AETERNA
        </p>

        <h1 className="mt-5 text-4xl font-semibold">Pago confirmado</h1>

        <p className="mt-4 text-white/70">
          Gracias por confiar en AETERNA. Ya podés descargar tus guías.
        </p>

        <div className="mt-8 space-y-3">
          {uniqueDownloadIds.map((id) => (
            <a
              key={id}
              href={downloads[id]}
              download
              className="transparent-btn flex items-center justify-between rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              Descargar {downloadNames[id]}
              <span>PDF</span>
            </a>
          ))}
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-white px-8 py-3 font-semibold text-emerald-950"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}