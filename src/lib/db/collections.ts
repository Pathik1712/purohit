import { cache } from "react";
import { isDatabaseConfigured } from "@/lib/env";
import {
  mockAnnouncements,
  mockGetCollectionBySlug,
  mockGetCollections,
  mockTestimonials,
} from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";

export const getCollections = cache(async () => {
  if (!isDatabaseConfigured()) {
    return mockGetCollections();
  }

  return prisma.collection.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
});

export const getCollectionBySlug = cache(async (slug: string) => {
  if (!isDatabaseConfigured()) {
    return mockGetCollectionBySlug(slug);
  }

  return prisma.collection.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          product: {
            include: { variants: true },
          },
        },
      },
    },
  });
});

export const getAnnouncements = cache(async () => {
  if (!isDatabaseConfigured()) {
    return mockAnnouncements;
  }

  return prisma.announcement.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
});

export const getTestimonials = cache(async () => {
  if (!isDatabaseConfigured()) {
    return mockTestimonials;
  }

  return prisma.testimonial.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
});
