import { eq } from "drizzle-orm";
import { users, type User } from "@zauti/db";
import { builder } from "../builder.js";

const UserRef = builder.objectRef<User>("User");

UserRef.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    name: t.exposeString("name"),
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
      email: t.arg.string({ required: true }),
      name: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const [user] = await ctx.db
        .insert(users)
        .values({
          email: args.email,
          name: args.name,
        })
        .returning();

      if (!user) {
        throw new Error("Failed to create user");
      }

      return user;
    },
  })
);
