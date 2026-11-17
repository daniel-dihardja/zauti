import { redirect } from "next/navigation";
import { ensureAppUser, completeOnboarding } from "../../../lib/users";

async function chooseArtist() {
  "use server";
  await completeOnboarding("artist");
}

async function chooseVenue() {
  "use server";
  await completeOnboarding("venue");
}

const choiceClassName =
  "flex h-full w-full flex-col items-start gap-2 rounded-xl border border-border bg-card px-6 py-7 text-left text-card-foreground shadow-none ring-1 ring-foreground/10 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default async function OnboardingPage() {
  const user = await ensureAppUser();

  if (user.accountType) {
    redirect("/profile");
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-12 sm:px-8">
      <p className="text-sm font-medium text-muted-foreground">Step 1 of 2</p>
      <h1 className="mt-3 font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
        How will you use Zauti?
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
        Pick the account that fits you in Zanzibar. You can finish your profile
        next.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <form action={chooseArtist} className="flex-1">
          <button type="submit" className={choiceClassName}>
            <span className="text-xl font-semibold tracking-tight">
              I&apos;m an artist
            </span>
            <span className="text-base leading-relaxed text-muted-foreground">
              DJs, bands, and performers ready to get booked.
            </span>
          </button>
        </form>

        <form action={chooseVenue} className="flex-1">
          <button type="submit" className={choiceClassName}>
            <span className="text-xl font-semibold tracking-tight">
              I&apos;m a venue
            </span>
            <span className="text-base leading-relaxed text-muted-foreground">
              Hotels and event teams looking for live talent.
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
