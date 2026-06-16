import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

type Props = { searchParams: Promise<{ orderId?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams;
  const order = orderId
    ? await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } })
    : null;

  return (
    <div className="container section-padding text-center max-w-lg mx-auto">
      <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
      <h1 className="font-heading text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-muted-foreground mb-6">
        Your order has been placed successfully. We&apos;ll send you a confirmation email shortly.
      </p>
      {order && (
        <div className="bg-muted rounded-xl p-6 mb-8 text-left">
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="font-mono text-sm mb-4">{order.id}</p>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="font-bold text-lg">{formatPrice(order.total)}</p>
        </div>
      )}
      <Button asChild>
        <Link href="/collections/all">Continue Shopping</Link>
      </Button>
    </div>
  );
}
