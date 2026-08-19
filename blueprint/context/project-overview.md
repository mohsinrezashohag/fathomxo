# FathomXO - Project Overview

> The studio's own platform: a dark, motion-led portfolio site that proves
> capability on sight, publishes real prices, and turns visitors into qualified
> project briefs.

> **Generated file. Don't hand-edit.** Distilled from
> [../project-plan.md](../project-plan.md) and [../build-plan.md](../build-plan.md)
> by `/overview`. When the plans change, re-run `/overview`.

## Problem

Businesses buying software choose between template shops that ship everyone the
same skin and dev teams that disappear into long builds. Neither sells a point
of view. FathomXO ships opinionated, production-grade software fast (e-commerce,
web and mobile apps, landing pages, AI agents / automation), and this site is
the instrument that wins that work: it must prove capability in the first five
seconds, qualify leads through a structured brief instead of a generic contact
form, and make pricing legible with published tiers.

Explicitly not in scope: client project management, invoicing, marketplaces.
The platform's job ends when a qualified brief is in the pipeline.

Reference for density and craft (structure, not look): <https://dropoutstudio.co/>

## Users

- **Founder / owner-operator (primary)** - 25-45, Dhaka/Chattogram/diaspora,
  discovers via social, browses on a mid-range Android over mobile data. Wants a
  price, a timeline, proof, fast.
- **Marketing / ops lead at an SME or NGO (secondary)** - has budget and an
  approval chain; needs case studies and a scope to take upstairs.
- **Technical buyer at a startup or agency (tertiary)** - overflow engineering /
  AI-automation partner; skims marketing, inspects the work and the stack.
- **FathomXO team (internal, 2-6 people)** - publish content and change prices
  via pull request in MVP; see every brief with owner and status (Post-MVP inbox).

Design consequence: **mobile-first is mandatory.** 3D and motion must degrade to
a static poster frame on low-end devices without breaking layout or message.

## Template teardown (pre-build, before feature 1)

The starter's `blog`, `login`, and `signup` routes, their components, and the
`swiper` dependency are deleted before feature 1. Dead template code is worse
than missing code: it is the nearest example in the repo, so later features risk
copying its conventions.

**Team content is kept, not removed.** The team route, its About section, its
content, and its member images are real content; feature 11 restyles them to the
brand system.

**The markdown chain stays for now.** `gray-matter`, `react-markdown`, and
`rehype-slug` still feed `/`, `/about`, `/projects/[slug]`, `/services/[slug]`,
and the team pages. Feature 2 migrates projects, services, and team to typed
modules and removes the dependencies, and `coding-standards.md` is updated to
describe typed TS content modules once that lands. Git history keeps the removed
routes if a Post-MVP blog wants the pattern back.

## Features

MVP, in build order. The headline feature is **3: Hero and 3D signature** - the
site's proof-of-capability moment.

1. **Design system and shell** - brand tokens into `src/styles`, type scale,
   motion tokens, nav, footer, page-transition shell.
2. **Content model** - typed content modules in `src/data`, Zod schemas in
   `src/interface`, validated at build time; migrates projects, services, and
   team off the starter's markdown pipeline and removes `gray-matter`,
   `react-markdown`, `rehype-slug` once nothing imports them.
3. **Hero and 3D signature** - statement headline, orchestrated load sequence,
   symbol-derived 3D object with poster-frame fallback.
4. **Positioning sections** - scroll-revealed oversized statements down the home page.
5. **Client roster** - typographic client list, each row linking to its case study.
6. **Case study pages** - problem, approach, stack, outcome, gallery per project.
7. **Services** - four service lines with deliverables and a detail page per line.
8. **Pricing tabs** - one tab per service line, BDT tiers, recommended state, CTAs.
9. **Launch campaign banner** - countdown and progress bar for an active release.
10. **FAQ** - searchable entries, category rail, accordion answers.
11. **Studio and team** - who FathomXO is, plus team members with photos, roles,
    and titles, restyled from the existing content to the brand system.
12. **Project brief intake** - multi-step qualified form, shared validation, spam protection.
13. **Brief notifications** - route handler sending internal alert and branded auto-reply.
14. **SEO and social** - metadata, structured data, sitemap, robots, dynamic OG
    images, favicon/PWA icons, cookieless analytics.
15. **Performance and accessibility pass** - JS budget, reduced motion, contrast,
    keyboard paths, low-end fallbacks.
16. **Deployment readiness** - Vercel config, env vars, health check, domain,
    production build verification.

Post-MVP (17-26): lead persistence (Postgres), admin auth (magic link), lead
inbox, content editing, insights/articles, Bangla toggle, discovery call
booking, client portal, referral programme, careers.

Deliberately out of MVP: database-backed CMS and admin, blog, client portal,
live chat, online payments, Bangla toggle, careers.

