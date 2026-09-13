"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { resolveProductImage } from "@/lib/images";
import { useCartStore } from "@/lib/cart-store";
import { useCartUI } from "@/components/cart/cart-context";
import { toast } from "sonner";

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

    // Optional fields.
    // If your database has these, they will be used automatically.
    compareAtPrice?: number | null;
    isNew?: boolean;
    badge?: string | null;
  };

  index?: number;
};

export function ProductCard({
  product,
  index = 0,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { setOpen } = useCartUI();

  const imageSrc = resolveProductImage(
    product.slug,
    product.images
  );

  const soldOut =
    product.variants.length > 0 &&
    product.variants.every((variant) => variant.soldOut);

  /*
   * Until isNew/badge are added to your database,
   * this detects "pack of 4" from the product title.
   */
  const isPackOfFour =
    /pack\s*of\s*4/i.test(product.title) ||
    /pack\s*of\s*4/i.test(product.slug);

  const isNew = product.isNew ?? true;

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
      1
    );

    toast.success("Added to cart");
    setOpen(true);
  }

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "0px 0px -80px 0px",
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
      }}
      className="group relative flex flex-col"
    >
      {/* PRODUCT CARD */}
      <div
        className="
          relative
          overflow-visible
          border-2
          border-[#ef1638]
          bg-[#fffdf3]
        "
      >
        {/* =========================
            IMAGE AREA
        ========================== */}
        <div
          className="
            relative
            aspect-square
            overflow-hidden
            border-b-2
            border-[#ef1638]
            bg-white
          "
        >
          <Link
            href={`/products/${product.slug}`}
            className="absolute inset-0 z-10"
            aria-label={`View ${product.title}`}
          >
            <Image
              src={imageSrc}
              alt={product.title}
              fill
              priority={index < 3}
              className="
      object-contain
      p-8
      transition-transform
      duration-500
      ease-out
      group-hover:scale-[1.04]
      sm:p-10
      md:p-12
    "
              sizes="
      (max-width: 640px) 100vw,
      (max-width: 1024px) 50vw,
      33vw
    "
            />
          </Link>

          {/* =========================
              PACK OF 4 BADGE
          ========================== */}
          {isPackOfFour && (
            <div
              className="
                absolute
                left-3
                top-7
                z-20
                -rotate-1
                bg-[#fff000]
                px-4
                py-2
                shadow-[2px_3px_0_rgba(0,0,0,0.08)]
              "
            >
              <span
                className="
                  font-heading
                  text-base
                  font-black
                  uppercase
                  leading-none
                  tracking-wide
                  text-black
                  sm:text-lg
                "
              >
                Pack of 4
              </span>
            </div>
          )}

          {/* =========================
              NEWLY LAUNCHED BADGE
          ========================== */}
          {isNew && (
            <div
              className="
                absolute
                right-2
                top-0
                z-20
                flex
                h-[68px]
                w-[82px]
                items-center
                justify-center
                rounded-b-[40px]
                bg-[#a8d72c]
                px-2
                text-center
                sm:h-[70px]
                sm:w-[84px]
              "
            >
              <span
                className="
                  font-heading
                  text-[13px]
                  font-black
                  uppercase
                  leading-[1.05]
                  text-black
                  sm:text-sm
                "
              >
                Newly
                <br />
                Launched
              </span>
            </div>
          )}

          {/* SOLD OUT */}
          {soldOut && (
            <div
              className="
                absolute
                left-3
                bottom-3
                z-30
                bg-black
                px-3
                py-1.5
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-white
              "
            >
              Sold Out
            </div>
          )}
        </div>

        {/* =========================
            PRODUCT INFORMATION
        ========================== */}
        <div
          className="
            flex
            min-h-[125px]
            flex-col
            items-center
            justify-center
            px-4
            py-4
            text-center
            sm:min-h-[128px]
          "
        >
          <Link
            href={`/products/${product.slug}`}
            className="block"
          >
            <h3
              className="
                font-heading
                text-[18px]
                font-black
                uppercase
                leading-[1.05]
                tracking-[0.01em]
                text-[#202020]
                transition-opacity
                group-hover:opacity-70
                sm:text-[19px]
                md:text-[20px]
              "
            >
              {product.title}
            </h3>
          </Link>

          {/* PRICE */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <span
              className="
                font-heading
                text-[18px]
                font-black
                uppercase
                text-[#222]
                sm:text-[19px]
              "
            >
              {formatPrice(product.price)}
            </span>

            {product.compareAtPrice &&
              product.compareAtPrice > product.price && (
                <span
                  className="
                    font-heading
                    text-[17px]
                    font-bold
                    text-[#aaa]
                    line-through
                    sm:text-[18px]
                  "
                >
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
          </div>
        </div>
      </div>

      {/* =========================
          ADD TO CART BUTTON
          Intentionally overlaps card
      ========================== */}
      <div className="relative z-30 -mt-5 flex justify-center">
        <Button
          type="button"
          onClick={handleAddToCart}
          disabled={soldOut}
          className="
            h-12
            min-w-[155px]
            rounded-full
            border-0
            bg-[#ed0a38]
            px-7
            font-heading
            text-sm
            font-black
            uppercase
            tracking-wide
            text-white
            shadow-none
            transition-all
            duration-200
            hover:scale-[1.03]
            hover:bg-[#d90731]
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:min-w-[160px]
          "
        >
          <ShoppingCart className="mr-2 h-4 w-4" />

          {soldOut ? "Sold Out" : "Add to Cart"}
        </Button>
      </div>
    </motion.article>
  );
}