import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const accountTypeEnum = pgEnum("account_type", ["artist", "venue"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  accountType: accountTypeEnum("account_type"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type AccountType = (typeof accountTypeEnum.enumValues)[number];
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
