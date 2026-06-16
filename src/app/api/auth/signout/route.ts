import { signOutAction } from "@/lib/actions/auth";

export async function POST() {
  await signOutAction();
}
