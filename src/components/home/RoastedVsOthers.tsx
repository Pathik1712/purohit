import Image from "next/image";
import Link from "next/link";
import { DropletOff, Flame, HeartPulse, ShieldCheck, type LucideIcon } from "lucide-react";
import { SITE_IMAGES } from "@/lib/images";
import { SectionReveal } from "./SectionReveal";

const rows: { feature: string; icon: LucideIcon; others: string; ours: string }[] = [
  { feature: "Cooking method", icon: Flame, others: "Deep fried", ours: "100% roasted" },
  { feature: "Palm oil", icon: DropletOff, others: "Commonly used", ours: "Zero" },
  { feature: "Cholesterol", icon: HeartPulse, others: "Varies", ours: "0%" },
  { feature: "Trans fat", icon: ShieldCheck, others: "Varies", ours: "0%" },
];

export function RoastedVsOthers() {
  return (
    <section aria-labelledby="roasted-vs-heading" className="relative">
      <div aria-hidden className="wave-edge bg-secondary" />
      <div className="bg-secondary py-14 text-secondary-foreground md:py-20">
        <div className="container">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.1fr]">
            <SectionReveal>
              <h2
                id="roasted-vs-heading"
                className="font-heading text-[clamp(2.4rem,5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em]"
              >
                Purohit
                <span className="block text-[0.62em] font-semibold tracking-normal text-secondary-foreground/80">v/s the others</span>
              </h2>
              <p className="mt-4 max-w-sm text-secondary-foreground/85">
                Same crunch you grew up with. None of the frying, palm oil or guilt that usually comes with it.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.08} className="relative mx-auto w-full max-w-[240px] sm:max-w-sm lg:ml-auto lg:mr-6 lg:max-w-[300px]">
              <div className="relative aspect-square rotate-3 rounded-3xl bg-white p-5 shadow-[0_24px_40px_-18px_rgba(60,20,0,0.45)]">
                <div className="relative h-full w-full">
                  <Image
                    src={SITE_IMAGES.heroProduct}
                    alt="Purohit 100% roasted millet namkeen packs"
                    fill
                    sizes="300px"
                    className="object-contain"
                  />
                </div>
              </div>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.12} className="mt-10">
            <table className="w-full table-fixed border-collapse text-left text-sm sm:text-base">
              <caption className="sr-only">How Purohit roasted snacks compare with typical fried namkeen</caption>
              <thead>
                <tr>
                  <th scope="col" className="border-y-2 border-secondary-foreground py-4 pr-2 font-heading font-semibold sm:pr-4 sm:text-lg">Features</th>
                  <th scope="col" className="w-[27%] border-y-2 border-secondary-foreground py-4 text-center font-heading font-semibold sm:text-lg">Others</th>
                  <th
                    scope="col"
                    className="w-[32%] rounded-t-2xl bg-purple px-1 py-4 text-center text-white font-heading sm:text-xl font-bold uppercase tracking-wide"
                  >
                    Purohit
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const Icon = row.icon;
                  const last = i === rows.length - 1;
                  return (
                    <tr key={row.feature}>
                      <th scope="row" className="py-3.5 pr-2 font-medium sm:py-4 sm:pr-4">
                        <span className="flex items-center gap-2.5 sm:gap-4">
                          <Icon aria-hidden className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" strokeWidth={1.5} />
                          {row.feature}
                        </span>
                      </th>
                      <td className="px-1 py-3.5 text-center text-secondary-foreground/85 sm:py-4">{row.others}</td>
                      <td
                        className={`bg-purple px-1 py-3.5 text-center text-white font-heading font-bold sm:py-4 sm:text-lg uppercase ${last ? "rounded-b-2xl" : ""}`}
                      >
                        {row.ours}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-secondary-foreground/75">Compared with typical deep-fried namkeen.</p>
          </SectionReveal>

          <div className="mt-10 flex justify-center">
            <Link
              href="/collections/all"
              className="inline-flex min-h-12 -rotate-2 items-center rounded-[46%_54%_42%_58%/62%_52%_48%_38%] bg-accent px-10 font-heading text-sm font-bold uppercase tracking-wide text-accent-foreground transition-transform duration-200 hover:rotate-0 hover:scale-[1.04] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>
      <div aria-hidden className="wave-edge rotate-180 bg-secondary" />
    </section>
  );
}
