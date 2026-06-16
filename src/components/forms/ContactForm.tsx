"use client";

import { useState } from "react";
import { submitContactAction } from "@/lib/actions/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const queryTypes = [
  "Export",
  "White Label/Contract Manufacturer",
  "B2B & Bulk",
  "Super stockist / Distributor",
  "Retail",
  "Ecommerce",
  "Gifting",
  "Other",
];

type ContactFormProps = {
  source?: string;
  showQueryType?: boolean;
};

export function ContactForm({ source = "contact", showQueryType = false }: ContactFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const result = await submitContactAction({
      name: form.get("name") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      company: (form.get("company") as string) || undefined,
      location: (form.get("location") as string) || undefined,
      queryType: (form.get("queryType") as string) || undefined,
      message: (form.get("message") as string) || undefined,
      source,
    });
    setLoading(false);
    if (result.error) toast.error(result.error);
    else {
      toast.success("Thank you! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input id="phone" name="phone" type="tel" required />
      </div>
      <div>
        <Label htmlFor="company">Company&apos;s Name (Optional)</Label>
        <Input id="company" name="company" />
      </div>
      <div>
        <Label htmlFor="location">Location (Optional)</Label>
        <Input id="location" name="location" />
      </div>
      {showQueryType && (
        <div>
          <Label htmlFor="queryType">Query Type *</Label>
          <select
            id="queryType"
            name="queryType"
            required
            className="flex h-11 w-full rounded-md border border-border bg-card px-3 text-sm"
          >
            <option value="">Select...</option>
            {queryTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea id="message" name="message" rows={4} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}
