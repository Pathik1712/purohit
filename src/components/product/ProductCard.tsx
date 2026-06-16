"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { useCartUI } from "@/components/cart/cart-context";
import { QuickView } from "./QuickView";
import { toast } from "sonner";

type ProductCardProps = {
  product: {
    id: string;
    title: string;
    slug: string;
    price: number;
    images: string[];
    variants: { id: string; soldOut: boolean }[];
  };
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { setOpen } = useCartUI();
  const soldOut = product.variants.every((v) => v.soldOut);

  function handleAddToCart() {
    if (soldOut) return;
    addItem({
      productId: product.id,
      variantId: product.variants[0]?.id ?? null,
      title: product.title,
      price: product.price,
      image: product.images[0] ?? "/products/placeholder.svg",
    });
    toast.success("Added to cart");
    setOpen(true);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -30% 0px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted mb-3">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0] || "/products/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>
        {soldOut && (
          <span className="absolute top-2 left-2 bg-muted-foreground text-white text-xs font-medium px-2 py-1 rounded">
            Sold Out
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 flex gap-2 p-3 opacity-0 group-hover:opacity-100 transition-opacity @media(hover:none):opacity-100">
          <QuickView productSlug={product.slug}>
            <Button variant="secondary" size="sm" className="flex-1">
              <Eye className="h-4 w-4" />
              Quick view
            </Button>
          </QuickView>
        </div>
      </div>

      <Link href={`/products/${product.slug}`} className="flex-1">
        <h3 className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">
          {product.title}
        </h3>
      </Link>
      <p className="text-sm font-semibold mt-1">{formatPrice(product.price)}</p>

      <Button
        className="mt-3 w-full"
        size="sm"
        onClick={handleAddToCart}
        disabled={soldOut}
      >
        <ShoppingCart className="h-4 w-4" />
        {soldOut ? "Sold Out" : "Add to cart"}
      </Button>
    </motion.article>
  );
}