## Data model

MVP content is **static and typed**: modules in `src/data`, shapes and Zod
schemas in `src/interface`. A copy or price change is a pull request. Only the
lead payload leaves the browser. When persistence lands Post-MVP, the Postgres
schema mirrors these shapes one-to-one.

These shapes are load-bearing: feature 2 defines them, features 5-11 consume them.

### Client

- `name` (string) - roster display name
- `descriptor` (string) - one-line what-we-did
- `industry` (string)
- `order` (number) - roster sort
- `published` (boolean) - unpublished stays in repo, never deleted
- One-to-many with Project

### Project (case study)

- `slug` (string, unique) - route key
- `title`, `summary` (string)
- `problem`, `approach`, `outcome` (long-form string)
- `stack` (string[])
- `serviceLine` (service slug ref)
- `cover` (image ref), `gallery` (image ref[])
- `date` (date)
- Belongs to a Client; belongs to a service line

### Service

- `slug` (string, unique) - one of the four lines: e-commerce, website/app,
  landing page, AI agents/automation
- `name`, `tagline`, `description` (string)
- `deliverables` (string[])
- `iconKey` (string)
- `order` (number)

### PricingPlan

- `serviceSlug` (service ref) - tab grouping
- `name` (string), `priceBdt` (number), `period` (string)
- `recommended` (boolean)
- `features` (string[])
- `ctaLabel`, `ctaHref` (string)

### Faq

- `category` (string) - drives the category rail
- `question`, `answer` (string)
- `order` (number), `published` (boolean)

### Campaign

- `title`, `subtitle` (string)
- `targetDate` (date) - countdown target
- `ctaLabel`, `ctaHref` (string)
- `active` (boolean)

### Testimonial

- `clientSlug` (client ref)
- `quote`, `authorName`, `authorRole` (string)

### TeamMember

Powers feature 11 (Studio and team).

- `name`, `role`, `title` (string)
- `photo` (image ref)
- `order` (number), `published` (boolean)
- `socials` (link[], optional)

### Lead (runtime, not stored in MVP)

Emailed to the team only; never persisted, never on a public route.

- `name`, `email`, `phone`, `company` (string)
- `serviceLine` (service ref)
- `scopeSummary` (string), `budgetBand` (string), `timeline` (string)
- `source` (string), `submittedAt` (date)

### Analytics event (aggregate only)

- `eventName`, `path`, `referrer`, `deviceClass` - **no PII**: no IP, no user
  id, no fingerprint

**Locked rules all specs must respect:**

- Lead email/phone are sensitive: never on a public route, never in an OG image,
  never logged in plaintext.
- Every content module validates against its Zod schema at build time; a
  malformed entry fails the build.
- Unpublish by flag, never by deletion.

## Tech stack

Matches the repo; no stack changes proposed.

- **Bun** - runtime and package manager
- **Next.js 16 App Router + React 19 + TypeScript strict** - server components
  by default
- **Tailwind CSS v4** - via PostCSS; brand tokens from
  `src/assets/images/logos/README.txt` exposed as CSS variables in `src/styles`
- **GSAP + ScrollTrigger + Lenis** - reveals, hero load sequence, weighted
  smooth scroll. **One animation runtime only: Framer Motion / Motion must not
  be added.** Under `prefers-reduced-motion` Lenis is disabled and every
  ScrollTrigger resolves to its final state
- **No carousel library** - Swiper is removed; the case-study gallery uses CSS
  scroll-snap
- **React Three Fiber + drei** - hero 3D object, lazily loaded, pre-rendered
  WebP poster for mobile, low-power, and no-WebGL (to be added)
- **Fonts** - Clash Display (statement), Satoshi (body), JetBrains Mono
  (micro-caps and data), all self-hosted via `next/font/local`, Latin subset,
  `swap`
- **React Hook Form + Zod** - brief form, one schema shared client/server;
  Cloudflare Turnstile for spam (to be added)
- **Resend + React Email** - internal alert and branded auto-reply (to be added)
- **Typed content in `src/data`** - no external CMS. The starter's markdown
  chain (`gray-matter`, `react-markdown`, `rehype-slug`) survives the teardown
  and is removed by feature 2
- **Vercel Analytics + Speed Insights** - cookieless, no consent banner
- **Quality gates** - ESLint, Prettier, `tsc --noEmit`, Playwright smoke test on
  the brief flow, Lighthouse budget in CI (gates not yet configured; `/tests`
  and `/ci` own setup)

Hard constraint: **fast on a mid-range Android over 4G.** First-load JS budget
is 180 KB per route; the 3D bundle sits outside the budget and never blocks
first paint. A library that breaks the budget loses.

## Monetization

