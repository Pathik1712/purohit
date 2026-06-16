import { ProductCard } from "./ProductCard";

type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  images: string[];
  variants: { id: string; soldOut: boolean }[];
};

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <p className="text-center text-muted-foreground py-12">No products found.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
