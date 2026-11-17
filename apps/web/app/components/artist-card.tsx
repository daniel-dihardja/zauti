import { ArrowRightIcon, HeartIcon, MapPinIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArtistCover } from "./artist-cover";

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

function primaryGenre(genres: string | null): string | null {
  if (!genres?.trim()) return null;
  return genres.split(/[,/|]/)[0]?.trim() || null;
}

export function ArtistCard({
  artist,
}: {
  artist: {
    id: string;
    stageName: string | null;
    actType: string | null;
    genres: string | null;
    city: string | null;
    country: string | null;
    bio?: string | null;
  };
}) {
  const stageName = artist.stageName ?? "Artist";
  const location = locationLine(artist.city, artist.country);
  const actLabel = artist.actType
    ? (ACT_TYPE_LABELS[artist.actType] ?? artist.actType)
    : null;
  const genre = primaryGenre(artist.genres);
  const verified = Boolean(
    artist.bio?.trim() && artist.city?.trim() && artist.stageName?.trim()
  );

  return (
    <Card className="overflow-hidden rounded-2xl py-0 ring-foreground/10">
      <div className="relative">
        <Link
          href={`/artists/${artist.id}`}
          className="block outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArtistCover id={artist.id} name={stageName} />
        </Link>
        <span
          className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm"
          aria-hidden
        >
          <HeartIcon className="size-4" />
        </span>
        {verified ? (
          <Badge className="absolute top-3 left-3 border-0 bg-chart-5 text-white">
            Verified
          </Badge>
        ) : actLabel ? (
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-card/90 text-foreground"
          >
            {actLabel}
          </Badge>
        ) : null}
      </div>

      <CardHeader className="gap-1.5 pt-4">
        <CardTitle className="font-heading text-xl font-normal leading-snug">
          <Link
            href={`/artists/${artist.id}`}
            className="hover:text-primary"
          >
            {stageName}
          </Link>
        </CardTitle>
        {genre ? (
          <p className="text-sm text-muted-foreground">{genre}</p>
        ) : null}
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pb-3">
        {location ? (
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPinIcon className="size-3.5 shrink-0" />
            {location}
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground">Ask for rate</span>
          <span className="inline-flex items-center gap-1 text-foreground">
            <StarIcon className="size-3.5 fill-sand text-sand" />
            <span className="text-muted-foreground">New</span>
          </span>
        </div>
      </CardContent>

      <CardFooter className="border-t-0 bg-transparent pt-0 pb-4">
        <Button size="lg" className="w-full" asChild>
          <Link href={`/artists/${artist.id}`}>
            View Profile & Book
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
