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

## Template teardown (completed, pre-build)

The starter's `blog`, `login` and `signup` routes, their components, and the
`swiper` dependency were deleted before feature 1. Dead template code is worse
than missing code: it is the nearest example in the repo, so later features risk
copying its conventions.

**Team content was kept, not removed.** The team route, its About section, its
content and its member images are real content; feature 11 restyles them.

**The markdown chain is gone.** `gray-matter`, `react-markdown` and `rehype-slug`
were removed by feature 2c, which migrated `/`, `/about`, `/projects/[slug]`,
`/services/[slug]` and the team pages to typed modules. `coding-standards.md`
now describes typed TS content modules.

**Template branding is gone.** All 51 `Nexsas` strings, the NextSaaS metadata
defaults and the starter's AI-agency copy were replaced across every route
during feature 3. Two template surfaces remain unmounted but on disk:
`our-impact.tsx` with its three fabricated stat cards, and `hero-video.tsx`.

## Content source

Site copy comes from [../reference/content-brief.md](../reference/content-brief.md).
Sections 1-15 are the original brief; the **addendum** at the end is the source
of truth for the real clients and team, and records what is still missing.

## Features

MVP, in build order. The headline feature is **3: Hero and 3D signature**.
Features 1, 2 and 3 are split into sub-features in `build-plan.md`; that file is
the checklist of record, and it carries notes where work landed ahead of order.

1. **Design system and shell** - brand tokens into `src/styles`, type scale,
   motion tokens, nav, footer, page-transition shell.
2. **Content model** - typed content modules in `src/data`, Zod schemas in
   `src/interface`, validated at build time.
3. **Hero and 3D signature** - statement headline, orchestrated load sequence,
   symbol-derived 3D object with poster-frame fallback.
4. **Positioning sections** - scroll-revealed oversized statements down the home page.
5. **Client roster** - client trust marquee plus a typographic list, each row
   linking to its case study. *Data landed; surface unbuilt.*
6. **Case study pages** - problem, approach, stack, outcome, gallery per project.
   *Data and cover art landed; detail page still the template's.*
7. **Services** - four service lines with deliverables, a detail page per line,
   and the technology capability badges. *Badges landed; lines still template.*
8. **Pricing tabs** - one tab per service line, BDT tiers, recommended state, CTAs.
9. **Launch campaign banner** - countdown and progress bar for an active release.
10. **FAQ** - searchable entries, category rail, accordion answers. *Content
    landed; the page's six sections are still the starter's components.*
11. **Studio and team** - who FathomXO is, plus team members with photos, roles,
    and titles. *Data and photos landed; layout still template.*
12. **Project brief intake** - multi-step qualified form, shared validation, spam protection.
13. **Brief notifications** - route handler sending internal alert and branded auto-reply.
14. **SEO and social** - metadata, structured data, sitemap, robots, dynamic OG
    images, favicon/PWA icons, cookieless analytics. *Titles, descriptions,
    metadata defaults and the icon set landed; the rest is open.*
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

MVP content is **static and typed**: modules in `src/data`, schemas in
`src/interface/index.ts`, every entry parsed at module load by
`parseContent(schema, entries, label)` so a malformed field fails `bun run build`.
A copy or price change is a pull request. Only the lead payload leaves the
browser. When persistence lands Post-MVP, the Postgres schema mirrors these
shapes one-to-one.

Types are inferred with `z.infer`, never hand-written beside a schema, and every
schema is `.strict()`. Field names below are the real ones.

### Client (`clients.ts`) - 3 entries

- `name`, `descriptor` (one-line engagement), `industry` (string)
- `order` (number), `published` (boolean, default true)
- `placeholder` (boolean, default false)
- One-to-many with Project, joined on `Project.clientName`

### Project (`projects.ts`) - 7 entries, all `placeholder: true`

- `slug` (unique route key), `title`, `summary`
- `problem`, `approach`, `outcome` (long-form)
- `stack` (string[]), `serviceSlug` (one of the four)
- `clientName` (the Client join)
- `cover` (image path), `gallery` (image path[], default `[]`)
- `date`, `showHomepage` (default false)
- `published` (default true), `placeholder` (default false)

Three real clients carry WebP screenshots of their live sites under
`public/images/work`; four demo entries use the generated brand SVG covers in
`public/images/covers`.

### Service (`services.ts`) - 4 entries

- `slug` - one of `e-commerce`, `website-app`, `landing-page`,
  `ai-agents-automation`. A fifth line is a plan change, not a data edit
- `name`, `tagline`, `description`
- `deliverables` (string[], min 1), `iconKey`, `order`

### PricingPlan (`pricing.ts`) - 6 plans

A service line carries **1..n plans**: e-commerce has three tiers, the others one.

- `serviceSlug`, `name`, `priceBdt` (`0` is the free tier)
- `startingFrom` (renders the `+` in `৳60,000+`), `period`
- `recommended`, `features` (string[], min 1)
- `ctaLabel`, `ctaHref`, `order`

