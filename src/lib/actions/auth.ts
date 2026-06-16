"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  // Sync user to Prisma
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await prisma.user.upsert({
      where: { email: user.email! },
      create: { id: user.id, email: user.email! },
      update: {},
    });
  }

  redirect("/account/orders");
}

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return { error: error.message };

  if (data.user) {
    await prisma.user.upsert({
      where: { email },
      create: { id: data.user.id, email, name },
      update: { name },
    });
  }

  return { success: true, message: "Check your email to confirm your account." };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getOrdersForUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  return prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAddressesForUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
  if (!dbUser) return [];

  return prisma.address.findMany({ where: { userId: dbUser.id } });
}

export async function saveAddressAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const dbUser = await prisma.user.upsert({
    where: { email: user.email! },
    create: { id: user.id, email: user.email! },
    update: {},
  });

  await prisma.address.create({
    data: {
      userId: dbUser.id,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      line1: formData.get("line1") as string,
      line2: (formData.get("line2") as string) || undefined,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      pincode: formData.get("pincode") as string,
    },
  });

  return { success: true };
}
