import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const actTypeEnum = pgEnum("act_type", [
  "dj",
  "band",
  "solo",
  "ensemble",
]);

export const artistProfiles = pgTable("artist_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  stageName: text("stage_name"),
  actType: actTypeEnum("act_type"),
  bio: text("bio"),
  genres: text("genres"),
  city: text("city"),
  country: text("country"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type ActType = (typeof actTypeEnum.enumValues)[number];
export type ArtistProfile = typeof artistProfiles.$inferSelect;
export type NewArtistProfile = typeof artistProfiles.$inferInsert;
