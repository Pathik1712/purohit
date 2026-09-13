import { ProductCard } from "./ProductCard";

type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  images: string[];
  variants: {
    id: string;
    soldOut: boolean;
  }[];
};

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="font-heading text-lg text-neutral-500">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-x-4
        gap-y-14
        sm:grid-cols-2
        lg:grid-cols-3
        xl:gap-x-6
        xl:gap-y-16
      "
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
}