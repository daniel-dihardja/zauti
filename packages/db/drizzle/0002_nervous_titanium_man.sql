CREATE TYPE "public"."act_type" AS ENUM('dj', 'band', 'solo', 'ensemble');--> statement-breakpoint
CREATE TABLE "artist_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"stage_name" text NOT NULL,
	"act_type" "act_type" NOT NULL,
	"bio" text NOT NULL,
	"genres" text NOT NULL,
	"city" text NOT NULL,
	"country" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "artist_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "artist_profiles" ADD CONSTRAINT "artist_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;