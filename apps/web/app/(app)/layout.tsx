import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AppHeader } from "../components/app-header";
import { ensureAppUser } from "../../lib/users";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  await ensureAppUser();

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <AppHeader />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
