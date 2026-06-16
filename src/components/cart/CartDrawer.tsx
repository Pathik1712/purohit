"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { useCartUI } from "./cart-context";
import { applyDiscountAction } from "@/lib/actions/cart";

function CartTrigger() {
  const { setOpen } = useCartUI();
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  return (
    <button
      onClick={() => setOpen(true)}
      className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-muted transition-colors"
      aria-label={`Cart, ${count} items`}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}

function CartItems() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Your cart is currently empty.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={`${item.productId}-${item.variantId}`} className="flex gap-3">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={item.image || "/products/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="flex flex-1 flex-col min-w-0">
            <p className="text-sm font-medium line-clamp-2">{item.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{formatPrice(item.price)}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded border border-border hover:bg-muted"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded border border-border hover:bg-muted"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </button>
              <button
                onClick={() => removeItem(item.productId, item.variantId)}
                className="ml-auto flex h-8 w-8 items-center justify-center text-destructive hover:bg-destructive/10 rounded"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CartNote() {
  const note = useCartStore((s) => s.note);
  const setNote = useCartStore((s) => s.setNote);

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Order note</label>
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note to your order..."
        rows={2}
      />
    </div>
  );
}

function CartDiscount() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const discountCode = useCartStore((s) => s.discountCode);
  const setDiscount = useCartStore((s) => s.setDiscount);
  const subtotal = useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));

  async function handleApply() {
    setLoading(true);
    setError("");
    const result = await applyDiscountAction(code, subtotal);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setDiscount(code.toUpperCase(), result.discountAmount ?? 0);
    }
  }

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Discount code</label>
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          disabled={!!discountCode}
        />
        <Button
          variant="outline"
          onClick={handleApply}
          disabled={loading || !!discountCode || !code}
        >
          Apply
        </Button>
      </div>
      {discountCode && (
        <p className="text-sm text-success mt-1">Code {discountCode} applied!</p>
      )}
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}

function CartSummary() {
  const subtotal = useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  const discountAmount = useCartStore((s) => s.discountAmount);
  const items = useCartStore((s) => s.items);

  if (!items.length) return null;

  return (
    <div className="border-t border-border pt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span className="font-medium">{formatPrice(subtotal)}</span>
      </div>
      {discountAmount > 0 && (
        <div className="flex justify-between text-sm text-success">
          <span>Discount</span>
          <span>-{formatPrice(discountAmount)}</span>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Shipping, taxes, and discount codes calculated at checkout.
      </p>
    </div>
  );
}

function CartCheckoutButton() {
  const items = useCartStore((s) => s.items);
  const { setOpen } = useCartUI();

  if (!items.length) return null;

  return (
    <Link href="/checkout" onClick={() => setOpen(false)}>
      <Button className="w-full" size="lg">
        Check out
      </Button>
    </Link>
  );
}

function CartContent({ children }: { children?: ReactNode }) {
  const { open, setOpen } = useCartUI();

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-card shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold">Cart</h2>
          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-6">{children}</div>
        </div>
      </div>
    </>
  );
}

export const CartDrawer = {
  Trigger: CartTrigger,
  Content: CartContent,
  Items: CartItems,
  Note: CartNote,
  Discount: CartDiscount,
  Summary: CartSummary,
  CheckoutButton: CartCheckoutButton,
};