### Faq (`faqs.ts`) - 24 entries, all published

- `category` (drives the rail), `question`, `answer`
- `order`, `published` (default true)
- Module also exports `faqCategories` (rail order) and `publishedFaqs`.
  `faq-data.ts` is a derived view, not a second source

### Technology (`technologies.ts`) - 44 entries, 7 categories

- `name`, `category`, `order`
- `slug` - icon file stem in `public/images/tech`, regex-guarded to lowercase
  alphanumerics. **Added after feature 2; not in project-plan §4**

### TeamMember (`team.ts`) - 3 entries

- `slug` (route key for `team/[slug]`), `name`, `role`, `title`
- `photo` (image path), `bio` (default `''`)
- `socials` (`{ name, href }[]`, default `[]`)
- `order`, `published` (default true), `placeholder` (default false)

### Campaign

- `title`, `subtitle`, `targetDate` (ISO string, parsed client-side)
- `ctaLabel`, `ctaHref`, `active` (default false)

### Testimonial (`testimonials-data.ts`)

- `quote`, `authorName`, `authorRole`
- `clientName`, `avatar`, `avatarAlt` (all optional)

### Lead (runtime, not stored in MVP)

Emailed to the team only; never persisted, never on a public route.

- `name`, `email`, `phone`, `company`
- `serviceLine`, `scopeSummary`, `budgetBand`, `timeline`
- `source`, `submittedAt`

### Analytics event (aggregate only)

- `eventName`, `path`, `referrer`, `deviceClass` - **no PII**: no IP, no user
  id, no fingerprint

**Locked rules all specs must respect:**

- Lead email/phone are sensitive: never on a public route, never in an OG image,
  never logged in plaintext.
- Every content module validates against its Zod schema at build time.
- Unpublish by flag, never by deletion.
- Placeholder content is flagged, never disguised as real. Nothing with
  `placeholder: true` may ship to production.
- Do not claim services, clients, technologies or results FathomXO has not
  provided. No invented metrics.

## Tech stack

Matches the repo; no stack changes proposed.

- **Bun** - runtime and package manager
- **Next.js 16 App Router + React 19 + TypeScript strict** - server components
  by default
- **Tailwind CSS v4** - CSS-first config; brand tokens from
  `src/assets/images/logos/README.txt` exposed in `src/styles/brand.css`
- **GSAP + ScrollTrigger + Lenis** - reveals, hero motion, weighted smooth
  scroll. **One animation runtime only: Framer Motion / Motion must not be
  added.** Under `prefers-reduced-motion` Lenis is disabled and every trigger
  resolves to its final state
- **No carousel library** - Swiper is removed; galleries use CSS scroll-snap
- **React Three Fiber + drei** - hero 3D object, lazily loaded, poster fallback
  (feature 3c, not yet added)
- **Fonts** - Space Grotesk (statement), Inter Tight (body), IBM Plex Mono
  (micro-caps), all via `next/font/google`, Latin subset, `swap`
- **React Hook Form + Zod** - brief form, one schema shared client/server;
  Cloudflare Turnstile for spam (to be added). Zod already validates every
  content module
- **Resend + React Email** - internal alert and branded auto-reply (to be added)
- **Typed content in `src/data`** - no external CMS
- **Vercel Analytics + Speed Insights** - cookieless, no consent banner
- **Quality gates** - ESLint, Prettier, `tsc --noEmit`, Playwright smoke test,
  Lighthouse budget in CI (gates not yet configured; `/tests` and `/ci` own setup)

Two additions made during feature 3, both worth knowing:

- `next.config.ts` sets `dangerouslyAllowSVG` with a `script-src 'none'; sandbox`
  CSP, because the generated case-study covers are first-party SVGs.
- `sharp` (already a Next dependency) is used to crop and encode client
  screenshots. `design/figma-plugin/` generates the Figma style library from the
  same token values; it is a copy of `brand.css` and must be kept in step.

Hard constraint: **fast on a mid-range Android over 4G.** First-load JS budget
is 180 KB per route; the 3D bundle sits outside the budget and never blocks
first paint. A library that breaks the budget loses.

## Monetization

The platform sells nothing directly; it is measured in **qualified briefs per
month**. Revenue behind it: fixed-scope project work (primary), monthly
retainers, productised Starter/Essential/Grow tiers, the studio's own product
releases, and a Post-MVP referral programme. MVP success: 20+ qualified briefs a
month, a third above the mid budget band, first reply inside 24 hours.

## UI/UX

**Direction: engineered dark.** Near-black canvas, one lit physical object,
closer to a product studio than an agency.

- **Colour**: only the tokens in `src/assets/images/logos/README.txt`. Accent
  used **only as a light source**: focus rings, active tab, 3D rig, one accent
  per viewport. Never a gradient behind text. Any hex not traceable to that file
  does not ship.
