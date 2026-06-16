"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { createOrderAction, createRazorpayOrderAction } from "@/lib/actions/checkout";
import { calculateShipping } from "@/lib/shipping";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const note = useCartStore((s) => s.note);
  const discountCode = useCartStore((s) => s.discountCode);
  const discountAmount = useCartStore((s) => s.discountAmount);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  const [loading, setLoading] = useState(false);
  const [isGifting, setIsGifting] = useState(false);

  const shipping = calculateShipping(subtotal, isGifting);
  const total = subtotal - discountAmount + shipping;

  if (!items.length) {
    return (
      <div className="container section-padding text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Your cart is empty</h1>
        <Button asChild><Link href="/collections/all">Continue Shopping</Link></Button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const orderData = {
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      name: form.get("name") as string,
      line1: form.get("line1") as string,
      line2: (form.get("line2") as string) || undefined,
      city: form.get("city") as string,
      state: form.get("state") as string,
      pincode: form.get("pincode") as string,
      items: items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
      })),
      note,
      discountCode: discountCode ?? undefined,
      discountAmount,
      isGifting,
    };

    const result = await createOrderAction(orderData);
    if (result.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    const payment = await createRazorpayOrderAction(result.orderId!, result.total!);

    if (payment.stub) {
      clearCart();
      toast.success("Order placed successfully! (Test mode)");
      router.push(`/checkout/success?orderId=${result.orderId}`);
      return;
    }

    if (payment.error) {
      toast.error(payment.error);
      setLoading(false);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const rzp = new window.Razorpay({
        key: payment.keyId,
        amount: result.total,
        currency: "INR",
        name: "Purohit",
        description: "Order Payment",
        order_id: payment.razorpayOrderId,
        handler: () => {
          clearCart();
          router.push(`/checkout/success?orderId=${result.orderId}`);
        },
      });
      rzp.open();
      setLoading(false);
    };
    document.body.appendChild(script);
  }

  return (
    <div className="container section-padding">
      <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="font-semibold text-lg">Shipping Address</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="line1">Address</Label>
              <Input id="line1" name="line1" required />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="line2">Apartment, suite, etc. (optional)</Label>
              <Input id="line2" name="line2" />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" required />
            </div>
            <div>
              <Label htmlFor="pincode">PIN Code</Label>
              <Input id="pincode" name="pincode" required />
            </div>
          </div>

          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={isGifting}
              onChange={(e) => setIsGifting(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm">This is a gifting order (free shipping)</span>
          </label>

          <Button type="submit" size="lg" className="w-full mt-6" disabled={loading}>
            {loading ? "Processing..." : `Pay ${formatPrice(total)}`}
          </Button>
        </form>

        <div className="bg-muted rounded-xl p-6 h-fit">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <ul className="space-y-3 mb-6">
            {items.map((item) => (
              <li key={`${item.productId}-${item.variantId}`} className="flex justify-between text-sm">
                <span className="line-clamp-1 flex-1 mr-4">{item.title} × {item.quantity}</span>
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-success"><span>Discount</span><span>-{formatPrice(discountAmount)}</span></div>
            )}
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
