import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { getProductBySlug, getProducts } from "@/lib/db/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.title,
    description: product.description ?? undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const collectionSlug = product.collections[0]?.collection.slug;
  const related = collectionSlug
    ? (await getProducts({ collectionSlug, limit: 5 })).filter((p) => p.id !== product.id).slice(0, 4)
    : [];

  return <ProductDetail product={product} related={related} />;
}
