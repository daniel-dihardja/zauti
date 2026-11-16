import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getArtistProfile } from "../../../lib/artist-profile";
import { ensureAppUser } from "../../../lib/users";
import { ArtistProfileForm } from "./artist-profile-form";

export default async function ProfilePage() {
  const user = await ensureAppUser();

  if (!user.accountType) {
    redirect("/onboarding");
  }

  const isArtist = user.accountType === "artist";
  const artistProfile = isArtist ? await getArtistProfile(user.id) : null;

  return (
    <main className="flex min-h-dvh flex-col bg-black text-blush">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 pt-6 sm:px-10">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-[-0.03em] text-blush transition-colors hover:text-stage"
        >
          Zauti
        </Link>
        <Suspense>
          <UserButton />
        </Suspense>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16 sm:px-10">
        <p className="text-sm font-medium tracking-wide text-stage uppercase">
          {isArtist ? "Artist profile" : "Venue profile"}
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
          {isArtist && artistProfile?.stageName
            ? artistProfile.stageName
            : user.name}
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          {isArtist
            ? "Add or update your details anytime. Venues use these to discover and book you."
            : "Your venue home on Zauti. Browse and book artists as discovery rolls out."}
        </p>

        <dl className="mt-10 space-y-5 border-t border-blush/10 pt-8">
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted uppercase">
              Email
            </dt>
            <dd className="mt-1 text-base text-blush">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted uppercase">
              Account type
            </dt>
            <dd className="mt-1 text-base capitalize text-blush">
              {user.accountType}
            </dd>
          </div>
        </dl>

        {isArtist ? <ArtistProfileForm profile={artistProfile} /> : null}
      </div>
    </main>
  );
}
