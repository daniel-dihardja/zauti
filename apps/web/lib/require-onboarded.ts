import { redirect } from "next/navigation";
import { ensureAppUser } from "./users";

/** Signed-in user who finished artist/venue onboarding. */
export async function requireOnboardedUser() {
  const user = await ensureAppUser();

  if (!user.accountType) {
    redirect("/onboarding");
  }

  return user;
}
