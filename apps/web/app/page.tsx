import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-2xl items-center justify-end px-6 pt-6 sm:px-8">
        <Suspense>
          <Show when="signed-out">
            <div className="flex items-center gap-3">
              <SignInButton mode="modal" forceRedirectUrl="/profile">
                <Button variant="ghost" size="lg">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal" forceRedirectUrl="/profile">
                <Button size="lg">Sign up</Button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="lg" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
              <UserButton />
            </div>
          </Show>
        </Suspense>
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-16 sm:px-8">
        <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Zauti
        </p>

        <div className="mt-6 flex max-w-lg flex-col gap-4">
          <h1 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            Book DJs, bands, and artists for hotels and events.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Venues and organizers discover live talent, request dates, and
            confirm bookings — without the endless back-and-forth.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Suspense>
            <Show when="signed-out">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <SignUpButton mode="modal" forceRedirectUrl="/profile">
                  <Button size="lg">Sign up</Button>
                </SignUpButton>
                <SignInButton mode="modal" forceRedirectUrl="/profile">
                  <Button variant="ghost" size="lg">
                    Sign in
                  </Button>
                </SignInButton>
              </div>
            </Show>
            <Show when="signed-in">
              <Button size="lg" asChild>
                <Link href="/profile">Go to profile</Link>
              </Button>
            </Show>
          </Suspense>
        </div>
      </div>
    </main>
  );
}
