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
import Marquee from "react-fast-marquee";
import Image from "next/image";

const categorySections = [
  { slug: "millet-namkeen", title: "Variety of Millet Snacks", subtitle: "Snack Smarter!" },
  { slug: "roasted-namkeen", title: "Roasted Namkeen", subtitle: null },
  { slug: "quinoa-snacks", title: "Quinoa Snacks", subtitle: null },
  { slug: "healthy-sweets", title: "Healthy Sweets", subtitle: null },
];

// const retailPartners = ["BigBasket", "Blinkit", "Swiggy Instamart", "Amazon", "Flipkart", "Nature's Basket"];

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

  const retailPartnersData = [
  { name: "D-Mart", logo: "/path-to-your-dmart-logo.png" }, 
  { name: "Fresh Choice", logo: "/path-to-your-freshchoice-logo.png" },
  { name: "VIVA", logo: "/path-to-your-viva-logo.png" },
  { name: "Meesho", logo: "/path-to-your-meesho-logo.png" },
  { name: "LuLu", logo: "/path-to-your-lulu-logo.png" },
  { name: "Univer Yummy", logo: "/path-to-your-univeryummy-logo.png" }
  ];

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

      {/* We are here */}
       <section className="section-padding bg-muted overflow-hidden">
      <div className="container text-center">
        <SectionReveal>
          {/* 2. Updated Header Text based on your screenshot */}
          <h2 className="font-heading text-3xl md:text-4xl font-black mb-3 text-[#31bcfb] font-[YourCartoonFontName]">
            WE'RE HERE
          </h2>
          {/* Optional subtext, or remove if not needed */}
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
            Find our products at these leading retail partners.
          </p>
        </SectionReveal>
      </div>

      {/* 3. The Marquee Component Container */}
      {/* Added a subtle gradient mask on the sides for a smoother entry/exit effect */}
      <div className="relative w-full mask-gradient-sides">
        <Marquee
          gradient={false} // We'll handle gradients with CSS
          speed={40}       // Adjust scroll speed (pixels per second)
          pauseOnHover={true}
          loop={0}         // Infinite loop
        >
          {/* 4. Mapping over the data to render logo cards */}
          {retailPartnersData.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="mx-6 flex items-center justify-center"
            >
              {/* This is the card component, styled closer to your original concept but optimized for logos */}
              <div className="flex items-center justify-center w-[200px] h-[90px] px-6 py-5 bg-card rounded-xl border border-border shadow-sm transition-all hover:shadow-lg hover:border-primary/30">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} Logo`}
                  width={160}// Fixed width for consistency in marquee
                  height={60} // Fixed height for consistency
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>

      <CertificationGrid />

      <ReviewStrip reviews={reviews} />
    </>
  );
}