- **Contrast floor**: 4.5:1 body, 3:1 interactive borders; on accent fills, use
  the dark canvas colour for label text, not white. **See Open questions - the
  CTA labels currently contradict this.**
- **Type**: Space Grotesk for statements at 56-120px, tracking `-0.03em`. Inter
  Tight for body at 16-20px, line-height 1.6. IBM Plex Mono at 11-13px
  uppercase, tracking `0.12em`, for eyebrows, labels and counters. Scale:
  `12 / 14 / 16 / 20 / 24 / 32 / 44 / 60 / 84 / 120`.
- **Layout**: full-bleed dark sections separated by hairline rules, left-aligned
  statement blocks, edge-to-edge lists, nothing centred except the hero.
- **Signature**: the hero 3D object, appearing once; everything else stays flat.
- **Motion**: one orchestrated GSAP timeline on load, then ScrollTrigger reveals
  at ~40% viewport entry, Lenis carrying the weighted scroll. Hovers instant,
  reveals 400-600ms, one shared easing curve, no scroll-jacked snapping. Under
  `prefers-reduced-motion`: Lenis off, triggers resolve, 3D becomes its poster.
- **Voice**: direct, plain verbs, lightly irreverent, never profane. Lowercase
  editorial headings for statements, sentence case for body, mono micro-caps for
  labels. No corporate buzzwords.
- **Quality floor**: responsive from 360px, visible accent focus, tap targets
  >= 44px, every section readable with motion disabled.

**Anti-patterns (do not ship)**: logo-*wall* carousel (a typographic
client-*name* marquee is fine), `01 / 02 / 03` markers on non-sequences, glass
cards over blurred gradients, stock 3D blobs, autoplaying background video.

Main routes: home, `projects` + `projects/[slug]`, `services` +
`services/[slug]`, `pricing`, `faq`, `about`, `team/[slug]`, `contact`, and
`GET /api/health` (to be added).

## Deployment

- **Host**: Vercel, Next.js App Router, Node 20, `sin1` (Singapore) region
- **App type**: server-rendered; content routes fully static at build time
- **Install**: `bun install` | **Build**: `bun run build` | **Output**: `.next`
- **Env vars**: `NEXT_PUBLIC_SITE_URL` (already read by `generateMetaData.ts`),
  `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `TURNSTILE_SITE_KEY`,
  `TURNSTILE_SECRET_KEY`
- **Database/storage**: none in MVP; Neon Postgres arrives with the Post-MVP admin
- **Workers/cron**: none in MVP
- **Health check**: `GET /api/health` returning build SHA and status
- **Domains**: apex + `www` (redirects to apex); preview deploys `noindex`
- **Pre-launch**: `robots.txt`, `sitemap.xml`, OG image route, branded 404/500,
  Lighthouse >= 95 on home. Favicon and touch icon are done

## Open questions

> Resolve these in the plans, then re-run `/overview`.

- **CTA labels contradict the contrast rule, and this is now site-wide.**
  Section 7 sets a 4.5:1 body floor and says to use the dark canvas colour on
  accent fills rather than white. Both hero CTAs and the nav CTA now use
  `--color-ink`, which measures **3.32:1** on the accent (pure white is 3.77:1;
  `--color-accent-ink` is 5.16:1). This was a direct instruction in chat, so the
  code is deliberate and the plan is what is out of date. Either amend section 7,
  or raise the hero label to >= 18.66px bold, where the AA large-text threshold
  drops to 3:1 and light labels pass.
- **Testimonials are rendered but unclaimed.** The module powers a home section
  today, yet no build-plan item names it: section 4 calls it "optional proof on
  service pages" and feature 7 never mentions it. Name it in 7, give it its own
  item, or move it Post-MVP.
- **Section 4's field names have drifted further from the schemas.** Already
  noted: `Project.serviceLine` is `serviceSlug` and gained `clientName`,
  `showHomepage`, `published`, `placeholder`; `Testimonial.clientSlug` is an
  optional `clientName`; `TeamMember` gained `slug`, `bio`, `placeholder`. New
  this round: **`Technology` gained `slug`**. The schemas in
  `src/interface/index.ts` are authoritative; update section 4 to match.
- **Content model is a build-plan feature that section 3 never lists.** Item 2
  is real and complete, but the project plan's feature list jumps from the design
  system to the hero.
- **Case-study media location differs from the plan.** Section 8 says media is
  committed under `src/assets/images`. Shipped images live in `public/images`
  because the content schemas type image fields as string paths, which Next can
  only resolve from `public`; capture originals are kept in
  `src/assets/images/work-source`. Update section 8 or move the contract.
- **Prettier vs line endings**: `.prettierrc` sets `endOfLine: "lf"` but the
  working tree is CRLF and there is still no `.gitattributes`, so
  `prettier --check` fails on untouched files. A `.gitattributes` with
  `* text=auto eol=lf` would settle it; worth its own `/fix`.
