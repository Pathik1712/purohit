import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getCollections = cache(async () => {
  return prisma.collection.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
});

export const getCollectionBySlug = cache(async (slug: string) => {
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
  return prisma.announcement.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
});

export const getTestimonials = cache(async () => {
  return prisma.testimonial.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
});
