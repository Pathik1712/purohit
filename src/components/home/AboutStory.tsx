"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { SITE_IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import { SectionReveal } from "./SectionReveal";

const milestones = [
  {
    year: "2006",
    title: "Born by the bhatti",
    body: "Our MD, Mr. Raj Bagri, drew on a family lineage in grain processing to roast ancient millets, pulses and seeds into wholesome namkeen.",
  },
  {
    year: "2000s",
    title: "We built our own machines",
    body: "No machinery existed off the shelf for roasting grains, so the team designed its own. That know-how still shapes every batch.",
  },
  {
    year: "Today",
    title: "Loved across 20+ countries",
    body: "A sharp focus on quality and taste took our millet snacks and 100% roasted namkeen to the US, UAE, Australia and beyond.",
  },
  {
    year: "Now",
    title: "Still innovating",
    body: "Millet-based instant foods, refined sugar free chikki and sweets: the same passion, served in new ways.",
  },
];

export function AboutStory() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = milestones[index];

  const show = (next: number) => {
    const target = (next + milestones.length) % milestones.length;
    if (target === index) return;
    setDirection(next > index ? 1 : -1);
    setIndex(target);
  };

  return (
    <section className="section-padding overflow-hidden">
      <div className="container grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <SectionReveal className="relative mx-auto w-full max-w-[520px]">
          <div className="relative aspect-[6/7] overflow-hidden rounded-[2.5rem] bg-primary">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[28px] border-secondary/30"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-primary-foreground/5"
            />
            <div className="absolute inset-x-[10%] top-1/2 aspect-square -translate-y-1/2 rounded-full bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-[17%]">
                <Image
                  src={SITE_IMAGES.heroProduct}
                  alt="Roasty Tasty 100% roasted millet namkeen range"
                  fill
                  sizes="(min-width: 768px) 360px, 70vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 right-4 rotate-[-4deg] rounded-2xl bg-secondary px-5 py-4 text-secondary-foreground shadow-lg sm:-right-6">
            <p className="font-heading text-3xl font-bold leading-none">20+</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em]">Countries love us</p>
          </div>
        </SectionReveal>

        <div>
          <SectionReveal>
            <h2 className="font-heading text-[clamp(2rem,4.4vw,3.4rem)] font-bold uppercase leading-[1] tracking-[-0.02em] text-balance text-foreground">
              Built by the bhatti.
              <br />
              Shared in every crunch.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.8] text-muted-foreground sm:text-lg">
              Every snack we make starts the same way it did in 2006: real grains, slow roasting and zero frying.
              What began as one family&apos;s love of millets is now a Jaipur kitchen that feeds snack lovers around
              the world.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-8" aria-live="polite">
              <div className="relative min-h-[150px] overflow-hidden sm:min-h-[130px]">
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.div
                    key={current.year}
                    custom={direction}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, x: direction * 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -32 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    className="grid gap-2 sm:grid-cols-[110px_1fr] sm:gap-6"
                  >
                    <span className="font-heading text-4xl font-bold leading-none text-accent">
                      {current.year}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">{current.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                        {current.body}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.14}>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => show(index - 1)}
                  aria-label="Previous milestone"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1" role="group" aria-label="Milestones">
                  {milestones.map((m, i) => (
                    <button
                      key={m.year}
                      type="button"
                      onClick={() => show(i)}
                      aria-pressed={i === index}
                      className={cn(
                        "h-9 rounded-full px-3 font-heading text-xs font-bold tabular-nums transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                        i === index ? "bg-primary text-primary-foreground" : "text-primary hover:bg-muted",
                      )}
                    >
                      {m.year}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => show(index + 1)}
                  aria-label="Next milestone"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <Link
                href="/about"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold uppercase tracking-[0.08em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Read our story
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
