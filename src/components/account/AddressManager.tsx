"use client";

import { useState } from "react";
import { saveAddressAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Address = {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
};

export function AddressManager({ addresses }: { addresses: Address[] }) {
  const [showForm, setShowForm] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await saveAddressAction(formData);
    if (result.error) toast.error(result.error);
    else {
      toast.success("Address saved!");
      setShowForm(false);
      window.location.reload();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-bold">Saved Addresses</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Address"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-border rounded-xl p-6 mb-8 space-y-4 max-w-lg">
          <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div>
          <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" required /></div>
          <div><Label htmlFor="line1">Address</Label><Input id="line1" name="line1" required /></div>
          <div><Label htmlFor="line2">Line 2</Label><Input id="line2" name="line2" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label htmlFor="city">City</Label><Input id="city" name="city" required /></div>
            <div><Label htmlFor="state">State</Label><Input id="state" name="state" required /></div>
          </div>
          <div><Label htmlFor="pincode">PIN Code</Label><Input id="pincode" name="pincode" required /></div>
          <Button type="submit">Save Address</Button>
        </form>
      )}

      {addresses.length === 0 ? (
        <p className="text-muted-foreground">No saved addresses yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-border rounded-xl p-5">
              <p className="font-medium">{addr.name}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />
                {addr.city}, {addr.state} {addr.pincode}<br />
                {addr.phone}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
