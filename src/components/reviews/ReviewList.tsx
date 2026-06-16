import Link from "next/link";
import { Star } from "lucide-react";

type Review = {
  id: string;
  author: string;
  rating: number;
  body: string;
  createdAt: Date;
  product: { title: string; slug: string };
};

export function ReviewStrip({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;

  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-2">
          Let customers speak for us
        </h2>
        <p className="text-center text-muted-foreground mb-10">from {reviews.length}+ reviews</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.slice(0, 8).map((review) => (
            <article key={review.id} className="bg-card border border-border rounded-lg p-5">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-secondary text-secondary" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{review.body}</p>
              <p className="text-sm font-medium">{review.author}</p>
              <Link
                href={`/products/${review.product.slug}`}
                className="text-xs text-primary hover:underline mt-1 block line-clamp-1"
              >
                {review.product.title}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) {
    return <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>;
  }

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < Math.round(avg) ? "fill-secondary text-secondary" : "text-border"}`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {avg.toFixed(1)} ({reviews.length} reviews)
        </span>
      </div>
      <ul className="space-y-6">
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-border pb-6">
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "fill-secondary text-secondary" : "text-border"}`}
                />
              ))}
            </div>
            <p className="text-sm">{review.body}</p>
            <p className="text-sm font-medium mt-2">{review.author}</p>
            <time className="text-xs text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString("en-IN")}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
