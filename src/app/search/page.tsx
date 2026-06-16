import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/ProductGrid";
import { searchProducts } from "@/lib/db/products";

type Props = { searchParams: Promise<{ q?: string }> };

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const products = q ? await searchProducts(q) : [];

  return (
    <div className="container section-padding">
      <h1 className="font-heading text-3xl font-bold mb-2">
        {q ? `Search results for "${q}"` : "Search"}
      </h1>
      <p className="text-muted-foreground mb-8">
        {q ? `${products.length} product${products.length !== 1 ? "s" : ""} found` : "Enter a search term above."}
      </p>
      {q && <ProductGrid products={products} />}
    </div>
  );
}
