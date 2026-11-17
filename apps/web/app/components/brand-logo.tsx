import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({
  href = "/",
  tone = "ocean",
  className,
}: {
  href?: string;
  tone?: "ocean" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "font-heading text-2xl tracking-tight transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        tone === "light" ? "text-white" : "text-ocean",
        className
      )}
    >
      Zanzibar App
    </Link>
  );
}
