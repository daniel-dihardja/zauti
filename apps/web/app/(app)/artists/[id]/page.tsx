import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDiscoverableArtistById } from "../../../../lib/artists";
import { requireOnboardedUser } from "../../../../lib/require-onboarded";

const ACT_TYPE_LABELS: Record<string, string> = {
  dj: "DJ",
  band: "Band",
  solo: "Solo artist",
  ensemble: "Ensemble",
};

function locationLine(city: string | null, country: string | null): string | null {
  const parts = [city, country].filter(
    (value): value is string => Boolean(value && value.trim())
  );
  return parts.length > 0 ? parts.join(", ") : null;
}

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireOnboardedUser();

  const { id } = await params;
  const artist = await getDiscoverableArtistById(id);

  if (!artist) {
    notFound();
  }

  const actLabel = artist.actType
    ? (ACT_TYPE_LABELS[artist.actType] ?? artist.actType)
    : null;
  const location = locationLine(artist.city, artist.country);
  const bio = artist.bio?.trim() || null;
  const genres = artist.genres?.trim() || null;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2.5">
          <Link href="/artists">Back to artists</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {artist.stageName}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {actLabel ? <Badge variant="secondary">{actLabel}</Badge> : null}
          {location ? (
            <span className="text-base text-muted-foreground">{location}</span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-muted-foreground">Genres</p>
          <p className="text-base text-foreground">
            {genres ?? (
              <span className="text-muted-foreground">No genres listed</span>
            )}
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-muted-foreground">Bio</p>
          <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
            {bio ?? (
              <span className="text-muted-foreground">No bio yet</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
