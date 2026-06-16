"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { useCartUI } from "@/components/cart/cart-context";
import { toast } from "sonner";

type ProductData = {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string | null;
  images: string[];
  variants: { id: string; title: string; soldOut: boolean; inventory: number }[];
};

function QuickViewContent({ productSlug }: { productSlug: string }) {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { setOpen: setCartOpen } = useCartUI();

  useEffect(() => {
    fetch(`/api/products/${productSlug}`)
      .then((r) => r.json())
      .then(setProduct);
  }, [productSlug]);

  if (!product) {
    return <div className="py-8 text-center text-muted-foreground">Loading...</div>;
  }

  const soldOut = product.variants.every((v) => v.soldOut);

  function handleAdd() {
    if (soldOut) return;
    addItem(
      {
        productId: product!.id,
        variantId: product!.variants[0]?.id ?? null,
        title: product!.title,
        price: product!.price,
        image: product!.images[0] ?? "/products/placeholder.svg",
      },
      quantity
    );
    toast.success("Added to cart");
    setCartOpen(true);
  }

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <div className="relative aspect-square rounded-lg bg-muted overflow-hidden">
        <Image
          src={product.images[0] || "/products/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover"
          sizes="400px"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-xl font-bold mt-2">{formatPrice(product.price)}</p>
        {product.description && (
          <p className="text-sm text-muted-foreground mt-3 line-clamp-4">{product.description}</p>
        )}
        <div className="flex items-center gap-3 mt-6">
          <label className="text-sm font-medium">Quantity</label>
          <div className="flex items-center border border-border rounded-md">
            <button
              className="h-10 w-10 flex items-center justify-center hover:bg-muted"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >−</button>
            <span className="w-10 text-center">{quantity}</span>
            <button
              className="h-10 w-10 flex items-center justify-center hover:bg-muted"
              onClick={() => setQuantity((q) => q + 1)}
            >+</button>
          </div>
        </div>
        <Button className="mt-6" onClick={handleAdd} disabled={soldOut}>
          {soldOut ? "Sold Out" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}

export function QuickView({ productSlug, children }: { productSlug: string; children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Quick view</DialogTitle>
        </DialogHeader>
        <QuickViewContent productSlug={productSlug} />
      </DialogContent>
    </Dialog>
  );
}
