"use client";

import Image from "next/image";
import { SectionReveal } from "./SectionReveal";
import { SITE_IMAGES } from "@/lib/images";

const certifications = [
  { name: "FSSAI", image: SITE_IMAGES.certFssai, hasImage: true },
  { name: "ISO 22000", image: SITE_IMAGES.certIso, hasImage: true },
  { name: "HACCP", image: null, hasImage: false },
  { name: "Organic India", image: null, hasImage: false },
  { name: "Export Quality", image: null, hasImage: false },
];

export function CertificationGrid() {
  return (
    <section className="section-padding">
      <div className="container text-center">
        <SectionReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
            Certified and Approved by
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Quality you can trust — from farm to pack, every batch meets rigorous food safety standards.
          </p>
        </SectionReveal>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {certifications.map((cert, i) => (
            <SectionReveal key={cert.name} delay={i * 0.06} className="flex">
              <div className="flex flex-col items-center gap-2 w-28 sm:w-32">
                <div className="w-full aspect-square bg-card rounded-xl border border-border flex items-center justify-center p-3 shadow-sm hover:shadow-md transition-shadow">
                  {cert.hasImage && cert.image ? (
                    <Image
                      src={cert.image}
                      alt={`${cert.name} certification`}
                      width={96}
                      height={96}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <span className="text-xs sm:text-sm font-semibold text-primary text-center leading-tight px-1">
                      {cert.name}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-muted-foreground">{cert.name}</span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
