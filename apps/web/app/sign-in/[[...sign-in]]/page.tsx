import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { BrandLogo } from "../../components/brand-logo";

export default function SignInPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-foreground">
      <BrandLogo className="mb-8" />
      <Suspense>
        <SignIn forceRedirectUrl="/profile" />
      </Suspense>
    </main>
  );
}
