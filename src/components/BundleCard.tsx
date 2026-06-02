"use client";

import { Check, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function BundleCard() {
  const { addItem, removeItem, isInCart, openCart } = useCart();

  const added = isInCart("bundle_completo");

  function handleClick() {
    if (added) {
      openCart();
      return;
    }

    addItem("bundle_completo");
  }

  return (
    <div className="glass mx-auto mt-10 max-w-3xl rounded-[2rem] p-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
        Colección completa
      </p>

      <h3 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
        Las 3 guías AETERNA
      </h3>

      <p className="mx-auto mt-4 max-w-xl text-white/65">
        Una ruta completa para pasar de la confusión a la estructura:
        dirección, procesos, IA aplicada y automatización.
      </p>

      <p className="mt-6 text-3xl font-semibold">USD 149</p>

      <p className="mt-2 text-sm text-white/45">
        Precio individual total: USD 187 · Ahorrás USD 38
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          onClick={handleClick}
          className="transparent-btn rounded-full px-8 py-4 font-semibold text-white"
        >
          {added ? (
            <span className="flex items-center gap-2">
              <Check size={18} />
              Ver carrito
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Plus size={18} />
              Agregar colección completa
            </span>
          )}
        </button>

        {added && (
          <button
            onClick={() => removeItem("bundle_completo")}
            className="text-sm text-white/45 transition hover:text-white"
          >
            Quitar colección
          </button>
        )}
      </div>
    </div>
  );
}