"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { toast } from "sonner";

import { formatPrice } from "@/lib/utils";
import { resolveProductImage } from "@/lib/images";
import { useCartStore } from "@/lib/cart-store";
import { useCartUI } from "@/components/cart/cart-context";

type ProductCardProps = {
  product: {
    id: string;
    title: string;
    slug: string;
    price: number;
    images: string[];
    variants: {
      id: string;
      soldOut: boolean;
    }[];
    featured?: boolean;
    compareAtPrice?: number | null;
    isNew?: boolean;
    badge?: string | null;
  };
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { setOpen } = useCartUI();

  const imageSrc = resolveProductImage(product.slug, product.images);
  const displayTitle = product.title.split("|")[0].trim();
  const soldOut = product.variants.length > 0 && product.variants.every((variant) => variant.soldOut);
  const packMatch = `${product.title} ${product.slug}`.match(/pack[\s-]*of[\s-]*(\d+)/i);
  const sticker = product.badge ?? (product.isNew ? "Newly launched" : product.featured ? "Best seller" : null);

  function handleAddToCart() {
    if (soldOut) return;
    addItem(
      {
        productId: product.id,
        variantId: product.variants[0]?.id ?? null,
        title: product.title,
        price: product.price,
        image: imageSrc,
      },
      1,
    );
    toast.success("Added to cart");
    setOpen(true);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.06 }}
      className="group relative flex h-full flex-col pb-6"
    >
      <div className="relative flex flex-1 flex-col border-[3px] border-accent bg-card p-1">
        <div className="relative aspect-square overflow-hidden bg-white">
          <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={`View ${product.title}`}>
            <Image
              src={imageSrc}
              alt={product.title}
              fill
              priority={index < 2}
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
              className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-[1.05] sm:p-10"
            />
          </Link>

          {packMatch && (
            <div className="absolute left-3 top-4 z-20 -rotate-2 bg-sunshine px-3 py-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
              <span className="font-heading text-xs font-bold uppercase leading-none tracking-wide text-black sm:text-sm">
                Pack of {packMatch[1]}
              </span>
            </div>
          )}

          {sticker && (
            <div className="absolute right-2 top-0 z-20 flex h-[68px] w-[84px] items-center justify-center rounded-b-[42px] bg-lime px-2 text-center">
              <span className="font-heading text-[12px] font-bold uppercase leading-[1.05] text-black sm:text-[13px]">
                {sticker}
              </span>
            </div>
          )}

          {soldOut && (
            <div className="absolute bottom-3 left-3 z-30 bg-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-background">
              Sold out
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col items-center border-t-[3px] border-accent px-4 pb-9 pt-4 text-center">
          <Link href={`/products/${product.slug}`}>
            <h3 className="line-clamp-2 font-heading text-lg font-bold uppercase leading-[1.1] text-foreground transition-colors group-hover:text-accent">
              {displayTitle}
            </h3>
          </Link>
          <div className="mt-2 flex items-baseline justify-center gap-2 font-heading">
            <span className="text-lg font-bold text-leaf">{formatPrice(product.price)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-base font-medium text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={soldOut}
          className="min-h-12 min-w-[168px] -rotate-2 rounded-[46%_54%_42%_58%/62%_52%_48%_38%] bg-accent px-7 font-heading text-sm font-bold uppercase tracking-wide text-accent-foreground transition-transform duration-200 hover:rotate-0 hover:scale-[1.04] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {soldOut ? "Sold out" : "Add to cart"}
        </button>
      </div>
    </motion.article>
  );
}
