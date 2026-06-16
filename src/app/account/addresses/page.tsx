import { redirect } from "next/navigation";
import Link from "next/link";
import { getAddressesForUser } from "@/lib/actions/auth";
import { getUser } from "@/lib/supabase/server";
import { AddressManager } from "@/components/account/AddressManager";

export const metadata = { title: "Addresses" };

export default async function AddressesPage() {
  const user = await getUser();
  if (!user) redirect("/account/login");

  const addresses = await getAddressesForUser();

  return (
    <div className="container section-padding">
      <Link href="/account/orders" className="text-sm text-primary hover:underline mb-4 inline-block">
        ← Back to orders
      </Link>
      <AddressManager addresses={addresses} />
    </div>
  );
}
