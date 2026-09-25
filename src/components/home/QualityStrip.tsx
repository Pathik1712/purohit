import { DropletOff, Flame, HeartPulse, Wheat, type LucideIcon } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

type BrandPromise = { label: [string, string]; icon: LucideIcon; shape: string };

const leading: BrandPromise[] = [
  { label: ["100%", "Roasted"], icon: Flame, shape: "rounded-[46%_54%_42%_58%/55%_45%_55%_45%]" },
  { label: ["Palm oil", "free"], icon: DropletOff, shape: "rounded-[58%_42%_52%_48%/44%_58%_42%_56%]" },
];

const trailing: BrandPromise[] = [
  { label: ["0% Cholesterol", "0% Trans fat"], icon: HeartPulse, shape: "rounded-[42%_58%_55%_45%/52%_42%_58%_48%]" },
  { label: ["Whole grains", "& millets"], icon: Wheat, shape: "rounded-[55%_45%_46%_54%/46%_56%_44%_54%]" },
];

function PromiseItem({ item, delay }: { item: BrandPromise; delay: number }) {
  const Icon = item.icon;
  return (
    <SectionReveal delay={delay} className="flex flex-col items-center gap-3 text-center">
      <div
        className={`flex h-20 w-20 items-center justify-center bg-secondary/25 text-accent transition-transform duration-300 hover:-rotate-6 md:h-24 md:w-24 ${item.shape}`}
      >
        <Icon aria-hidden className="h-9 w-9 md:h-10 md:w-10" strokeWidth={1.75} />
      </div>
      <p className="font-heading text-sm font-bold uppercase leading-tight tracking-wide text-primary md:text-[15px]">
        {item.label[0]}
        <br />
        {item.label[1]}
      </p>
    </SectionReveal>
  );
}

export function QualityStrip() {
  return (
    <section aria-label="Our promise" className="border-b border-border bg-muted/60 py-12 md:py-14">
      <div className="container grid grid-cols-2 items-center gap-x-6 gap-y-10 md:grid-cols-5">
        <SectionReveal className="col-span-2 flex flex-col items-center text-center md:order-3 md:col-span-1">
          <span className="font-accent text-lg italic text-accent md:text-xl">Roasting joy since</span>
          <span className="font-heading text-6xl font-bold leading-none tracking-tight text-primary md:text-7xl">
            2006
          </span>
          <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Jaipur, India
          </span>
        </SectionReveal>

        {leading.map((item, i) => (
          <div key={item.label.join()} className={i === 0 ? "md:order-1" : "md:order-2"}>
            <PromiseItem item={item} delay={0.05 + i * 0.06} />
          </div>
        ))}
        {trailing.map((item, i) => (
          <div key={item.label.join()} className={i === 0 ? "md:order-4" : "md:order-5"}>
            <PromiseItem item={item} delay={0.17 + i * 0.06} />
          </div>
        ))}
      </div>
    </section>
  );
}
