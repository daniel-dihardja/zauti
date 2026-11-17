"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import type { ActType, ArtistProfile } from "@zauti/db";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { updateArtistProfile } from "../../../lib/artist-profile";
import { DEFAULT_CITY, DEFAULT_COUNTRY } from "../../../lib/location";

const ACT_TYPE_OPTIONS: { value: ActType; label: string }[] = [
  { value: "dj", label: "DJ" },
  { value: "band", label: "Band" },
  { value: "solo", label: "Solo artist" },
  { value: "ensemble", label: "Ensemble" },
];

type FormState = { ok: true } | { ok: false; error: string } | null;

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

  useEffect(() => {
    if (state?.ok) {
      toast.success("Profile saved");
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Artist details</CardTitle>
        <CardDescription>
          Add what you can now — you can fill in the rest anytime.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="flex flex-col gap-8">
          <FieldGroup>
            <h3 className="text-base font-medium text-foreground">Identity</h3>
            <Field>
              <FieldLabel htmlFor="stageName">Stage name</FieldLabel>
              <Input
                id="stageName"
                name="stageName"
                defaultValue={profile?.stageName ?? ""}
                placeholder="How you appear on Zauti"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="actType">Act type</FieldLabel>
              <NativeSelect
                id="actType"
                name="actType"
                defaultValue={profile?.actType ?? ""}
                className="w-full"
              >
                <NativeSelectOption value="">Select act type</NativeSelectOption>
                {ACT_TYPE_OPTIONS.map((option) => (
                  <NativeSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="genres">Genres</FieldLabel>
              <Input
                id="genres"
                name="genres"
                defaultValue={profile?.genres ?? ""}
                placeholder="e.g. House, Jazz, Indie rock"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <h3 className="text-base font-medium text-foreground">Story</h3>
            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                name="bio"
                rows={5}
                defaultValue={profile?.bio ?? ""}
                placeholder="Tell venues about your sound, experience, and typical sets."
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="pb-4">
            <h3 className="text-base font-medium text-foreground">Location</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="city">City</FieldLabel>
                <Input
                  id="city"
                  name="city"
                  defaultValue={profile?.city ?? DEFAULT_CITY}
                  placeholder={DEFAULT_CITY}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="country">Country</FieldLabel>
                <Input
                  id="country"
                  name="country"
                  defaultValue={profile?.country ?? DEFAULT_COUNTRY}
                  placeholder={DEFAULT_COUNTRY}
                />
              </Field>
            </div>
          </FieldGroup>

          {state && !state.ok ? (
            <Alert variant="destructive">
              <AlertTitle>Couldn’t save</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? <Spinner data-icon="inline-start" /> : null}
            {pending ? "Saving…" : profile ? "Save changes" : "Save profile"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
