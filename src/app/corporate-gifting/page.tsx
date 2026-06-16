import { ContactForm } from "@/components/forms/ContactForm";
import { Gift, Package, Heart, Truck, Clock, Palette } from "lucide-react";

export const metadata = {
  title: "Corporate Gifting",
  description: "Thoughtful, unique & smarter gifting hampers with palm-oil-free roasted snacks.",
};

const features = [
  { icon: Palette, title: "Customisable", desc: "Branded sleeves, festive cards, and personalized box designs." },
  { icon: Package, title: "Bulk Discounts", desc: "Whether 50 employees or 5,000 — smooth bulk pricing and process." },
  { icon: Gift, title: "Thoughtful Gifts", desc: "Palm oil free roasted snacks, millet treats, ladoos & chikkis." },
  { icon: Heart, title: "Taste, Tradition & Health", desc: "Authentic Indian taste with mindful ingredients." },
  { icon: Truck, title: "Delivering Pan India", desc: "Reliable delivery across India with logistics partners." },
  { icon: Clock, title: "Timely Service", desc: "Packed, shipped, and delivered right when you need it." },
];

export default function CorporateGiftingPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Corporate Gifting</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Flavourful Fireworks — Thoughtful, Unique &amp; Smarter Diwali Hampers. Go beyond the usual sweets and fried namkeens.
            Our hampers are filled with palm-oil-free 100% roasted snacks, millet chikkis, and no-added-sugar sweets.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <h2 className="font-heading text-2xl font-bold text-center mb-10">What Sets Us Apart</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-xl p-6">
                <f.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-2xl font-bold mb-2">We&apos;re here to help you</h2>
          <p className="text-muted-foreground mb-8">
            Kindly provide us with as much detail as possible. For further queries contact us at{" "}
            <a href="tel:+919314483449" className="text-primary">+91 9314483449</a> or{" "}
            <a href="mailto:info@purohit.com" className="text-primary">info@purohit.com</a>
          </p>
          <ContactForm source="corporate-gifting" />
        </div>
      </section>
    </>
  );
}
