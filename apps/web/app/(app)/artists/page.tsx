import { Music2Icon } from "lucide-react";
import Link from "next/link";
import { ArtistCard } from "../../components/artist-card";
import { Button } from "@/components/ui/button";
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
  { value: "band", label: "Live Band" },
  { value: "solo", label: "Musician / Solo" },
  { value: "ensemble", label: "Ensemble / Traditional" },
] as const;

const GENRE_OPTIONS = [
  "Afro House",
  "Bongo Flava",
  "Jazz",
  "Taarab",
  "Acoustic",
  "Deep House",
] as const;

export default async function ArtistsPage({
  searchParams,
}: {
  searchParams: Promise<{
    actType?: string;
    city?: string;
    q?: string;
    genre?: string;
  }>;
}) {
  await requireOnboardedUser();

  const params = await searchParams;
  const filters = parseArtistListFilters(params);
  const genre = Array.isArray(params.genre)
    ? params.genre[0]?.trim() || null
    : params.genre?.trim() || null;

  const artists = await listDiscoverableArtists({
    ...filters,
    genre,
  });

  const hasFilters = Boolean(
    filters.actType || filters.city || filters.q || genre
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
          Find Artists
        </h1>
        <p className="max-w-md text-base text-muted-foreground">
          Browse live talent across Zanzibar by category, genre, and city.
        </p>
      </div>

      <form
        method="get"
        className="flex flex-col gap-2 rounded-[2rem] border border-border bg-card p-2 shadow-sm sm:flex-row sm:items-center sm:rounded-full"
      >
        {filters.actType ? (
          <input type="hidden" name="actType" value={filters.actType} />
        ) : null}
        {genre ? <input type="hidden" name="genre" value={genre} /> : null}
        <Input
          name="q"
          defaultValue={filters.q ?? ""}
          placeholder="Search artists…"
          className="h-10 flex-1 rounded-full border-0 bg-transparent px-4 shadow-none focus-visible:ring-0"
          aria-label="Search artists"
        />
        <NativeSelect
          name="city"
          defaultValue={filters.city ?? ""}
          className="w-full sm:w-48 [&_[data-slot=native-select]]:border-0 [&_[data-slot=native-select]]:focus-visible:ring-0"
        >
          <NativeSelectOption value="">Zanzibar (All Areas)</NativeSelectOption>
          <NativeSelectOption value={DEFAULT_CITY}>
            {DEFAULT_CITY}
          </NativeSelectOption>
          <NativeSelectOption value="Stone Town">Stone Town</NativeSelectOption>
          <NativeSelectOption value="Nungwi">Nungwi</NativeSelectOption>
        </NativeSelect>
        <NativeSelect
          name="date"
          defaultValue=""
          className="w-full sm:w-36 [&_[data-slot=native-select]]:border-0"
          disabled
        >
          <NativeSelectOption value="">Any date</NativeSelectOption>
        </NativeSelect>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Search
        </Button>
      </form>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-20 lg:w-64">
          <p className="text-sm font-semibold text-foreground">Filters</p>
          <form method="get" className="mt-4">
            {filters.q ? (
              <input type="hidden" name="q" value={filters.q} />
            ) : null}
            {filters.city ? (
              <input type="hidden" name="city" value={filters.city} />
            ) : null}
            <FieldGroup className="gap-6">
              <Field>
                <FieldLabel>Category</FieldLabel>
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="actType"
                      value=""
                      defaultChecked={!filters.actType}
                      className="accent-primary"
                    />
                    Any
                  </label>
                  {ACT_TYPE_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="radio"
                        name="actType"
                        value={option.value}
                        defaultChecked={filters.actType === option.value}
                        className="accent-primary"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </Field>

              <Field>
                <FieldLabel>Genre / Style</FieldLabel>
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="genre"
                      value=""
                      defaultChecked={!genre}
                      className="accent-primary"
                    />
                    Any
                  </label>
                  {GENRE_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="radio"
                        name="genre"
                        value={option}
                        defaultChecked={genre === option}
                        className="accent-primary"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="filter-city">Location</FieldLabel>
                <NativeSelect
                  id="filter-city"
                  name="city"
                  defaultValue={filters.city ?? ""}
                  className="w-full"
                >
                  <NativeSelectOption value="">All areas</NativeSelectOption>
                  <NativeSelectOption value={DEFAULT_CITY}>
                    {DEFAULT_CITY}
                  </NativeSelectOption>
                  <NativeSelectOption value="Stone Town">
                    Stone Town
                  </NativeSelectOption>
                  <NativeSelectOption value="Nungwi">Nungwi</NativeSelectOption>
                </NativeSelect>
              </Field>

              <div className="flex gap-2">
                <Button type="submit" size="sm" className="flex-1">
                  Apply
                </Button>
                {hasFilters ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/artists">Clear</Link>
                  </Button>
                ) : null}
              </div>
            </FieldGroup>
          </form>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {artists.length}{" "}
              {artists.length === 1 ? "artist" : "artists"} found
            </p>
            <NativeSelect defaultValue="recommended" className="w-44" disabled>
              <NativeSelectOption value="recommended">
                Sort: Recommended
              </NativeSelectOption>
            </NativeSelect>
          </div>

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
                    ? "Try a different search or category."
                    : "When artists add a stage name, they’ll show up here."}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
