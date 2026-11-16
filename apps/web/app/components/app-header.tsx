import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

export function AppHeader({
  showArtistsNav = false,
}: {
  showArtistsNav?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Zauti
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-3 text-sm">
            {showArtistsNav ? (
              <Link
                href="/artists"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Artists
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
