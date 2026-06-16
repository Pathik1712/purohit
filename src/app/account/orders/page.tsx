import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrdersForUser } from "@/lib/actions/auth";
import { formatPrice } from "@/lib/utils";
import { getUser } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export const metadata = { title: "My Orders" };

export default async function OrdersPage() {
  const user = await getUser();
  if (!user) redirect("/account/login");

  const orders = await getOrdersForUser();

  return (
    <div className="container section-padding">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-bold">My Orders</h1>
        <div className="flex gap-4">
          <Link href="/account/addresses" className="text-sm text-primary hover:underline">Addresses</Link>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="text-sm text-muted-foreground hover:underline">Sign out</button>
          </form>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No orders yet.</p>
          <Button asChild><Link href="/collections/all">Start Shopping</Link></Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-border rounded-xl p-6">
              <div className="flex flex-wrap justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order #{order.id.slice(-8)}</p>
                  <p className="text-sm">{new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatPrice(order.total)}</p>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">{order.status.toLowerCase()}</span>
                </div>
              </div>
              <ul className="text-sm space-y-1">
                {order.items.map((item) => (
                  <li key={item.id} className="text-muted-foreground">
                    {item.title} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
