"use client";

import Marquee from "react-fast-marquee";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { SectionReveal } from "./SectionReveal";

const partners = [
  { name: "Amazon India", where: "Online" },
  { name: "Flipkart", where: "Online" },
  { name: "JioMart", where: "Online" },
  { name: "Spencer's", where: "In store" },
  { name: "Dorabjee's", where: "In store" },
  { name: "Al Adil", where: "UAE" },
  { name: "Uber Eats", where: "Delivery" },
];

function PartnerCard({ name, where }: (typeof partners)[number]) {
  return (
    <div className="mx-3 flex h-24 min-w-[200px] flex-col items-center justify-center rounded-2xl border border-border bg-card px-8 transition-colors duration-300 hover:border-secondary md:mx-4 md:h-28 md:min-w-[230px]">
      <span className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">{name}</span>
      <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{where}</span>
    </div>
  );
}

export function RetailPartners() {
  const [playing, setPlaying] = useState(true);

  return (
    <section className="section-padding overflow-hidden bg-muted/60">
      <div className="container text-center">
        <SectionReveal>
          <h2 className="font-heading text-[clamp(2rem,4.4vw,3.4rem)] font-bold uppercase leading-none tracking-[-0.02em] text-balance text-foreground">
            We&apos;re here
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Grab a pack online, pick one up in store, or find us across the Gulf.
          </p>
        </SectionReveal>
      </div>

      <div className="mt-10 md:mt-12">
        <ul className="container sr-only flex-wrap justify-center gap-y-4 motion-reduce:not-sr-only motion-reduce:flex">
          {partners.map((p) => (
            <li key={p.name}>
              <PartnerCard {...p} />
            </li>
          ))}
        </ul>
        <div
          aria-hidden
          className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:hidden"
        >
          <Marquee speed={36} play={playing} pauseOnHover autoFill>
            {partners.map((p) => (
              <PartnerCard key={p.name} {...p} />
            ))}
          </Marquee>
        </div>
        <div className="container mt-5 flex justify-center motion-reduce:hidden">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            {playing ? <Pause aria-hidden className="h-3.5 w-3.5" /> : <Play aria-hidden className="h-3.5 w-3.5" />}
            {playing ? "Pause" : "Play"} scrolling
          </button>
        </div>
      </div>
    </section>
  );
}
