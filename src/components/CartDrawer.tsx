"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, ArrowUpRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

const formatPrice = (value: number) => {
  return `USD ${value}`;
};

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, clearCart, total } = useCart();

  async function handleCheckout() {
    if (items.length === 0) return;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items.map((item) => item.id),
      }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/15 backdrop-blur-md"
            aria-label="Cerrar carrito"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed right-0 top-0 z-[60] flex h-screen w-full max-w-md flex-col border-l border-white/10 bg-[#03170f]/80 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
                  AETERNA
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                  Tu carrito
                </h2>
              </div>

              <button
                onClick={closeCart}
                className="transparent-btn flex h-10 w-10 items-center justify-center rounded-full"
                aria-label="Cerrar carrito"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <p className="serif text-4xl text-white/80">
                  Todavía no agregaste guías.
                </p>

                <p className="mt-4 max-w-xs text-sm leading-7 text-white/55">
                  Elegí una o varias guías para avanzar con una compra única.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-10 flex-1 space-y-4 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[1.5rem] border border-white/15 bg-white/[0.06] p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                            {item.tag}
                          </p>

                          <h3 className="mt-2 text-lg font-semibold">
                            {item.name}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-white/55">
                            {item.title}
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-full border border-white/15 p-2 text-white/55 transition hover:text-white"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="mt-5 text-right font-semibold">
                        {formatPrice(item.price)}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Total</span>

                    <strong className="text-2xl">
                      {formatPrice(total)}
                    </strong>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Todos los precios están expresados en dólares
                    estadounidenses (USD).
                  </p>

                  <button
                    onClick={handleCheckout}
                    className="transparent-btn mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-white"
                  >
                    Finalizar compra · {formatPrice(total)}
                    <ArrowUpRight size={18} />
                  </button>

                  <button
                    onClick={clearCart}
                    className="mt-4 w-full text-sm text-white/45 transition hover:text-white"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}