import type { ComponentProps } from "react";
import type { ClerkProvider } from "@clerk/nextjs";

type ClerkAppearance = NonNullable<
  ComponentProps<typeof ClerkProvider>["appearance"]
>;

/** Align Clerk UI with shadcn dark semantic tokens. */
export const clerkAppearance = {
  variables: {
    colorBackground: "oklch(0.145 0 0)",
    colorText: "oklch(0.985 0 0)",
    colorTextSecondary: "oklch(0.708 0 0)",
    colorPrimary: "oklch(0.922 0 0)",
    colorDanger: "oklch(0.704 0.191 22.216)",
    colorNeutral: "oklch(0.985 0 0)",
    borderRadius: "0.625rem",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    fontFamilyButtons: "var(--font-geist-sans), system-ui, sans-serif",
  },
  elements: {
    card: "bg-card border border-border shadow-none",
    headerTitle: "text-foreground text-xl",
    headerSubtitle: "text-muted-foreground text-base",
    socialButtonsBlockButton:
      "border border-border bg-transparent text-foreground hover:bg-muted",
    formButtonPrimary:
      "bg-primary text-primary-foreground hover:bg-primary/80 shadow-none text-base",
    formFieldInput:
      "border border-input bg-background text-foreground placeholder:text-muted-foreground text-base",
    formFieldLabel: "text-muted-foreground text-sm",
    footerActionLink: "text-foreground hover:text-foreground/80",
    identityPreviewEditButton: "text-muted-foreground",
  },
} as ClerkAppearance;