The platform sells nothing directly; it is measured in **qualified briefs per
month**. Revenue behind it: fixed-scope project work (primary), monthly
retainers (pricing tabs normalize these), productised Starter/Essential/Grow
tiers, the studio's own product releases (countdown banner is their launch
surface), and a Post-MVP referral programme. MVP success: 20+ qualified briefs
a month, a third above the mid budget band, first reply inside 24 hours.

## UI/UX

**Direction: engineered dark.** Near-black canvas, one lit physical object,
closer to a product studio than an agency.

- **Colour**: only the tokens in `src/assets/images/logos/README.txt` (accent,
  light-on-dark, dark-on-light, icon ground). Accent used **only as a light
  source**: 3D rig, focus rings, active tab, one accent per viewport. Never a
  gradient behind text. Any hex not traceable to that file does not ship.
- **Contrast floor**: 4.5:1 body, 3:1 interactive borders; on accent fills, use
  the dark canvas colour for label text, not white.
- **Type**: Clash Display for statements at 56-120px, tracking `-0.03em`,
  mixed weights inside a sentence. Satoshi for body at 16-20px, line-height
  1.6. JetBrains Mono at 11-13px uppercase, tracking `0.12em`, for eyebrows,
  labels, counters, table headers. Scale:
  `12 / 14 / 16 / 20 / 24 / 32 / 44 / 60 / 84 / 120`.
- **Layout**: full-bleed dark sections separated by hairline rules, left-aligned
  statement blocks, edge-to-edge lists, nothing centred except the hero.
- **Signature**: the hero 3D object - slowly rotating, subtly refractive, derived
  from the FathomXO symbol, accent-lit, pointer-reactive, settling on scroll.
  Appears once; everything else stays flat.
- **Motion**: one orchestrated GSAP timeline on load (mask-reveal headline,
  object fades up, nav settles), then ScrollTrigger reveals at ~40% viewport
  entry, Lenis carrying the weighted scroll feel. Hovers instant, reveals
  400-600ms, one shared easing curve, no scroll-jacked section snapping. Under
  `prefers-reduced-motion`: Lenis off, triggers resolve to final state, 3D
  object becomes its poster.
- **Voice**: direct, plain verbs, lightly irreverent, never profane. Buttons say
  what happens ("Send the brief", "See the work"). Sentence case except mono
  micro-caps.
- **Quality floor**: responsive from 360px, visible accent focus, tap targets
  >= 44px, every section readable with motion disabled.

**Anti-patterns (do not ship)**: logo-wall carousel, `01 / 02 / 03` markers on
non-sequences, glass cards over blurred gradients, stock 3D blobs, autoplaying
background video.

Main routes: home (hero, positioning, roster, banner), case study pages
(`projects/[slug]`), services index + detail per line, pricing, FAQ, studio /
team (+ member detail), brief intake (route named in its spec),
`GET /api/health`.

## Deployment

- **Host**: Vercel, Next.js App Router, Node 20, `sin1` (Singapore) region
- **App type**: server-rendered; content routes fully static at build time
- **Install**: `bun install` | **Build**: `bun run build` | **Output**: `.next`
  (Vercel-managed, no custom start command)
- **Env vars**: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`,
  `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
- **Database/storage**: none in MVP; case-study media committed under
  `src/assets/images`; Neon Postgres arrives with the Post-MVP admin
- **Workers/cron**: none in MVP
- **Health check**: `GET /api/health` returning build SHA and status
- **Domains**: apex + `www` (redirects to apex); preview deploys `noindex`
- **Pre-launch**: `robots.txt`, `sitemap.xml`, OG image route, favicon/PWA icons
  from `symbol-*.svg` and `app-icon-512.png`, branded 404/500, Lighthouse >= 95
  on home

## Open questions

> Resolve these in the plans, then re-run `/overview`.

- **The `fix/template-teardown` branch contradicts this plan on team content.**
  The branch deleted `src/app/team/[slug]`, `src/components/team-details/`,
  `src/data/team/` (6 markdown files), `src/components/about/team.tsx`, and
  `src/components/shared/ui/card/team-card.tsx`. The plan now says team content
  is kept and restyled by feature 11. The branch is unmerged and every file is
  recoverable from `main`; restore them before `/complete`.
- **Font files**: Clash Display and Satoshi are Fontshare faces and JetBrains
  Mono is open source, but `next/font/local` needs the files committed to the
  repo; none are present yet. Sourcing them (with licence files) lands in
  feature 1, which also replaces the six `next/font/google` families the
  template currently loads in `src/utils/font.ts`.
- **Prettier vs line endings**: `.prettierrc` sets `endOfLine: "lf"` but the
  working tree is CRLF throughout, so `prettier --check` fails on files nobody
  has touched. A `.gitattributes` with `* text=auto eol=lf` would settle it;
  worth its own `/fix` rather than a repo-wide reformat inside a feature.
