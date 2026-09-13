"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/images";
import { useCallback, useEffect, useState } from "react";

const heroSlides = [
  {
    image: SITE_IMAGES.heroBanner,
    alt: "Roasty Tasty millet snacks and namkeen",
  },
  {
    image: SITE_IMAGES.heroBanner,
    alt: "Healthy roasted millet snacks",
  },
  {
    image: SITE_IMAGES.heroBanner,
    alt: "Premium Roasty Tasty snacks",
  },
];

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden bg-primary">
      {/* Slider */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-0 flex-[0_0_100%]"
            >
              <div className="relative aspect-8/3 w-full">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous button */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 border-white/30 bg-black/20 text-white backdrop-blur-sm hover:bg-black/40 hover:text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Next button */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 border-white/30 bg-black/20 text-white backdrop-blur-sm hover:bg-black/40 hover:text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={selectedIndex === index}
            onClick={() => scrollTo(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? "w-8 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
