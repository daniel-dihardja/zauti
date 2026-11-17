"use server";

import {
  artistProfiles,
  db,
  type ActType,
  type ArtistProfile,
} from "@zanzibar-app/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ensureAppUser } from "./users";

const ACT_TYPES: readonly ActType[] = ["dj", "band", "solo", "ensemble"];

export type ArtistProfileInput = {
  stageName: string | null;
  actType: ActType | null;
  bio: string | null;
  genres: string | null;
  city: string | null;
  country: string | null;
};

function trimOptional(value: FormDataEntryValue | null): string | null {
  const trimmed = String(value ?? "").trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parseActType(value: FormDataEntryValue | null): ActType | null {
  const actType = String(value ?? "").trim();
  if (!actType) return null;
  if (!ACT_TYPES.includes(actType as ActType)) {
    throw new Error("Invalid act type");
  }
  return actType as ActType;
}

export async function getArtistProfile(
  userId: string
): Promise<ArtistProfile | null> {
  const [profile] = await db
    .select()
    .from(artistProfiles)
    .where(eq(artistProfiles.userId, userId))
    .limit(1);

  return profile ?? null;
}

export async function updateArtistProfile(
  formData: FormData
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const user = await ensureAppUser();

    if (user.accountType !== "artist") {
      return { ok: false, error: "Only artists can update an artist profile" };
    }

    const bio = trimOptional(formData.get("bio"));
    if (bio && bio.length < 40) {
      return {
        ok: false,
        error: "Bio must be at least 40 characters when provided",
      };
    }

    const input: ArtistProfileInput = {
      stageName: trimOptional(formData.get("stageName")),
      actType: parseActType(formData.get("actType")),
      bio,
      genres: trimOptional(formData.get("genres")),
      city: trimOptional(formData.get("city")),
      country: trimOptional(formData.get("country")),
    };

    const existing = await getArtistProfile(user.id);

    if (existing) {
      await db
        .update(artistProfiles)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(artistProfiles.userId, user.id));
    } else {
      await db.insert(artistProfiles).values({
        userId: user.id,
        ...input,
      });
    }

    revalidatePath("/profile");
    revalidatePath("/artists");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to save profile",
    };
  }
}
