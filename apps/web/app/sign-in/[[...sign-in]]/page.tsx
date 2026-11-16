import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-zinc-950 px-6 text-zinc-50">
      <Link
        href="/"
        className="mb-8 text-2xl font-semibold tracking-tight text-zinc-50 hover:text-white"
      >
        Zauti
      </Link>
      <Suspense>
        <SignIn forceRedirectUrl="/profile" />
      </Suspense>
    </main>
  );
}
