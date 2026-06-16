import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { ReviewStrip } from "@/components/reviews/ReviewList";
import { getProducts, getFeaturedReviews } from "@/lib/db/products";
import { getTestimonials } from "@/lib/db/collections";

const categorySections = [
  { slug: "millet-namkeen", title: "Variety of Millet Snacks", subtitle: "Snack Smarter!" },
  { slug: "roasted-namkeen", title: "Roasted Namkeen", subtitle: null },
  { slug: "quinoa-snacks", title: "Quinoa Snacks", subtitle: null },
  { slug: "healthy-sweets", title: "Healthy Sweets", subtitle: null },
];

const retailPartners = ["BigBasket", "Blinkit", "Swiggy Instamart", "Amazon", "Flipkart", "Nature's Basket"];
const certifications = ["FSSAI", "ISO 22000", "HACCP", "Organic India", "Export Quality"];

export default async function HomePage() {
  const [featuredProducts, testimonials, reviews] = await Promise.all([
    getProducts({ featured: true, limit: 4 }),
    getTestimonials(),
    getFeaturedReviews(8),
  ]);

  const categoryProducts = await Promise.all(
    categorySections.map(async (cat) => ({
      ...cat,
      products: await getProducts({ collectionSlug: cat.slug, limit: 5 }),
    }))
  );

  return (
    <>
      <HeroSection />

      {/* Our Products intro */}
      <section className="section-padding">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold mb-4">Our Products</h2>
          <p className="text-muted-foreground leading-relaxed">
            Delicious roasted snacks &amp; namkeen made with nourishing superfoods such as quinoa, millets and Indian pulses,
            seasoned in lip smacking authentic taste of India. Perfect for guilt-free indulgences!
          </p>
        </div>
      </section>

      {/* Category sections */}
      {categoryProducts.map((section) => (
        <section key={section.slug} className="section-padding border-t border-border">
          <div className="container">
            {section.subtitle && (
              <p className="text-accent font-medium text-sm mb-1">{section.subtitle}</p>
            )}
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{section.title}</h2>
              <Link
                href={`/collections/${section.slug}`}
                className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ProductGrid products={section.products} />
          </div>
        </section>
      ))}

      <TestimonialCarousel testimonials={testimonials} />

      {/* Available On */}
      <section className="section-padding bg-muted">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold mb-8">Available On</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {retailPartners.map((partner) => (
              <span
                key={partner}
                className="px-6 py-3 bg-card rounded-lg border border-border text-sm font-medium"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="container text-center">
          <h2 className="font-heading text-2xl font-bold mb-8">Certified and Approved by</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-5 py-2 rounded-full border-2 border-primary text-primary text-sm font-semibold"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ReviewStrip reviews={reviews} />
    </>
  );
}
