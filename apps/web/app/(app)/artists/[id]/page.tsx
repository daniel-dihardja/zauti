import { ArrowRightIcon, MapPinIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArtistCover } from "../../../components/artist-cover";
import { getDiscoverableArtistById } from "../../../../lib/artists";
import { requireOnboardedUser } from "../../../../lib/require-onboarded";

const ACT_TYPE_LABELS: Record<string, string> = {
  dj: "DJ",
  band: "Live Band",
  solo: "Solo artist",
  ensemble: "Ensemble",
};

function locationLine(city: string | null, country: string | null): string | null {
  const parts = [city, country].filter(
    (value): value is string => Boolean(value && value.trim())
  );
  return parts.length > 0 ? parts.join(", ") : null;
}

function genreList(genres: string | null): string[] {
  if (!genres?.trim()) return [];
  return genres
    .split(/[,/|]/)
    .map((g) => g.trim())
    .filter(Boolean);
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

  const stageName = artist.stageName ?? "Artist";
  const actLabel = artist.actType
    ? (ACT_TYPE_LABELS[artist.actType] ?? artist.actType)
    : null;
  const location = locationLine(artist.city, artist.country);
  const bio = artist.bio?.trim() || null;
  const genres = genreList(artist.genres);
  const verified = Boolean(
    artist.bio?.trim() && artist.city?.trim() && artist.stageName?.trim()
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-2.5">
          <Link href="/artists">Back to artists</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="relative w-full shrink-0 lg:w-80">
          <ArtistCover
            id={artist.id}
            name={stageName}
            size="hero"
            className="w-full rounded-2xl"
          />
          {verified ? (
            <Badge className="absolute top-3 left-3 border-0 bg-chart-5 text-white">
              Verified
            </Badge>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {actLabel ? <Badge variant="outline">{actLabel}</Badge> : null}
              {genres.slice(0, 3).map((genre) => (
                <Badge key={genre} variant="secondary" className="font-normal">
                  {genre}
                </Badge>
              ))}
            </div>
            <h1 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
              {stageName}
            </h1>
            {location ? (
              <p className="flex items-center gap-1.5 text-base text-muted-foreground">
                <MapPinIcon className="size-4 shrink-0" />
                {location}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-muted-foreground">Ask for rate</span>
              <span className="inline-flex items-center gap-1">
                <StarIcon className="size-3.5 fill-sand text-sand" />
                <span className="text-muted-foreground">New</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-muted-foreground">Bio</p>
            <p className="text-base leading-relaxed whitespace-pre-wrap text-foreground">
              {bio ?? (
                <span className="text-muted-foreground">No bio yet</span>
              )}
            </p>
          </div>

          <Button size="lg" className="w-full sm:w-auto" disabled>
            Request booking
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <p className="text-sm text-muted-foreground">
            Booking requests open soon.
          </p>
        </div>
      </div>
    </div>
  );
}
