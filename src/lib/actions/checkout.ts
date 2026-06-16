"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { calculateShipping } from "@/lib/shipping";
import { getUser } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().optional(),
  location: z.string().optional(),
  queryType: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default("contact"),
});

export async function submitContactAction(data: z.infer<typeof contactSchema>) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) return { error: "Please fill in all required fields" };

  await prisma.contactInquiry.create({ data: parsed.data });
  return { success: true };
}

const checkoutSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  name: z.string().min(2),
  line1: z.string().min(5),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(6),
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().nullable(),
    title: z.string(),
    price: z.number(),
    quantity: z.number(),
  })),
  note: z.string().optional(),
  discountCode: z.string().optional(),
  discountAmount: z.number().default(0),
  isGifting: z.boolean().default(false),
});

export async function createOrderAction(data: z.infer<typeof checkoutSchema>) {
  const parsed = checkoutSchema.safeParse(data);
  if (!parsed.success) return { error: "Invalid checkout data" };

  const { items, discountAmount, isGifting, ...rest } = parsed.data;
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = calculateShipping(subtotal, isGifting);
  const total = subtotal - discountAmount + shipping;

  const authUser = await getUser();
  let userId: string | undefined;
  if (authUser?.email) {
    const user = await prisma.user.upsert({
      where: { email: authUser.email },
      create: { id: authUser.id, email: authUser.email },
      update: {},
    });
    userId = user.id;
  }

  const order = await prisma.order.create({
    data: {
      userId,
      email: rest.email,
      phone: rest.phone,
      subtotal,
      discount: discountAmount,
      shipping,
      total,
      discountCode: rest.discountCode,
      orderNote: rest.note,
      shippingAddress: {
        name: rest.name,
        line1: rest.line1,
        line2: rest.line2,
        city: rest.city,
        state: rest.state,
        pincode: rest.pincode,
      },
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          priceAtPurchase: item.price,
          title: item.title,
        })),
      },
    },
  });

  return { orderId: order.id, total, subtotal, shipping };
}

export async function createRazorpayOrderAction(orderId: string, amount: number) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId.startsWith("rzp_test_xxx")) {
    // Stub mode for development without Razorpay keys
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "PAID", razorpayOrderId: `stub_${orderId}` },
    });
    return { stub: true, orderId };
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt: orderId,
    }),
  });

  if (!response.ok) return { error: "Failed to create payment order" };

  const razorpayOrder = await response.json();
  await prisma.order.update({
    where: { id: orderId },
    data: { razorpayOrderId: razorpayOrder.id },
  });

  return { razorpayOrderId: razorpayOrder.id, keyId };
}
