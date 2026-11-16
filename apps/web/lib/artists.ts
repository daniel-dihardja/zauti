import {
  artistProfiles,
  db,
  type ActType,
  type ArtistProfile,
} from "@zauti/db";
import { and, asc, eq, ilike, isNotNull, ne, sql, type SQL } from "drizzle-orm";

const ACT_TYPES: readonly ActType[] = ["dj", "band", "solo", "ensemble"];

export type DiscoverableArtistListItem = Pick<
  ArtistProfile,
  "id" | "stageName" | "actType" | "genres" | "city" | "country"
>;

export type ListDiscoverableArtistsInput = {
  actType?: ActType | null;
  city?: string | null;
  limit?: number;
  offset?: number;
};

const discoverableStageName = and(
  isNotNull(artistProfiles.stageName),
  ne(artistProfiles.stageName, ""),
  sql`trim(${artistProfiles.stageName}) <> ''`
);

function parseActTypeFilter(value: string | null | undefined): ActType | null {
  const actType = value?.trim() ?? "";
  if (!actType) return null;
  if (!ACT_TYPES.includes(actType as ActType)) return null;
  return actType as ActType;
}

export function parseArtistListFilters(searchParams: {
  actType?: string | string[];
  city?: string | string[];
}): { actType: ActType | null; city: string | null } {
  const actTypeRaw = Array.isArray(searchParams.actType)
    ? searchParams.actType[0]
    : searchParams.actType;
  const cityRaw = Array.isArray(searchParams.city)
    ? searchParams.city[0]
    : searchParams.city;
  const city = cityRaw?.trim() || null;

  return {
    actType: parseActTypeFilter(actTypeRaw),
    city,
  };
}

export async function listDiscoverableArtists(
  input: ListDiscoverableArtistsInput = {}
): Promise<DiscoverableArtistListItem[]> {
  const limit = Math.min(Math.max(input.limit ?? 50, 1), 50);
  const offset = Math.max(input.offset ?? 0, 0);
  const conditions: SQL[] = [discoverableStageName as SQL];

  if (input.actType) {
    conditions.push(eq(artistProfiles.actType, input.actType));
  }

  const city = input.city?.trim();
  if (city) {
    conditions.push(ilike(artistProfiles.city, `%${city}%`));
  }

  return db
    .select({
      id: artistProfiles.id,
      stageName: artistProfiles.stageName,
      actType: artistProfiles.actType,
      genres: artistProfiles.genres,
      city: artistProfiles.city,
      country: artistProfiles.country,
    })
    .from(artistProfiles)
    .where(and(...conditions))
    .orderBy(asc(artistProfiles.stageName))
    .limit(limit)
    .offset(offset);
}

export async function getDiscoverableArtistById(
  id: string
): Promise<ArtistProfile | null> {
  const [profile] = await db
    .select()
    .from(artistProfiles)
    .where(and(eq(artistProfiles.id, id), discoverableStageName))
    .limit(1);

  return profile ?? null;
}
