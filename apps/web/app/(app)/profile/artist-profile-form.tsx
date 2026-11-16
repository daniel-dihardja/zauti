"use client";

import { useActionState } from "react";
import type { ActType, ArtistProfile } from "@zauti/db";
import { updateArtistProfile } from "../../../lib/artist-profile";

const ACT_TYPE_OPTIONS: { value: ActType; label: string }[] = [
  { value: "dj", label: "DJ" },
  { value: "band", label: "Band" },
  { value: "solo", label: "Solo artist" },
  { value: "ensemble", label: "Ensemble" },
];

type FormState = { ok: true } | { ok: false; error: string } | null;

const fieldClassName =
  "mt-2 w-full border border-blush/15 bg-black px-4 py-3 text-base text-blush placeholder:text-muted/60 outline-none transition-colors focus:border-stage";

const labelClassName =
  "block text-xs font-medium tracking-wide text-muted uppercase";

export function ArtistProfileForm({
  profile,
}: {
  profile: ArtistProfile | null;
}) {
  const [state, formAction, pending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      return updateArtistProfile(formData);
    },
    null
  );

  return (
    <form
      action={formAction}
      className="mt-10 space-y-6 border-t border-blush/10 pt-8"
    >
      <div>
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
          Artist details
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Add what you can now — you can fill in the rest anytime.
        </p>
      </div>

      <div>
        <label htmlFor="stageName" className={labelClassName}>
          Stage name
        </label>
        <input
          id="stageName"
          name="stageName"
          type="text"
          defaultValue={profile?.stageName ?? ""}
          placeholder="How you appear on Zauti"
          className={fieldClassName}
        />
      </div>

      <div>
        <label htmlFor="actType" className={labelClassName}>
          Act type
        </label>
        <select
          id="actType"
          name="actType"
          defaultValue={profile?.actType ?? ""}
          className={fieldClassName}
        >
          <option value="">Select act type</option>
          {ACT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="genres" className={labelClassName}>
          Genres
        </label>
        <input
          id="genres"
          name="genres"
          type="text"
          defaultValue={profile?.genres ?? ""}
          placeholder="e.g. House, Jazz, Indie rock"
          className={fieldClassName}
        />
      </div>

      <div>
        <label htmlFor="bio" className={labelClassName}>
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={5}
          defaultValue={profile?.bio ?? ""}
          placeholder="Tell venues about your sound, experience, and typical sets."
          className={`${fieldClassName} resize-y`}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={labelClassName}>
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            defaultValue={profile?.city ?? ""}
            placeholder="Berlin"
            className={fieldClassName}
          />
        </div>
        <div>
          <label htmlFor="country" className={labelClassName}>
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            defaultValue={profile?.country ?? ""}
            placeholder="Germany"
            className={fieldClassName}
          />
        </div>
      </div>

      {state && !state.ok ? (
        <p className="text-sm text-stage" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.ok ? (
        <p className="text-sm text-stage" role="status">
          Profile saved.
        </p>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center bg-stage px-7 text-sm font-semibold tracking-wide text-night transition-colors hover:bg-stage-deep hover:text-blush focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stage disabled:opacity-60"
        >
          {pending ? "Saving…" : profile ? "Save changes" : "Save profile"}
        </button>
      </div>
    </form>
  );
}
