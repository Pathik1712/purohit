"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  id: string;
  author: string;
  body: string;
};

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length, reduced]);

  if (!testimonials.length) return null;

  const current = testimonials[index];

  return (
    <section className="section-padding bg-muted">
      <div className="container max-w-3xl text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">
          #Puro<span className="text-accent">hit</span>monials
        </h2>
        <div className="relative min-h-[180px] sm:min-h-[200px] flex flex-col items-center justify-center px-2">
          <Quote className="h-8 w-8 text-primary/30 mb-4" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground italic">
                &ldquo;{current.body}&rdquo;
              </p>
              <p className="mt-4 font-semibold">{current.author}</p>
            </motion.div>
          </AnimatePresence>
          {testimonials.length > 1 && (
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="h-11 w-11 flex items-center justify-center rounded-full border border-border hover:bg-card transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-border"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                className="h-11 w-11 flex items-center justify-center rounded-full border border-border hover:bg-card transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
