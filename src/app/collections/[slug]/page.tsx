import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCollectionBySlug } from "@/lib/db/collections";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: collection.title,
    description: collection.description ?? undefined,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = collection.products.map((pc) => pc.product);

  return (
    <div className="container section-padding">
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">{collection.title}</h1>
      {collection.description && (
        <p className="text-muted-foreground mb-10 max-w-2xl">{collection.description}</p>
      )}
      <ProductGrid products={products} />
    </div>
  );
}
