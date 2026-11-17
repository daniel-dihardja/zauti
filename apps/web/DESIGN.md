---
name: Zanzibar App
board_name: Zanzibar Live Talent Marketplace
source: packages/docs/design/Zanzibar Live Talent Marketplace UI.png
default_mode: light
fonts:
  heading: DM Serif Display
  body: Manrope
radius:
  controls: full (pill)
  cards: ~1rem–1.25rem
---

# Zanzibar App design specification

Canonical visual system for Zanzibar App, transcribed from the **Zanzibar Live Talent Marketplace** UI board. Product brand in app remains **Zanzibar App**; board title is the marketplace concept name.

## Brand & mood

Coastal booking marketplace for hotels and venues in Zanzibar. Warm, confident, media-first—not nightlife neon, not generic SaaS purple. Discovery and booking are the jobs.

## Color palette

| Name | Hex | Role |
|------|-----|------|
| Deep Ocean | `#173F3D` | Dark teal chrome, logo on light, hero overlays, secondary fills |
| Sunset Coral | `#E97B5D` | Primary CTAs, key accents |
| Golden Sand | `#E7BE7B` | Ratings, soft highlights |
| Warm Ivory | `#F6F1E8` | Page canvas / section backgrounds |
| Charcoal | `#252A29` | Primary body text |

### Token mapping (app)

| Token | Maps to |
|-------|---------|
| `--background` | Warm Ivory |
| `--foreground` | Charcoal |
| `--primary` / `--primary-foreground` | Sunset Coral / white |
| `--secondary` / `--secondary-foreground` | Deep Ocean / Warm Ivory |
| `--ocean` / `--ocean-foreground` | Deep Ocean / Warm Ivory |
| `--sand` | Golden Sand |
| `--card` | Near-white / warm white on ivory |
| `--muted` / `--muted-foreground` | Soft sand tint / secondary text |
| `--border` / `--input` / `--ring` | Soft stone / coral focus |

## Typography

| Role | Family | Usage |
|------|--------|--------|
| Headlines | **DM Serif Display** | Hero headline, section titles, artist names, brand wordmark |
| UI / body | **Manrope** | Nav, buttons, forms, trust copy, meta, filters |

Scale (approximate):

- Hero headline: ~clamp 2.5rem–4.5rem, serif, white on photo
- Section / page title: ~2rem–2.5rem serif
- Artist card name: ~1.25rem–1.5rem serif
- Body / UI: 0.875rem–1.125rem Manrope
- Trust / meta: ~0.875rem

## Components

### Buttons

- **Primary:** Sunset Coral fill, white label, **pill** (`rounded-full`), comfortable horizontal padding
- **Secondary / outline:** Transparent or light fill, charcoal (or white on hero) border, pill
- Hero search embeds primary **Find Artists** inside a white pill bar

### Tags / badges

- Small pills, light fill or thin charcoal border
- Examples: `DJ`, `Live Band`, category chips
- **Verified:** green check treatment on cards (when data exists)

### Artist card

- Tall cover image (photo preferred; placeholder until uploads)
- Optional overlays: favorite (heart), verified badge, play affordance
- Below media: **serif name**, genre line, location, starting price (`From $X / night`), star rating
- Primary action: **View Profile & Book** (coral, full-width or trailing, with arrow)

### Search bar

- Large white pill container
- Segments: text search · location · (optional date) · coral submit
- Mobile: stack inputs vertically inside/near the bar

## Page layouts

### Landing (desktop + mobile)

1. **Full-bleed hero** — sunset / live-talent photography, dark overlay for type contrast
2. **Top nav** — logo left; links (Find Artists, For Venues, For Artists, How It Works, Support); **Log In** (outline) + **Sign Up** (coral)
3. **Hero copy** — “The right talent. The perfect vibe.” (+ short supporting line)
4. **Hero search** — search artists / location / Find Artists
5. **Trust row** — four icon + label items (verified talent · act types · Across Zanzibar · secure booking)
6. **Explore talent** — ivory section; serif headline “Find the perfect act for your venue”; row of **category cards** with image + label (DJs, Live Bands, Musicians, Singers & Vocalists, Traditional Performers)

Mobile: same structure; nav may collapse; search stacks; categories become a scrollable/compact grid.

### Find Artists

1. Shared header (logo + nav); optional soft palm/leaf banner treatment
2. Top search bar: search · location · date · Filters
3. **Left sidebar** — Category (checkboxes), Genre/Style, Location
4. **Results** — “N artists found”, sort (e.g. Recommended)
5. **Responsive grid** of artist cards

Mobile: filters via sheet/toggle; single-column or 2-up card grid.

### Profile (product adaptation)

Not fully drawn on the board; inherit Warm Ivory canvas, Deep Ocean wordmark, Coral primary actions, serif for page titles, Manrope for forms—same tokens as Find Artists chrome.

## Do’s

- Lead marketing with brand + one strong headline + search/CTA group on hero media
- Use coral only for primary actions; keep ocean for depth and structure
- Prefer photography of people/performance/place over abstract gradients alone
- Keep Manrope for dense UI; serif for names and headlines only

## Don’ts

- Purple/indigo SaaS gradients or neon club glow
- Square/boxy buttons when the board specifies pills
- Crowding the hero with more than Log In / Sign Up in the header plus Find Artists in search
- Text-only discovery cards when a media slot exists

## Implementation status vs board

| Board element | Status |
|---------------|--------|
| Palette + fonts + pills | Live tokens: ivory/coral/ocean/sand + DM Serif / Manrope |
| Landing hero, search, trust, categories | Implemented (Zanzibar App naming) |
| Find Artists sidebar + grid | Implemented (category, genre, location; date/sort UI placeholders) |
| Verified, favorites, ratings, price | UI placeholders until schema exists |
| View Profile & Book | Card CTA live; booking request deferred on detail |
| Category set (5 board types) | Mapped to current act types where possible (`dj`, `band`, `solo`, `ensemble`) |
