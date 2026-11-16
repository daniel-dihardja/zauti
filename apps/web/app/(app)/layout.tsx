import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { ensureAppUser } from "../../lib/users";

/** Auth + DB gate must run before paint; opt out of instant navigation validation. */
export const instant = false;

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  await ensureAppUser();

  return children;
}
