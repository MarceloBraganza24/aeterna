"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { getProductById, Product } from "@/data/products";

type CartContextType = {
  items: Product[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "aeterna_cart";

function getInitialCart(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const savedCart = window.localStorage.getItem(CART_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

function saveCart(productIds: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(productIds));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>(getInitialCart);
  const [isOpen, setIsOpen] = useState(false);

  const items = useMemo(() => {
    return productIds
      .map((id) => getProductById(id))
      .filter(Boolean) as Product[];
  }, [productIds]);

  const total = items.reduce((acc, item) => acc + item.price, 0);

  const addItem = (productId: string) => {
    setProductIds((current) => {
      if (current.includes(productId)) return current;

      const updated = [...current, productId];
      saveCart(updated);

      return updated;
    });

    setIsOpen(true);
  };

  const removeItem = (productId: string) => {
    setProductIds((current) => {
      const updated = current.filter((id) => id !== productId);
      saveCart(updated);

      return updated;
    });
  };

  const clearCart = () => {
    saveCart([]);
    setProductIds([]);
  };

  const isInCart = (productId: string) => {
    return productIds.includes(productId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((value) => !value),
        addItem,
        removeItem,
        clearCart,
        isInCart,
        total,
        count: items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}