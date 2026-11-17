import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";
import { BrandLogo } from "../../components/brand-logo";

export default function SignUpPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-foreground">
      <BrandLogo className="mb-8" />
      <Suspense>
        <SignUp forceRedirectUrl="/profile" />
      </Suspense>
    </main>
  );
}
