"use client";

import { Toaster } from "sonner";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer.Content>
        <CartDrawer.Items />
        <CartDrawer.Note />
        <CartDrawer.Discount />
        <CartDrawer.Summary />
        <div className="p-4 border-t border-border">
          <CartDrawer.CheckoutButton />
        </div>
      </CartDrawer.Content>
      <Toaster position="top-center" richColors />
    </CartProvider>
  );
}
