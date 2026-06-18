import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { CertificationGrid } from "@/components/home/CertificationGrid";
import { SectionReveal } from "@/components/home/SectionReveal";
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
          <SectionReveal>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">Our Products</h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              Delicious roasted snacks &amp; namkeen made with nourishing superfoods such as quinoa, millets and Indian pulses,
              seasoned in lip smacking authentic taste of India. Perfect for guilt-free indulgences!
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Best sellers */}
      {featuredProducts.length > 0 && (
        <section className="section-padding border-t border-border bg-muted/50">
          <div className="container">
            <SectionReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <p className="text-accent font-medium text-sm mb-1">Customer favourites</p>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold">Best Sellers</h2>
                </div>
                <Link
                  href="/collections/best-seller"
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1 shrink-0"
                >
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </SectionReveal>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )}

      {/* Category sections */}
      {categoryProducts.map((section, sectionIndex) => (
        <section key={section.slug} className="section-padding border-t border-border">
          <div className="container">
            <SectionReveal delay={sectionIndex * 0.05}>
              {section.subtitle && (
                <p className="text-accent font-medium text-sm mb-1">{section.subtitle}</p>
              )}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <h2 className="font-heading text-2xl md:text-3xl font-bold">{section.title}</h2>
                <Link
                  href={`/collections/${section.slug}`}
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1 shrink-0"
                >
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </SectionReveal>
            <ProductGrid products={section.products} />
          </div>
        </section>
      ))}

      <TestimonialCarousel testimonials={testimonials} />

      {/* Available On */}
      <section className="section-padding bg-muted">
        <div className="container text-center">
          <SectionReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">Available On</h2>
            <p className="text-muted-foreground mb-8">Find us on your favourite platforms</p>
          </SectionReveal>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            {retailPartners.map((partner, i) => (
              <SectionReveal key={partner} delay={i * 0.04}>
                <span className="inline-flex items-center justify-center min-h-11 px-5 sm:px-6 py-2.5 bg-card rounded-lg border border-border text-sm font-medium shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                  {partner}
                </span>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CertificationGrid />

      <ReviewStrip reviews={reviews} />
    </>
  );
}
