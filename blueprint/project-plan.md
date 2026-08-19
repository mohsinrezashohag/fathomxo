# Project Plan

> Project: **FathomXO** — the studio's own platform.
> Brand colours, logo variants and usage rules are already defined in
> `src/assets/images/logos/README.txt`. That file is the single source of truth:
> this plan and every feature spec refer to those tokens by name and never restate
> or invent hex values.

---

## 1. Problem - What problem are we solving?

Businesses that need software have two bad options. Either a template shop ships
them the same Shopify or WordPress skin it ships everyone, or an offshore dev team
disappears into a six-month build and returns something nobody wants to use.
Neither sells a point of view — they sell hours.

**FathomXO is the studio that ships opinionated, production-grade software fast:**
e-commerce, web and mobile apps, landing pages, and AI agents / automation.

This project is the platform that wins that work, and the intake pipeline behind
it. It has three jobs.

1. **Prove capability in the first five seconds.** For a studio selling design and
   engineering, the site *is* the portfolio. If it looks templated, the pitch is
   dead before the copy is read. A dark, motion-led, 3D-inflected build is the
   argument itself.
2. **Qualify leads instead of collecting them.** A generic contact form produces
   tyre-kickers. A structured brief — service line, scope, budget band, timeline —
   lets us reply inside a day with a real number.
3. **Make pricing legible.** Agencies in this market hide prices, so buyers assume
   the worst. Published tiers per service line remove the single biggest reason a
   founder never sends the first message.

Explicitly **not** solving: this is not client project management, not invoicing,
not a marketplace. Delivery happens in the studio's own tooling. The platform's job
ends when a qualified brief is in the pipeline.

**Reference for density and craft level:** <https://dropoutstudio.co/> — dark
canvas, oversized type as the primary graphic, section-scale statements, a client
roster read as a list rather than a logo wall, tabbed pricing, searchable FAQ. We
take that structural confidence, not its look: our palette comes from the FathomXO
mark, and our signature is a real-time 3D object rather than flat type.

## 2. Users - Who is this for?

**Primary — the founder / owner-operator (25–45, Dhaka, Chattogram, and diaspora).**
Runs an e-commerce brand, a clinic, a D2C label, a small SaaS. Discovers on
Facebook, Instagram and LinkedIn, browses on a mid-range Android over mobile data,
decides fast, is allergic to being talked down to. Wants a price, a timeline, proof.

**Secondary — the marketing or ops lead at an established SME or NGO.** Has a
budget line and an approval chain. Needs a case study and a scope they can take
upstairs. Reads more, converts slower, spends more.

**Tertiary — the technical buyer at a startup or another agency.** Hires us as an
overflow engineering or AI-automation partner. Skims the marketing entirely and
goes to the work, the stack, and whether we hold deadlines.

**Internal — the FathomXO team (2–6 people).** Needs to publish a case study or
change a price without a redeploy becoming a project, and to see every brief in one
place with an owner and a status.

Design consequence: **mobile-first is not a nicety.** Most first sessions are a
phone on a mediocre connection, so the 3D and motion work must degrade to a static
poster frame without breaking layout or message.

## 3. Features - What does the MVP need?

- Dark, token-driven design system and site shell (nav, footer, page transitions)
- Hero with a real-time 3D signature object and an orchestrated load sequence
- Scroll-revealed positioning statements — the studio's point of view in oversized type
- Client roster as a typographic list, each line linking to its case study
- Case study pages: problem, approach, stack, outcome, visuals
- Services across the four lines (E-commerce, Website / App, Landing Page, AI Agents / Automation)
- Tabbed pricing, one tab per service line, tiers in BDT with a clear CTA
- Launch banner with countdown for the studio's own product releases
- Searchable, category-filtered FAQ
- Studio page — who FathomXO is, plus the team with photos, roles and titles
- Multi-step project brief with budget and timeline qualification
- Transactional email: internal alert to the team, branded auto-reply to the sender
- SEO, OG images, structured data, cookieless analytics
- Performance and accessibility pass with reduced-motion and low-end-device fallbacks
- Deployment readiness on Vercel with env vars, health check and custom domain

Deliberately out of MVP scope: database-backed CMS and admin dashboard, blog,
client portal, live chat, online payments, Bangla toggle, careers. MVP content is
typed and version-controlled in the repo; persistence arrives in Post-MVP once the
shape of the content has stopped moving.

## 4. Data - What are we storing?

MVP content is **static and typed**, not database-backed. Content modules live in
`src/data`, their shapes in `src/interface`, so a copy or price change is a pull
request rather than a migration. Only the lead payload leaves the browser.

**Content model — `src/data`, typed by `src/interface`**

