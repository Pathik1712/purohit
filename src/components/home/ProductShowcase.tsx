"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import { SectionReveal } from "./SectionReveal";

type Product = Parameters<typeof ProductCard>[0]["product"];

export function ProductShowcase({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    setSelected(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = requestAnimationFrame(sync);
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi, sync]);

  if (!products.length) return null;

  const arrow =
    "absolute top-[38%] z-40 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-foreground bg-card text-foreground shadow-[0_8px_18px_-8px_rgba(0,0,0,0.35)] transition-[background-color,color,opacity] duration-200 hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-0 md:flex";

  return (
    <section className="section-padding overflow-hidden">
      <div className="container">
        <SectionReveal className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <h2 className="font-heading text-[clamp(2rem,4.4vw,3.4rem)] font-bold uppercase leading-[1] tracking-[-0.02em] text-balance text-foreground">
            India&apos;s top picks,
            <br className="hidden sm:block" /> made the <span className="text-accent">roasted</span> way
          </h2>
        </SectionReveal>

        <div className="relative">
          <div ref={emblaRef} className="-mx-2 overflow-hidden px-2 py-1">
            <div className="-ml-4 flex touch-pan-y md:-ml-6">
              {products.map((product, i) => (
                <div
                  key={product.id}
                  className="min-w-0 flex-[0_0_82%] pl-4 sm:flex-[0_0_48%] md:pl-6 lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
                >
                  <ProductCard product={product} index={i} />
                </div>
              ))}
            </div>
          </div>

          <button type="button" onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev} aria-label="Previous products" className={cn(arrow, "-left-3 lg:-left-5")}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => emblaApi?.scrollNext()} disabled={!canNext} aria-label="Next products" className={cn(arrow, "-right-3 lg:-right-5")}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center gap-6">
          {snaps.length > 1 && (
            <div className="flex items-center gap-1">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to product group ${i + 1}`}
                  aria-current={selected === i}
                  className="flex h-8 w-6 items-center justify-center"
                >
                  <span
                    className={cn(
                      "block h-2.5 rounded-full transition-all duration-300",
                      selected === i ? "w-2.5 bg-foreground" : "w-2.5 border border-foreground/40",
                    )}
                  />
                </button>
              ))}
            </div>
          )}
          <Link
            href="/collections/all"
            className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-foreground underline decoration-accent decoration-[3px] underline-offset-[6px] transition-colors hover:text-accent"
          >
            Shop all snacks
          </Link>
        </div>
      </div>
    </section>
  );
}
