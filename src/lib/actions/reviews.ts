"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const reviewSchema = z.object({
  productId: z.string(),
  author: z.string().min(2),
  rating: z.number().min(1).max(5),
  body: z.string().min(10),
});

export async function submitReviewAction(data: z.infer<typeof reviewSchema>) {
  const parsed = reviewSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid review data" };

  await prisma.review.create({ data: parsed.data });
  revalidatePath(`/products`);
  return { success: true };
}
