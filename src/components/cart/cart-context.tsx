"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface CartUIContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartUIContext = createContext<CartUIContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <CartUIContext.Provider value={{ open, setOpen }}>
      {children}
    </CartUIContext.Provider>
  );
}

export function useCartUI() {
  const ctx = useContext(CartUIContext);
  if (!ctx) throw new Error("useCartUI must be used within CartProvider");
  return ctx;
}
