import { eq } from "drizzle-orm";
import { artistProfiles, type ArtistProfile } from "@zauti/db";
import { builder } from "../builder.js";

const ActTypeEnum = builder.enumType("ActType", {
  values: ["dj", "band", "solo", "ensemble"] as const,
});

const ArtistProfileRef = builder.objectRef<ArtistProfile>("ArtistProfile");

ArtistProfileRef.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    userId: t.exposeString("userId"),
    stageName: t.exposeString("stageName", { nullable: true }),
    actType: t.field({
      type: ActTypeEnum,
      nullable: true,
      resolve: (profile) => profile.actType,
    }),
    bio: t.exposeString("bio", { nullable: true }),
    genres: t.exposeString("genres", { nullable: true }),
    city: t.exposeString("city", { nullable: true }),
    country: t.exposeString("country", { nullable: true }),
    createdAt: t.field({
      type: "String",
      resolve: (profile) =>
        profile.createdAt instanceof Date
          ? profile.createdAt.toISOString()
          : String(profile.createdAt),
    }),
    updatedAt: t.field({
      type: "String",
      resolve: (profile) =>
        profile.updatedAt instanceof Date
          ? profile.updatedAt.toISOString()
          : String(profile.updatedAt),
    }),
  }),
});

builder.queryField("artistProfile", (t) =>
  t.field({
    type: ArtistProfileRef,
    nullable: true,
    args: {
      userId: t.arg.id({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const [profile] = await ctx.db
        .select()
        .from(artistProfiles)
        .where(eq(artistProfiles.userId, String(args.userId)))
        .limit(1);
      return profile ?? null;
    },
  })
);