| Module | Purpose | Key fields |
| --- | --- | --- |
| `clients` | Roster entries on the home page | name, descriptor, industry, order, published |
| `projects` | Case studies, one-to-many from clients | slug, title, summary, problem, approach, outcome, stack[], serviceLine, cover, gallery[], date |
| `services` | The four service lines | slug, name, tagline, description, deliverables[], iconKey, order |
| `pricingPlans` | Tiers per service line | serviceSlug, name, priceBdt, period, recommended, features[], ctaLabel, ctaHref |
| `faqs` | FAQ entries plus their categories | category, question, answer, order, published |
| `campaigns` | Launch banner and countdown | title, subtitle, targetDate, ctaLabel, ctaHref, active |
| `testimonials` | Optional proof on service pages | clientSlug, quote, authorName, authorRole |
| `team` | Studio members on the About / team page | name, role, title, photo, order, published, optional socials[] |

**Runtime data**

| Object | Purpose | Fields |
| --- | --- | --- |
| Lead (brief submission) | Emailed to the team, not stored in MVP | name, email, phone, company, serviceLine, scopeSummary, budgetBand, timeline, source, submittedAt |
| Analytics event | Aggregate only | eventName, path, referrer, deviceClass |

Rules later feature specs must respect:

- **No PII in analytics.** No IP, no user ID, no fingerprint.
- Lead email and phone are sensitive: never rendered on a public route, never in an
  OG image, never logged in plaintext.
- Every content module validates against a Zod schema at build time, so a malformed
  entry fails the build instead of shipping a broken card.
- Content unpublished by flag stays in the repo — nothing is deleted to hide it.
- When persistence lands (Post-MVP), the Postgres schema mirrors these shapes
  one-to-one so migration is a load, not a redesign.

## 5. Tech - What stack are we using?

Matches what is already in the repo — no stack changes are proposed.

- **Runtime / package manager:** Bun (`bun.lock`)
- **Framework:** Next.js 16 App Router + React 19 + TypeScript strict, React Server Components by default
- **Styling:** Tailwind CSS v4 via PostCSS, with brand tokens from the logos README exposed as CSS variables in `src/styles`
- **Motion:** GSAP + ScrollTrigger for reveals and the hero load sequence, Lenis for smooth scroll. **One animation runtime only — Framer Motion / Motion is not used and must not be added.** Under `prefers-reduced-motion` Lenis is disabled and every ScrollTrigger resolves to its final state
- **Carousels:** none. Swiper is removed; the case-study gallery uses CSS scroll-snap
- **3D:** React Three Fiber + drei for the hero object, lazily loaded, with a pre-rendered WebP poster for mobile, low-power devices and no-WebGL browsers
- **Fonts:** Clash Display (statement type), Satoshi (body), JetBrains Mono (micro-caps and data) — all self-hosted via `next/font/local`, Latin subset, `swap`
- **Forms:** React Hook Form + Zod — one schema shared by client and route handler; Cloudflare Turnstile on the brief
- **Email:** Resend with React Email templates (internal alert + auto-reply)
- **Content:** typed modules in `src/data`, no external CMS, no vendor lock-in. The starter's markdown pipeline (`gray-matter`, `react-markdown`, `rehype-slug`) survives the teardown because it still feeds `/`, `/about`, `/projects/[slug]` and `/services/[slug]`; feature 2 migrates those routes and removes it
- **Analytics:** Vercel Analytics + Speed Insights, cookieless, no consent banner required
- **Quality gates:** ESLint, Prettier, `tsc --noEmit`, a Playwright smoke test on the brief flow, Lighthouse budget in CI

**Repo conventions to follow (already established):**

```
src/
├── app/         routes, layouts, route handlers
├── assets/
│   └── images/logos/{svg,png}   brand marks + README.txt (source of truth)
├── components/  UI, one folder per component
├── context/     React providers
├── data/        typed content modules
├── hooks/       shared client hooks
├── interface/   TypeScript types and Zod schemas
├── styles/      global CSS, token layer, Tailwind entry
└── utils/       pure helpers
```

Planning and build-loop docs live in `blueprint/`. Agent guidance stays in
`AGENTS.md`, `CLAUDE.md`, `ONBOARDING.md`.

**Template teardown (pre-build, not a feature).** The starter's `blog`, `login` and
`signup` routes, their components, and the `swiper` dependency are deleted before
feature 1 begins. **The team route, its section on About, its content and its member
images are real content and are kept** — they are restyled by their own feature, not
removed. The markdown content and parsing chain stay until feature 2 migrates
projects, services and team to typed modules. Git history keeps the removed routes if
a Post-MVP blog wants the pattern back. Dead template code is worse than missing code
here: it is the nearest example in the repo, so every later feature risks copying its
conventions. `coding-standards.md` is updated to describe typed TS content modules
once feature 2 lands.

Hard constraint that drives most decisions: **the site must feel fast on a
mid-range Android over 4G.** Budget is ≤180 KB of first-load JS per route; the 3D
bundle sits outside that budget because it never blocks first paint. A library that
breaks the budget loses.

