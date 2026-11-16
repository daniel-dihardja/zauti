import { Music2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import type { ArtistProfile } from "@zauti/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Progress } from "@/components/ui/progress";
import { getArtistProfile } from "../../../lib/artist-profile";
import { ensureAppUser } from "../../../lib/users";
import { ArtistProfileForm } from "./artist-profile-form";

const ACT_TYPE_LABELS: Record<string, string> = {
  dj: "DJ",
  band: "Band",
  solo: "Solo artist",
  ensemble: "Ensemble",
};

function profileCompleteness(profile: ArtistProfile | null): {
  filled: number;
  total: number;
  percent: number;
} {
  const fields = [
    profile?.stageName,
    profile?.actType,
    profile?.genres,
    profile?.bio,
    profile?.city,
    profile?.country,
  ];
  const filled = fields.filter(
    (value) => typeof value === "string" && value.trim().length > 0
  ).length;
  const total = fields.length;
  return {
    filled,
    total,
    percent: Math.round((filled / total) * 100),
  };
}

function locationLine(profile: ArtistProfile | null): string | null {
  const parts = [profile?.city, profile?.country].filter(
    (value): value is string => Boolean(value && value.trim())
  );
  return parts.length > 0 ? parts.join(", ") : null;
}

function AccountCard({
  email,
  accountType,
}: {
  email: string;
  accountType: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Account</CardTitle>
        <CardDescription>Sign-in details for this Zauti account.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="text-base text-foreground">{email}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">Account type</p>
          <p className="text-base capitalize text-foreground">{accountType}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ProfilePage() {
  const user = await ensureAppUser();

  if (!user.accountType) {
    redirect("/onboarding");
  }

  const isArtist = user.accountType === "artist";
  const artistProfile = isArtist ? await getArtistProfile(user.id) : null;
  const completeness = profileCompleteness(artistProfile);
  const location = locationLine(artistProfile);
  const displayName = (isArtist && artistProfile?.stageName) || user.name;
  const actLabel = artistProfile?.actType
    ? (ACT_TYPE_LABELS[artistProfile.actType] ?? artistProfile.actType)
    : null;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10">
      {isArtist ? (
        <>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-muted-foreground">
              Artist profile
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {displayName}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              {actLabel ? <Badge variant="secondary">{actLabel}</Badge> : null}
              {location ? (
                <span className="text-base text-muted-foreground">{location}</span>
              ) : null}
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  {completeness.filled} of {completeness.total} details filled
                </p>
                <span className="text-sm text-muted-foreground">
                  {completeness.percent}%
                </span>
              </div>
              <Progress value={completeness.percent} />
            </div>
            <p className="max-w-md text-base text-muted-foreground">
              Add or update your details anytime. Venues use these to discover
              and book you.
            </p>
          </div>

          <ArtistProfileForm profile={artistProfile} />

          <AccountCard email={user.email} accountType={user.accountType} />
        </>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-muted-foreground">
              Venue profile
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {user.name}
            </h1>
            <p className="max-w-md text-base text-muted-foreground">
              Artist discovery is on the way. Soon you&apos;ll browse live talent
              and request dates from here.
            </p>
          </div>

          <Empty className="border border-dashed border-border py-12">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Music2Icon />
              </EmptyMedia>
              <EmptyTitle className="text-base">Browse artists</EmptyTitle>
              <EmptyDescription>
                Discovery and booking tools for venues are coming next.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button disabled size="lg">
                Browse artists
                <Badge variant="secondary" className="ml-1">
                  Soon
                </Badge>
              </Button>
            </EmptyContent>
          </Empty>

          <AccountCard email={user.email} accountType={user.accountType} />
        </>
      )}
    </div>
  );
}
