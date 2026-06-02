"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { count, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="transparent-btn relative flex h-10 w-10 items-center justify-center rounded-full"
      aria-label="Abrir carrito"
    >
      <ShoppingBag size={20} />

      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-emerald-950">
          {count}
        </span>
      )}
    </button>
  );
}