import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret || secret === "your-secret") {
    return NextResponse.json({ status: "stub" });
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (expected !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);
  if (event.event === "payment.captured") {
    const { order_id, id: paymentId } = event.payload.payment.entity;
    await prisma.order.updateMany({
      where: { razorpayOrderId: order_id },
      data: { status: "PAID", razorpayPaymentId: paymentId },
    });
  }

  return NextResponse.json({ status: "ok" });
}
