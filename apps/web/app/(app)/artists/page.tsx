import { Music2Icon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  listDiscoverableArtists,
  parseArtistListFilters,
} from "../../../lib/artists";
import { DEFAULT_CITY } from "../../../lib/location";
import { requireOnboardedUser } from "../../../lib/require-onboarded";

const ACT_TYPE_OPTIONS = [
  { value: "dj", label: "DJ" },
  { value: "band", label: "Band" },
  { value: "solo", label: "Solo artist" },
  { value: "ensemble", label: "Ensemble" },
] as const;

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

export default async function ArtistsPage({
  searchParams,
}: {
  searchParams: Promise<{ actType?: string; city?: string }>;
}) {
  await requireOnboardedUser();

  const params = await searchParams;
  const filters = parseArtistListFilters(params);
  const artists = await listDiscoverableArtists(filters);
  const hasFilters = Boolean(filters.actType || filters.city);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Artists
        </h1>
        <p className="max-w-md text-base text-muted-foreground">
          Browse live talent by act type and city. Open a profile to learn more.
        </p>
      </div>

      <Card size="sm">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Narrow the directory by act type or city.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="get">
            <FieldGroup className="gap-4 sm:grid sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <Field>
                <FieldLabel htmlFor="actType">Act type</FieldLabel>
                <NativeSelect
                  id="actType"
                  name="actType"
                  defaultValue={filters.actType ?? ""}
                  className="w-full"
                >
                  <NativeSelectOption value="">Any</NativeSelectOption>
                  {ACT_TYPE_OPTIONS.map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel htmlFor="city">City</FieldLabel>
                <Input
                  id="city"
                  name="city"
                  defaultValue={filters.city ?? ""}
                  placeholder={`e.g. ${DEFAULT_CITY}`}
                />
              </Field>
              <Field>
                <FieldLabel className="sr-only">Actions</FieldLabel>
                <div className="flex items-center gap-2">
                  <Button type="submit">Filter</Button>
                  {hasFilters ? (
                    <Button variant="ghost" asChild>
                      <Link href="/artists">Clear</Link>
                    </Button>
                  ) : null}
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {artists.length === 0 ? (
        <Empty className="border border-dashed border-border py-12">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Music2Icon />
            </EmptyMedia>
            <EmptyTitle>
              {hasFilters ? "No matching artists" : "No artists yet"}
            </EmptyTitle>
            <EmptyDescription>
              {hasFilters
                ? "Try a different city or act type."
                : "When artists add a stage name, they’ll show up here."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {artists.length} {artists.length === 1 ? "artist" : "artists"}
            {hasFilters ? " match your filters" : ""}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => {
              const location = locationLine(artist.city, artist.country);
              const actLabel = artist.actType
                ? (ACT_TYPE_LABELS[artist.actType] ?? artist.actType)
                : null;
              const genres = artist.genres?.trim() || null;

              return (
                <Card key={artist.id} className="h-full">
                  <CardHeader>
                    <CardTitle className="truncate">
                      {artist.stageName}
                    </CardTitle>
                    <CardDescription>
                      {location ?? "Location not set"}
                    </CardDescription>
                    {actLabel ? (
                      <CardAction>
                        <Badge variant="secondary">{actLabel}</Badge>
                      </CardAction>
                    ) : null}
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {genres ?? "No genres listed"}
                    </p>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/artists/${artist.id}`}>View profile</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
