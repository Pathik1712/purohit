"use client";

import { useState } from "react";
import Link from "next/link";
import { signInAction, signUpAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    if (mode === "login") {
      const result = await signInAction(formData);
      if (result?.error) toast.error(result.error);
    } else {
      const result = await signUpAction(formData);
      if (result?.error) toast.error(result.error);
      else if (result?.success) toast.success(result.message);
    }
    setLoading(false);
  }

  return (
    <div className="container section-padding max-w-md mx-auto">
      <h1 className="font-heading text-3xl font-bold text-center mb-8">
        {mode === "login" ? "Sign In" : "Create Account"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required minLength={6} />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        {mode === "login" ? (
          <>Don&apos;t have an account?{" "}
            <button onClick={() => setMode("signup")} className="text-primary hover:underline">Sign up</button>
          </>
        ) : (
          <>Already have an account?{" "}
            <button onClick={() => setMode("login")} className="text-primary hover:underline">Sign in</button>
          </>
        )}
      </p>
      <p className="text-center mt-4">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">Back to shop</Link>
      </p>
    </div>
  );
}
