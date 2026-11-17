import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

export function AppHeader({
  showArtistsNav = false,
}: {
  showArtistsNav?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="font-heading text-2xl tracking-tight text-ocean transition-colors hover:text-ocean/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Zauti
        </Link>
        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-5 text-sm sm:flex">
            {showArtistsNav ? (
              <Link
                href="/artists"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Find Artists
              </Link>
            ) : null}
            <Link
              href="/profile"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Profile
            </Link>
          </nav>
          <Suspense>
            <UserButton />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
