import Link from "next/link";
import { Star } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

type Review = {
  id: string;
  author: string;
  rating: number;
  body: string;
  product: { title: string; slug: string };
};

const avatarTones = ["bg-purple", "bg-secondary", "bg-leaf", "bg-accent", "bg-lime text-black", "bg-primary"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function TestimonialGrid({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;

  return (
    <section className="section-padding">
      <div className="container max-w-6xl">
        <SectionReveal className="mb-10 text-center md:mb-14">
          <h2 className="font-heading text-[clamp(2rem,4.4vw,3.4rem)] font-bold uppercase leading-[1] tracking-[-0.02em] text-balance text-foreground">
            Good words from the <span className="text-accent">Purohit</span> fam
          </h2>
        </SectionReveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {reviews.slice(0, 6).map((review, i) => (
            <li key={review.id}>
              <SectionReveal delay={(i % 3) * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-[15px] border-[3px] border-gold bg-card p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:-translate-y-1">
                  <header className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold text-white ${avatarTones[i % avatarTones.length]}`}
                    >
                      {initials(review.author)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-foreground">{review.author}</h3>
                      <Link
                        href={`/products/${review.product.slug}`}
                        className="line-clamp-1 text-xs text-muted-foreground hover:text-accent hover:underline"
                      >
                        {review.product.title.split("|")[0].trim()}
                      </Link>
                    </div>
                    <div className="flex shrink-0 gap-0.5" role="img" aria-label={`Rated ${review.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          aria-hidden
                          className={`h-4 w-4 ${s < review.rating ? "fill-foreground text-foreground" : "text-border"}`}
                        />
                      ))}
                    </div>
                  </header>
                  <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">{review.body}</p>
                </article>
              </SectionReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
