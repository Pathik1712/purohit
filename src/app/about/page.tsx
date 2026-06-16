export const metadata = {
  title: "Our Story",
  description: "Born by the bhatti in 2006 — Pioneer Foods crafts delicious crunchy millet snacks loved across 20+ countries.",
};

const milestones = [
  {
    year: "2006",
    title: "Born by the bhatti",
    body: "Our MD, Mr. Raj Bagri, with a family lineage in grain processing, made his first attempts to bring innovation & modernization by processing & roasting of ancient millets, grains pulses, and seeds into wholesome snacks & savories (namkeen).",
  },
  {
    year: "2000s",
    title: "Innovation in every step",
    body: "Being a relatively new category, no machinery was available off the shelf for roasting grains. The team designed their own machinery, giving them a strong manufacturing advantage.",
  },
  {
    year: "Today",
    title: "Loved across 20+ Countries",
    body: "With a penchant for innovation, & a sharp focus on quality & taste, the Pioneer Foods team crafted delicious crunchy millet snacks & 100% roasted namkeens that gained love across 20+ countries including US, UAE, Australia & more.",
  },
  {
    year: "Now",
    title: "Serving delight through novel innovations",
    body: "Continuing this same passion for innovation, we have created a range of millet-based instant foods, refined sugar free chikki & sweets that promise a wholesome indulgent experience.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground section-padding text-center">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold">TAKING TO THE WORLD</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl space-y-16">
          {milestones.map((m) => (
            <article key={m.year} className="grid md:grid-cols-[120px_1fr] gap-6">
              <div className="font-heading text-3xl font-bold text-primary">{m.year}</div>
              <div>
                <h2 className="font-heading text-xl font-semibold mb-3">{m.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{m.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding bg-muted text-center">
        <div className="container">
          <h2 className="font-heading text-2xl font-bold mb-8">Our Certifications</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["FSSAI", "ISO 22000", "HACCP", "Organic India", "Export Quality"].map((cert) => (
              <div key={cert} className="w-32 h-32 bg-card rounded-xl border border-border flex items-center justify-center text-sm font-semibold text-primary">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
