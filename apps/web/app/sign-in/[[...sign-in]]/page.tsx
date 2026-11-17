import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-foreground">
      <Link
        href="/"
        className="mb-8 font-heading text-2xl tracking-tight text-ocean transition-colors hover:text-primary"
      >
        Zauti
      </Link>
      <Suspense>
        <SignIn forceRedirectUrl="/profile" />
      </Suspense>
    </main>
  );
}
