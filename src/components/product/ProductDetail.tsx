"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ProductGrid } from "@/components/product/ProductGrid";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { useCartUI } from "@/components/cart/cart-context";
import { toast } from "sonner";
import { submitReviewAction } from "@/lib/actions/reviews";

type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string | null;
  images: string[];
  variants: { id: string; title: string; soldOut: boolean }[];
  reviews: { id: string; author: string; rating: number; body: string; createdAt: Date }[];
};

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ author: "", rating: 5, body: "" });
  const addItem = useCartStore((s) => s.addItem);
  const { setOpen } = useCartUI();
  const soldOut = product.variants.every((v) => v.soldOut);

  function handleAddToCart() {
    if (soldOut) return;
    addItem(
      {
        productId: product.id,
        variantId: product.variants[0]?.id ?? null,
        title: product.title,
        price: product.price,
        image: product.images[0] ?? "/products/placeholder.svg",
      },
      quantity
    );
    toast.success("Added to cart");
    setOpen(true);
  }

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await submitReviewAction({
      productId: product.id,
      ...reviewForm,
    });
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Review submitted!");
      setReviewForm({ author: "", rating: 5, body: "" });
    }
  }

  return (
    <div className="container section-padding">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="relative aspect-square rounded-xl bg-muted overflow-hidden">
          <Image
            src={product.images[0] || "/products/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-bold mt-4">{formatPrice(product.price)}</p>
          {product.description && (
            <p className="text-muted-foreground mt-6 leading-relaxed">{product.description}</p>
          )}

          <div className="flex items-center gap-4 mt-8">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center border border-border rounded-md">
              <button
                className="h-11 w-11 flex items-center justify-center hover:bg-muted"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                className="h-11 w-11 flex items-center justify-center hover:bg-muted"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <Button
            className="w-full mt-6"
            size="lg"
            onClick={handleAddToCart}
            disabled={soldOut}
          >
            <ShoppingCart className="h-5 w-5" />
            {soldOut ? "Sold Out" : "Add to cart"}
          </Button>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="px-3 py-1 bg-muted rounded-full">Palm Oil Free</span>
            <span className="px-3 py-1 bg-muted rounded-full">Cholesterol Free</span>
            <span className="px-3 py-1 bg-muted rounded-full">100% Roasted</span>
          </div>
        </div>
      </div>

      <section className="mt-16 border-t border-border pt-16">
        <h2 className="font-heading text-2xl font-bold mb-8">Customer Reviews</h2>
        <ReviewList reviews={product.reviews.map((r) => ({ ...r, product: { title: product.title, slug: product.slug } }))} />

        <form onSubmit={handleReviewSubmit} className="mt-10 max-w-lg space-y-4">
          <h3 className="font-semibold">Write a review</h3>
          <input
            required
            placeholder="Your name"
            value={reviewForm.author}
            onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
            className="w-full h-11 rounded-md border border-border px-3 text-sm"
          />
          <select
            value={reviewForm.rating}
            onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
            className="w-full h-11 rounded-md border border-border px-3 text-sm"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} stars</option>
            ))}
          </select>
          <textarea
            required
            placeholder="Your review"
            value={reviewForm.body}
            onChange={(e) => setReviewForm({ ...reviewForm, body: e.target.value })}
            rows={3}
            className="w-full rounded-md border border-border px-3 py-2 text-sm"
          />
          <Button type="submit">Submit Review</Button>
        </form>
      </section>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-16">
          <h2 className="font-heading text-2xl font-bold mb-8">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
