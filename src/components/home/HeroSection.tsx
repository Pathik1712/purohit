"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCT_IMAGES, SITE_IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

const heroSlides = [
  {
    eyebrow: "100% roasted, never fried",
    title: ["Taste ka mazaa,", "without fried", "ki sazaa."],
    body: "Millets, whole grains and Indian pulses, slow-roasted by the bhatti and seasoned the way namkeen should taste.",
    cta: { label: "Find your favourite", href: "/collections/millet-namkeen" },
    image: SITE_IMAGES.heroProduct,
    alt: "Four Roasty Tasty millet namkeen packs: Millet Munch, Millet Mix, 5 Grain Mix and Crunchy Munchy",
  },
  {
    eyebrow: "No refined sugar",
    title: ["Sweet cravings,", "sorted the", "wholesome way."],
    body: "Quinoa, bajra and jowar chikki bound with jaggery and dry fruits. An honest treat for the 4 pm slump.",
    cta: { label: "Shop healthy sweets", href: "/collections/healthy-sweets" },
    image: PRODUCT_IMAGES["millet-quinoa-bites-combo"],
    alt: "Roasty Tasty Quinoa, Bajra and Jowar Chikki packs",
  },
  {
    eyebrow: "Superfood snacking",
    title: ["Quinoa, seeds", "and a kick of", "peri peri."],
    body: "Roasted quinoa, seeds and pearl millet in one crunchy handful, with just enough heat to keep you reaching back in.",
    cta: { label: "Explore quinoa snacks", href: "/collections/quinoa-snacks" },
    image: PRODUCT_IMAGES["quinoa-seeds-peri-peri"],
    alt: "Roasty Tasty Quinoa & Seeds Peri Peri roasted namkeen pack",
  },
];

export function HeroSection() {
  const reduced = useReducedMotion();
  const plugins = useMemo(
    () => (reduced ? [] : [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })]),
    [reduced],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: reduced ? 0 : 32 }, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const togglePlayback = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    if (paused) autoplay.play();
    else autoplay.stop();
    setPaused(!paused);
  }, [emblaApi, paused]);

  useEffect(() => {
    if (!emblaApi || !paused) return;
    const keepStopped = () => emblaApi.plugins()?.autoplay?.stop();
    emblaApi.on("autoplay:play", keepStopped);
    return () => {
      emblaApi.off("autoplay:play", keepStopped);
    };
  }, [emblaApi, paused]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured snacks"
      className="relative isolate overflow-hidden bg-background"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[34%] bg-primary [clip-path:polygon(0_38%,100%_0,100%_100%,0_100%)] md:h-[40%]"
      />

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {heroSlides.map((slide, index) => {
            const active = selectedIndex === index;
            const Heading = index === 0 ? "h1" : "h2";
            return (
              <div
                key={slide.cta.href}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${heroSlides.length}`}
                aria-hidden={!active}
                className="min-w-0 flex-[0_0_100%]"
              >
                <div className="container grid min-h-[clamp(600px,82vh,720px)] items-center gap-6 pb-24 pt-10 md:min-h-[clamp(520px,74vh,680px)] md:grid-cols-[1fr_1.05fr] md:gap-10 md:pb-16 md:pt-12">
                  <div
                    className={cn(
                      "relative z-10 max-w-xl transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
                      active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                    )}
                  >
                    <Heading className="font-heading text-[clamp(2.4rem,5.6vw,4.4rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-balance text-primary">
                      {slide.title.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </Heading>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {slide.body}
                    </p>
                    <Link
                      href={slide.cta.href}
                      tabIndex={active ? 0 : -1}
                      className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-secondary py-2 pl-6 pr-2 text-sm font-semibold text-secondary-foreground shadow-[0_12px_24px_-12px_rgba(109,18,37,0.55)] transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-12px_rgba(109,18,37,0.6)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {slide.cta.label}
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-200 group-hover:translate-x-0.5">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </div>

                  <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[400px] md:max-w-[540px]">
                    <div
                      className={cn(
                        "relative aspect-square rounded-full bg-white shadow-[0_30px_60px_-30px_rgba(45,80,22,0.45)] ring-8 ring-secondary/25 transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
                        active ? "scale-100 opacity-100" : "scale-95 opacity-0",
                      )}
                    >
                      <p className="absolute -left-2 top-[8%] z-10 flex h-24 w-24 -rotate-12 items-center justify-center rounded-full bg-lime p-3 text-center font-heading text-[11px] font-bold uppercase leading-tight text-black shadow-[0_8px_18px_-8px_rgba(0,0,0,0.35)] sm:h-28 sm:w-28 sm:text-xs md:-left-4">
                        {slide.eyebrow}
                      </p>
                      <div className="absolute inset-[17%]">
                        <Image
                          src={slide.image}
                          alt={slide.alt}
                          fill
                          priority={index === 0}
                          sizes="(min-width: 768px) 380px, 70vw"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10">
        <div className="container flex items-center justify-between">
          <div className="pointer-events-auto flex items-center gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.cta.href}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={selectedIndex === index}
                onClick={() => scrollTo(index)}
                className="flex h-8 items-center"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    selectedIndex === index ? "w-10 bg-secondary" : "w-4 bg-white/50 hover:bg-white/80",
                  )}
                />
              </button>
            ))}
          </div>
          <div className="pointer-events-auto flex gap-2">
            {!reduced && (
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
