import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = {
  title: "Export",
  description: "Purohit exports healthy non-fried snacks to 20+ countries globally.",
};

export default function ExportPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Exports</h1>
          <div className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed space-y-4">
            <p>
              We at Purohit have crafted a wide range of non-fried snacks that give the same indulgent and tasty
              experience of consuming fried snacks, only without the guilt of fried!
            </p>
            <p>
              Since our snacks are fire-roasted, they contain no cholesterol and no trans-fat. All the namkeens are made
              using superfoods such as millets (jowar, bajra), quinoa, Indian pulses (dal etc.)
            </p>
            <p>
              Available in 20+ unique flavours, Purohit promises a lip smacking &amp; crunchy snack-time to its
              consumers, globally.
            </p>
            <p>
              Contact us —{" "}
              <a href="mailto:info@purohit.com" className="text-primary">info@purohit.com</a>,{" "}
              <a href="tel:+919314483449" className="text-primary">+91-93144-83449</a>
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container max-w-2xl">
          <h2 className="font-heading text-2xl font-bold mb-8">Contact Form</h2>
          <ContactForm source="export" showQueryType />
        </div>
      </section>
    </>
  );
}
