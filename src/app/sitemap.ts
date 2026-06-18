import type { MetadataRoute } from "next";
import { isDatabaseConfigured } from "@/lib/env";
import { mockGetCollections, mockGetProducts } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const [products, collections] = isDatabaseConfigured()
    ? await Promise.all([
        prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
        prisma.collection.findMany({ select: { slug: true } }),
      ])
    : [
        mockGetProducts().map((p) => ({ slug: p.slug, updatedAt: p.updatedAt })),
        mockGetCollections().map((c) => ({ slug: c.slug })),
      ];

  const staticPages = ["", "/about", "/corporate-gifting", "/export", "/collections", "/collections/all"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const productPages = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const collectionPages = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...collectionPages];
}
