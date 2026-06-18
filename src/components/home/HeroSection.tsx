"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_IMAGES } from "@/lib/images";

const heroStats = [
  { icon: Leaf, label: "Palm oil free" },
  { icon: ShieldCheck, label: "FSSAI certified" },
  { icon: Sparkles, label: "20+ countries" },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const imageVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: 0.15, ease: EASE_OUT },
  },
};

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(245,166,35,0.35) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(232,93,4,0.2) 0%, transparent 50%)",
        }}
      />

      <div className="container section-padding relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="order-1 flex flex-col">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0, ease: EASE_OUT }}
              className="text-secondary font-medium text-sm sm:text-base mb-3"
            >
              100% Roasted · Palm Oil Free
            </motion.p>
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT }}
              className="font-heading text-[clamp(2rem,5.5vw,3.75rem)] font-bold leading-[1.1] tracking-tight"
            >
              Healthy Millet Snacks &amp; Namkeen
            </motion.h1>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: EASE_OUT }}
              className="mt-4 sm:mt-6 text-base sm:text-lg opacity-90 leading-relaxed max-w-xl"
            >
              Delicious roasted snacks made with nourishing superfoods such as quinoa, millets and Indian pulses,
              seasoned in lip smacking authentic taste of India. Perfect for guilt-free indulgences!
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: EASE_OUT }}
              className="mt-6 sm:mt-8 flex flex-wrap gap-3"
            >
              <Button asChild size="lg" variant="secondary" className="min-h-11">
                <Link href="/collections/all">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-11 border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/corporate-gifting">Corporate Gifting</Link>
              </Button>
            </motion.div>

            <motion.ul
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32, ease: EASE_OUT }}
              className="mt-8 hidden sm:flex flex-wrap gap-3"
              aria-label="Product highlights"
            >
              {heroStats.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm"
                >
                  <Icon className="h-4 w-4 text-secondary shrink-0" aria-hidden />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={imageVariants}
            className="order-2 relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-square w-full overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/20">
              <Image
                src={SITE_IMAGES.heroBanner}
                alt="Assorted Roasty Tasty millet snacks and namkeen"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 50vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"
                aria-hidden
              />
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
              className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-4 w-[38%] min-w-[100px] max-w-[140px] aspect-square rounded-xl overflow-hidden border-2 border-white/30 shadow-xl"
            >
              <Image
                src={SITE_IMAGES.heroProduct}
                alt="Roasted millet namkeen combo pack"
                fill
                className="object-cover"
                sizes="140px"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
