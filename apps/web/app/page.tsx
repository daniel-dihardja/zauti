import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col bg-black text-blush">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-end px-6 pt-6 sm:px-10">
        <Suspense>
          <Show when="signed-out">
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="text-sm font-medium text-muted transition-colors hover:text-blush focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stage"
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center bg-stage px-5 text-sm font-semibold tracking-wide text-night transition-colors hover:bg-stage-deep hover:text-blush focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stage"
                >
                  Sign up
                </button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </Suspense>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16 sm:px-10">
        <p className="animate-brand-rise font-display text-[clamp(3.75rem,18vw,8rem)] font-extrabold leading-[0.85] tracking-[-0.05em] text-blush">
          Zauti
        </p>

        <div className="animate-copy-rise mt-7 max-w-lg space-y-4 sm:mt-9">
          <h1 className="font-display text-[clamp(1.65rem,5.5vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-blush">
            Book DJs, bands, and artists for hotels and events.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Venues and organizers discover live talent, request dates, and
            confirm bookings — without the endless back-and-forth.
          </p>
        </div>

        <div className="animate-cta-rise mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:items-center">
          <a
            href="mailto:hello@zauti.app?subject=Early%20access"
            className="inline-flex h-12 items-center justify-center bg-stage px-7 text-sm font-semibold tracking-wide text-night transition-colors hover:bg-stage-deep hover:text-blush focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stage"
          >
            Get early access
          </a>
          <span className="text-sm text-muted sm:ml-1">
            For hotels, event teams, and artists.
          </span>
        </div>
      </div>
    </main>
  );
}
