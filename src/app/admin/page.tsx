import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin";
import { connectDB } from "@/lib/mongoose";
import Purchase from "@/models/Purchase";

function formatPrice(value: number) {
  return `USD ${value}`;
}

export default async function AdminPage() {
  const isAdmin = await isAdminAuthenticated();

  if (!isAdmin) {
    redirect("/admin/login");
  }

  await connectDB();

  const purchases = await Purchase.find()
    .sort({ createdAt: -1 })
    .lean();

  const totalSales = purchases.length;

  const totalRevenue = purchases.reduce((acc, purchase) => {
    return acc + Number(purchase.amountTotal || 0);
  }, 0);

  const productCounts = purchases.reduce<Record<string, number>>(
    (acc, purchase) => {
      purchase.products.forEach((product: string) => {
        acc[product] = (acc[product] || 0) + 1;
      });

      return acc;
    },
    {}
  );

  const uniqueBuyers = new Set(
    purchases.map((purchase) => purchase.email)
  ).size;

  return (
    <main className="min-h-screen bg-[#03170f] px-5 py-10 text-white md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
              AETERNA
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em]">
              Dashboard Admin
            </h1>

            <p className="mt-3 text-white/55">
              Ventas, ingresos, productos vendidos y compradores.
            </p>
          </div>

          <a
            href="/"
            className="transparent-btn rounded-full px-6 py-3 text-sm font-semibold"
          >
            Volver al sitio
          </a>
          <a
            href="/admin/logout"
            className="transparent-btn rounded-full px-6 py-3 text-sm font-semibold"
            >
            Cerrar sesión
            </a>
        </div>

        <section className="mt-10 grid gap-5 md:grid-cols-4">
          <div className="glass rounded-[2rem] p-6">
            <p className="text-sm text-white/50">Ventas</p>
            <strong className="mt-4 block text-4xl">{totalSales}</strong>
          </div>

          <div className="glass rounded-[2rem] p-6">
            <p className="text-sm text-white/50">Ingresos</p>
            <strong className="mt-4 block text-4xl">
              {formatPrice(totalRevenue)}
            </strong>
          </div>

          <div className="glass rounded-[2rem] p-6">
            <p className="text-sm text-white/50">Compradores</p>
            <strong className="mt-4 block text-4xl">{uniqueBuyers}</strong>
          </div>

          <div className="glass rounded-[2rem] p-6">
            <p className="text-sm text-white/50">Productos vendidos</p>
            <strong className="mt-4 block text-4xl">
              {Object.values(productCounts).reduce((a, b) => a + b, 0)}
            </strong>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass rounded-[2rem] p-6">
            <h2 className="text-2xl font-semibold">Productos vendidos</h2>

            <div className="mt-6 space-y-4">
              {Object.entries(productCounts).map(([product, count]) => (
                <div
                  key={product}
                  className="flex items-center justify-between rounded-2xl bg-white/[0.06] px-5 py-4"
                >
                  <span className="text-white/70">{product}</span>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="glass overflow-hidden rounded-[2rem]">
            <div className="border-b border-white/10 p-6">
              <h2 className="text-2xl font-semibold">Últimas compras</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-white/[0.05] text-white/45">
                  <tr>
                    <th className="px-5 py-4">Cliente</th>
                    <th className="px-5 py-4">Productos</th>
                    <th className="px-5 py-4">Monto</th>
                    <th className="px-5 py-4">Estado</th>
                    <th className="px-5 py-4">Fecha</th>
                  </tr>
                </thead>

                <tbody>
                  {purchases.map((purchase) => (
                    <tr
                      key={purchase._id.toString()}
                      className="border-t border-white/10"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium">
                          {purchase.customerName || "Sin nombre"}
                        </p>
                        <p className="text-white/45">{purchase.email}</p>
                      </td>

                      <td className="px-5 py-4 text-white/70">
                        {purchase.products.join(", ")}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        {formatPrice(purchase.amountTotal)}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                          {purchase.paymentStatus}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-white/45">
                        {new Date(purchase.createdAt).toLocaleDateString(
                          "es-AR"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}