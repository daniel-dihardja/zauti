"use server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import {
  db,
  users,
  type AccountType,
  type User,
} from "@zauti/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

function displayName(clerkUser: {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  primaryEmailAddress?: { emailAddress: string } | null;
  emailAddresses: { emailAddress: string }[];
}): string {
  const fromNames = [clerkUser.firstName, clerkUser.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (fromNames) return fromNames;
  if (clerkUser.username) return clerkUser.username;
  return (
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress ??
    "User"
  );
}

export async function getAppUser(): Promise<User | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  return user ?? null;
}

export async function ensureAppUser(): Promise<User> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const existing = await getAppUser();
  if (existing) {
    return existing;
  }

  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("Clerk user has no email address");
  }

  const [user] = await db
    .insert(users)
    .values({
      clerkId: userId,
      email,
      name: displayName(clerkUser),
    })
    .onConflictDoUpdate({
      target: users.clerkId,
      set: {
        email,
        name: displayName(clerkUser),
      },
    })
    .returning();

  if (!user) {
    throw new Error("Failed to ensure app user");
  }

  return user;
}

export async function completeOnboarding(
  accountType: AccountType
): Promise<void> {
  if (accountType !== "artist" && accountType !== "venue") {
    throw new Error("Invalid account type");
  }

  const user = await ensureAppUser();

  if (user.accountType) {
    redirect("/profile");
  }

  const [updated] = await db
    .update(users)
    .set({ accountType })
    .where(eq(users.clerkId, user.clerkId))
    .returning();

  if (!updated) {
    throw new Error("Failed to complete onboarding");
  }

  const client = await clerkClient();
  await client.users.updateUserMetadata(user.clerkId, {
    publicMetadata: { accountType },
  });

  redirect("/profile");
}
