"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-secondary font-medium mb-3">100% Roasted · Palm Oil Free</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Healthy Millet Snacks &amp; Namkeen
          </h1>
          <p className="mt-6 text-lg opacity-90 leading-relaxed">
            Delicious roasted snacks made with nourishing superfoods such as quinoa, millets and Indian pulses,
            seasoned in lip smacking authentic taste of India. Perfect for guilt-free indulgences!
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button asChild size="lg" variant="secondary">
              <Link href="/collections/all">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link href="/corporate-gifting">Corporate Gifting</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
