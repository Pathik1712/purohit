"use server";

import { prisma } from "@/lib/prisma";

export async function applyDiscountAction(code: string, subtotal: number) {
  if (!code.trim()) return { error: "Please enter a discount code" };

  const discount = await prisma.discountCode.findUnique({
    where: { code: code.toUpperCase() },
  });

  if (!discount || !discount.active) {
    return { error: "Invalid discount code" };
  }

  if (subtotal < discount.minOrder) {
    return { error: `Minimum order of Rs. ${discount.minOrder / 100} required` };
  }

  let discountAmount = 0;
  if (discount.type === "PERCENT") {
    discountAmount = Math.round(subtotal * (discount.value / 100));
  } else {
    discountAmount = discount.value;
  }

  return { discountAmount, code: discount.code };
}
