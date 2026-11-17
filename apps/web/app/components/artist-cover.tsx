import { cn } from "@/lib/utils";

function hashSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

const GRADIENTS = [
  ["#173f3d", "#e97b5d"],
  ["#1f4f4c", "#e7be7b"],
  ["#252a29", "#e97b5d"],
  ["#173f3d", "#8a9a6a"],
  ["#2a4f4c", "#e97b5d"],
] as const;

export function ArtistCover({
  id,
  name,
  src,
  className,
  size = "card",
}: {
  id: string;
  name: string;
  src?: string | null;
  className?: string;
  size?: "card" | "hero";
}) {
  const seed = hashSeed(id || name);
  const [from, to] = GRADIENTS[seed % GRADIENTS.length];
  const initials = initialsFromName(name);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        size === "card" ? "aspect-[4/5] w-full" : "aspect-[4/5] w-full max-w-sm",
        className
      )}
      data-slot="artist-cover"
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote URLs TBD
        <img src={src} alt="" className="size-full object-cover" />
      ) : (
        <div
          className="flex size-full items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(145deg, ${from}, ${to})`,
          }}
          aria-hidden
        >
          <span
            className={cn(
              "font-heading tracking-tight text-white/90 select-none",
              size === "hero" ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl"
            )}
          >
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
