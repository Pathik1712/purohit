import type { Metadata } from "next";
import Link from "next/link";
import { getCollections } from "@/lib/db/collections";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse our collections of roasted millet snacks, namkeen, quinoa snacks and healthy sweets.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="container section-padding">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Collections</h1>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Explore our range of healthy roasted snacks, from millet namkeen to no-added-sugar sweets.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.slug}`}
            className="group block bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <h2 className="font-heading text-xl font-semibold group-hover:text-primary transition-colors">
              {collection.title}
            </h2>
            {collection.description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{collection.description}</p>
            )}
            <p className="text-xs text-muted-foreground mt-4">
              {collection._count.products} products
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
