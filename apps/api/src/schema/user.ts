import { eq } from "drizzle-orm";
import { users, type User } from "@zauti/db";
import { builder } from "../builder.js";

const AccountTypeEnum = builder.enumType("AccountType", {
  values: ["artist", "venue"] as const,
});

const UserRef = builder.objectRef<User>("User");

UserRef.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    clerkId: t.exposeString("clerkId"),
    email: t.exposeString("email"),
    name: t.exposeString("name"),
    accountType: t.field({
      type: AccountTypeEnum,
      nullable: true,
      resolve: (user) => user.accountType,
    }),
    createdAt: t.field({
      type: "String",
      resolve: (user) =>
        user.createdAt instanceof Date
          ? user.createdAt.toISOString()
          : String(user.createdAt),
    }),
  }),
});

builder.queryField("users", (t) =>
  t.field({
    type: [UserRef],
    resolve: async (_root, _args, ctx) => {
      return ctx.db.select().from(users);
    },
  })
);

builder.queryField("user", (t) =>
  t.field({
    type: UserRef,
    nullable: true,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, String(args.id)))
        .limit(1);
      return user ?? null;
    },
  })
);

builder.mutationField("createUser", (t) =>
  t.field({
    type: UserRef,
    args: {
      clerkId: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
      accountType: t.arg({ type: AccountTypeEnum, required: false }),
    },
    resolve: async (_root, args, ctx) => {
      const [user] = await ctx.db
        .insert(users)
        .values({
          clerkId: args.clerkId,
          email: args.email,
          name: args.name,
          accountType: args.accountType ?? null,
        })
        .returning();

      if (!user) {
        throw new Error("Failed to create user");
      }

      return user;
    },
  })
);