## 6. Monetize - How will this make money?

The platform sells nothing directly. It is a sales instrument, measured in
**qualified briefs per month**, not sessions.

1. **Project work** — fixed-scope builds per service line, quoted from the brief. Primary revenue.
2. **Retainers** — monthly care plans covering hosting, iterations and automation upkeep. The tabbed pricing exists largely to make retainers feel normal rather than exceptional.
3. **Productised tiers** — a Starter / Essential / Grow ladder that starts free or near-free and monetises growth, so a small merchant can begin today and become a real account later.
4. **Own products** — FathomXO's own releases sell on their own subscription; the countdown banner is their launch surface.
5. **Referral / partner programme** *(Post-MVP)* — tracked codes paying a percentage on closed work.

MVP is judged against: 20+ qualified briefs a month, a third of them above the mid
budget band, first reply inside 24 hours.

## 7. UI/UX - How should this look and feel?

**Direction: engineered dark.** A near-black canvas holding one lit, physical
object — confident, quiet, expensive-looking, closer to a product studio than an
agency. The reference site earns its impact with flat oversized type; we keep that
rhythm and add depth, because depth is what our mark and our 3D capability let us
claim and a template shop cannot copy.

- **Colour:** exactly the tokens defined in `src/assets/images/logos/README.txt` —
  neutral dark ramp for canvas, surfaces and hairlines, and the FathomXO accent used
  **only as a light source**: the 3D rig, focus rings, active tab, one accent per
  viewport. Never a gradient behind text. Any hex not traceable to that file does
  not ship.
- **Contrast floor:** 4.5:1 for body copy and 3:1 for interactive borders against
  the canvas. On accent fills, use the dark canvas colour for label text rather than
  white — a mid-tone accent will not pass with white on top.
- **Type:** **Clash Display** for statement type at 56–120px, tracking `-0.03em`,
  weights mixed inside a single sentence to carry emphasis. **Satoshi** for body at
  16–20px, line-height 1.6. **JetBrains Mono** at 11–13px, uppercase, tracking
  `0.12em`, for eyebrows, section labels, counters and table headers — the utility
  face is what makes the page read as engineered rather than decorated. Scale:
  `12 / 14 / 16 / 20 / 24 / 32 / 44 / 60 / 84 / 120`.
- **Layout:** full-bleed dark sections separated by hairline rules, not padding
  alone. Alternating left-aligned statement blocks and edge-to-edge lists. Generous
  vertical rhythm; nothing centred except the hero.
- **Signature element:** the hero object — a slowly rotating, subtly refractive 3D
  form derived from the FathomXO symbol, lit in the brand accent, reactive to
  pointer position, settling on scroll. It appears once. Everything else stays flat
  and disciplined so it lands.
- **Motion:** one orchestrated GSAP timeline on load (mask-reveal on the headline,
  object fades up, nav settles), then ScrollTrigger reveals at ~40% viewport entry,
  with Lenis carrying the weighted scroll feel. Hover states instant, reveals
  400–600ms, one shared easing curve across the site, no scroll-jacked section
  snapping. Under `prefers-reduced-motion` Lenis is off, triggers resolve to their
  final state immediately, and the 3D object becomes its poster frame.
- **Voice:** direct, plain verbs, lightly irreverent — never profane. Confident
  about the work, not rude about competitors. Buttons say what happens ("Send the
  brief", "See the work"), empty states invite action, errors explain the fix.
  Sentence case throughout, except mono micro-caps.
- **Quality floor:** responsive from 360px, visible keyboard focus in the accent,
  tap targets ≥44px, and every section readable with motion disabled.

Anti-patterns, named so feature specs don't drift into them: no logo-wall carousel,
no `01 / 02 / 03` markers on content that isn't a sequence, no glass cards over
blurred gradients, no stock 3D blob unrelated to the mark, no autoplaying
background video.

## 8. Deployment - Where and how will this ship?

- **Host:** Vercel, Next.js App Router, Node 20 runtime, Singapore (`sin1`) region for latency to Bangladesh
- **App type:** server-rendered Next.js app; content routes fully static at build time since MVP content is in-repo
- **Install command:** `bun install`
- **Build command:** `bun run build`
- **Output:** `.next`, managed by Vercel — no custom start command
- **Env vars (names only):** `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
- **Database / storage:** none in MVP. Case-study media is committed under `src/assets/images`; Neon Postgres arrives with the Post-MVP admin
- **Workers / cron:** none in MVP
- **Health check:** `GET /api/health` returning build SHA and status
- **Domains:** apex + `www`, `www` redirecting to apex; preview deploys carry `noindex`
- **Pre-launch checklist:** `robots.txt`, `sitemap.xml`, OG image route, favicon and PWA icon set generated from the existing `symbol-*.svg` and `app-icon-512.png`, 404 and 500 pages in the brand voice, Lighthouse ≥95 on the home route
