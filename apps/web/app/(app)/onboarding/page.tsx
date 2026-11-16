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

export default async function OnboardingPage() {
  const user = await ensureAppUser();

  if (user.accountType) {
    redirect("/profile");
  }

  return (
    <main className="flex min-h-dvh flex-col bg-black text-blush">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16 sm:px-10">
        <p className="font-display text-sm font-semibold tracking-[0.2em] text-stage uppercase">
          Zauti
        </p>
        <h1 className="mt-4 font-display text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
          How will you use Zauti?
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          Pick the account that fits you. You can finish your profile next.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <form action={chooseArtist} className="flex-1">
            <button
              type="submit"
              className="flex h-full w-full flex-col items-start gap-2 border border-blush/15 bg-blush/[0.03] px-6 py-7 text-left transition-colors hover:border-stage/60 hover:bg-stage/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stage"
            >
              <span className="font-display text-xl font-semibold tracking-[-0.02em]">
                I&apos;m an artist
              </span>
              <span className="text-sm leading-relaxed text-muted">
                DJs, bands, and performers ready to get booked.
              </span>
            </button>
          </form>

          <form action={chooseVenue} className="flex-1">
            <button
              type="submit"
              className="flex h-full w-full flex-col items-start gap-2 border border-blush/15 bg-blush/[0.03] px-6 py-7 text-left transition-colors hover:border-stage/60 hover:bg-stage/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stage"
            >
              <span className="font-display text-xl font-semibold tracking-[-0.02em]">
                I&apos;m a venue
              </span>
              <span className="text-sm leading-relaxed text-muted">
                Hotels and event teams looking for live talent.
              </span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
