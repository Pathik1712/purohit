import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { CertificationGrid } from "@/components/home/CertificationGrid";
import { QualityStrip } from "@/components/home/QualityStrip";
import { AboutStory } from "@/components/home/AboutStory";
import { RetailPartners } from "@/components/home/RetailPartners";
import { GlobalReach } from "@/components/home/GlobalReach";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { RoastedVsOthers } from "@/components/home/RoastedVsOthers";
import { TestimonialGrid } from "@/components/home/TestimonialGrid";
import { getProducts, getFeaturedReviews } from "@/lib/db/products";
import { getTestimonials } from "@/lib/db/collections";

const categorySections = [
  { slug: "millet-namkeen", title: "Variety of Millet Snacks", subtitle: "Snack Smarter!" },
  { slug: "roasted-namkeen", title: "Roasted Namkeen", subtitle: null },
  { slug: "quinoa-snacks", title: "Quinoa Snacks", subtitle: null },
  { slug: "healthy-sweets", title: "Healthy Sweets", subtitle: null },
];

export default async function HomePage() {
  const [featuredProducts, testimonials, reviews] = await Promise.all([
    getProducts({ featured: true, limit: 8 }),
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
      <QualityStrip />
      <AboutStory />

      <ProductShowcase products={featuredProducts} />

      <RoastedVsOthers />

      {/* Category sections */}
      {/* {categoryProducts.map((section, sectionIndex) => (
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
      ))} */}

      <TestimonialCarousel testimonials={testimonials} />

      <RetailPartners />

      <GlobalReach />

      <CertificationGrid />

      <TestimonialGrid reviews={reviews} />
    </>
  );
}
