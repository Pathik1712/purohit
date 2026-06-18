import { cache } from "react";
import { isDatabaseConfigured } from "@/lib/env";
import {
  mockGetFeaturedReviews,
  mockGetProductBySlug,
  mockGetProducts,
  mockSearchProducts,
} from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";

export const getProducts = cache(async (options?: {
  featured?: boolean;
  collectionSlug?: string;
  limit?: number;
  offset?: number;
}) => {
  if (!isDatabaseConfigured()) {
    return mockGetProducts(options);
  }

  const { featured, collectionSlug, limit, offset } = options ?? {};

  return prisma.product.findMany({
    where: {
      ...(featured ? { featured: true } : {}),
      ...(collectionSlug
        ? { collections: { some: { collection: { slug: collectionSlug } } } }
        : {}),
    },
    include: {
      variants: true,
      collections: { include: { collection: true } },
      reviews: { take: 3, orderBy: { createdAt: "desc" } },
    },
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: limit } : {}),
    ...(offset ? { skip: offset } : {}),
  });
});

export const getProductBySlug = cache(async (slug: string) => {
  if (!isDatabaseConfigured()) {
    return mockGetProductBySlug(slug);
  }

  return prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,
      collections: { include: { collection: true } },
      reviews: { orderBy: { createdAt: "desc" } },
    },
  });
});

export const getFeaturedReviews = cache(async (limit = 8) => {
  if (!isDatabaseConfigured()) {
    return mockGetFeaturedReviews(limit);
  }

  return prisma.review.findMany({
    include: { product: { select: { title: true, slug: true } } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
});

export const searchProducts = cache(async (query: string) => {
  if (!isDatabaseConfigured()) {
    return mockSearchProducts(query);
  }

  if (!query.trim()) return [];
  return prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { tags: { has: query.toLowerCase() } },
      ],
    },
    include: { variants: true },
    take: 20,
  });
});
