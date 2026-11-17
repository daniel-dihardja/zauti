import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import {
  LockIcon,
  MapPinIcon,
  Music2Icon,
  ShieldCheckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { DEFAULT_CITY } from "../lib/location";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1470225620780-dba8ba60b75b?auto=format&fit=crop&w=2400&q=80";

const CATEGORIES = [
  {
    label: "DJs",
    href: "/artists?actType=dj",
    image: "/categories/djs.jpg",
  },
  {
    label: "Live Bands",
    href: "/artists?actType=band",
    image: "/categories/live-bands.jpg",
  },
  {
    label: "Musicians",
    href: "/artists?actType=solo",
    image: "/categories/musicians.jpg",
  },
  {
    label: "Singers & Vocalists",
    href: "/artists?q=vocal",
    image: "/categories/singers.jpg",
  },
  {
    label: "Traditional Performers",
    href: "/artists?actType=ensemble",
    image: "/categories/traditional.jpg",
  },
] as const;

const TRUST = [
  { icon: ShieldCheckIcon, label: "Book verified talent" },
  { icon: Music2Icon, label: "DJs, bands, solo artists" },
  { icon: MapPinIcon, label: "Across Zanzibar" },
  { icon: LockIcon, label: "Secure booking" },
] as const;

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col bg-background text-foreground">
      <section className="relative isolate flex min-h-[min(92dvh,52rem)] flex-col overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ocean/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean/85 via-ocean/40 to-ocean/25" />

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <Link
            href="/"
            className="font-heading text-2xl tracking-tight text-white"
          >
            Zauti
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-white/90 lg:flex">
            <Link href="/artists" className="transition-colors hover:text-white">
              Find Artists
            </Link>
            <Link href="/sign-up" className="transition-colors hover:text-white">
              For Venues
            </Link>
            <Link href="/sign-up" className="transition-colors hover:text-white">
              For Artists
            </Link>
            <a href="#explore" className="transition-colors hover:text-white">
              How It Works
            </a>
            <a href="#explore" className="transition-colors hover:text-white">
              Support
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Suspense>
              <Show when="signed-out">
                <SignInButton mode="modal" forceRedirectUrl="/profile">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    Log In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal" forceRedirectUrl="/profile">
                  <Button size="lg">Sign Up</Button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/artists">Find Artists</Link>
                </Button>
                <UserButton />
              </Show>
            </Suspense>
          </div>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-16 pt-8 sm:px-8 sm:pb-20">
          <h1 className="font-heading max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            The right talent.
            <br />
            The perfect vibe.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            Book DJs, bands, and musicians for hotels and events across
            Zanzibar—without the endless back-and-forth.
          </p>

          <form
            action="/artists"
            method="get"
            className="mt-8 flex w-full max-w-3xl flex-col gap-2 rounded-[2rem] bg-card p-2 shadow-lg sm:flex-row sm:items-center sm:rounded-full"
          >
            <Input
              name="q"
              placeholder="Search artists, genres or styles…"
              className="h-11 flex-1 rounded-full border-0 bg-transparent px-4 shadow-none focus-visible:ring-0 md:text-base"
              aria-label="Search artists"
            />
            <NativeSelect
              name="city"
              defaultValue=""
              className="w-full sm:w-44 [&_[data-slot=native-select]]:border-0 [&_[data-slot=native-select]]:focus-visible:ring-0"
            >
              <NativeSelectOption value="">Any location</NativeSelectOption>
              <NativeSelectOption value={DEFAULT_CITY}>
                {DEFAULT_CITY}
              </NativeSelectOption>
            </NativeSelect>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Find Artists
            </Button>
          </form>

          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-sm text-white/90"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Icon className="size-4" />
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="explore"
        className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20"
      >
        <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
          Find the perfect act for your venue
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Explore talent by category, then open a profile to learn more.
        </p>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {CATEGORIES.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className="group relative aspect-[3/4] w-[11.5rem] shrink-0 overflow-hidden rounded-2xl outline-none ring-1 ring-foreground/10 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring lg:w-auto"
            >
              <Image
                src={category.image}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 184px, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/25 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 font-heading text-lg leading-tight text-white sm:text-xl">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
