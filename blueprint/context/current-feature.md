# Feature: Hero section

**From build-plan:** feature 3a (under 3. Hero and 3D signature)
**Status:** in progress - step 1 done, plus a body of directed work outside the
original scope (see "Work landed outside this spec")

## Goal

Replace the starter's hero with the FathomXO one: the eyebrow, the statement
headline, the supporting line and both CTAs from the content brief, on the 1a
brand tokens.

This is the first five seconds the plan says the whole site is judged on, and
the first surface built from the brief's own words. It also produces the symbol
treatment that 3c reuses as the 3D object's poster, so the fallback exists
before the thing it falls back from.

## Design reference

- [prototypes/home.html](../../prototypes/home.html) - the `.hero` block: centred
  block, symbol frame with an accent bloom behind it, headline, two CTAs
- [../reference/content-brief.md](../reference/content-brief.md) section 1 - the
  copy, verbatim

The mockup's headline reads "Software with a point of view." **The brief wins**:
"building software that actually works." The mockup was written before the
brief existed.

Tokens are in the app from 1a, so there is no theme-porting step.

## In scope

- `src/components/home/hero.tsx` rebuilt: eyebrow, headline, supporting line,
  primary and secondary CTA
- A symbol treatment - the mark on the accent bloom - built in CSS and SVG, sized
  and positioned so 3c can swap a canvas into the same box
- Removing the starter's hero video modal, which has no place in the brief
- Lowercase editorial headline, per the voice rule the brief forced into the plan

## Out of scope

- The orchestrated load timeline - 3b. This feature uses the existing
  `RevealAnimation` and `TextReveal` so the hero is not static, but the single
  GSAP timeline that sequences headline, symbol and nav is 3b's job
- Any WebGL, `three`, React Three Fiber or drei - 3c
- The positioning statements below the hero - feature 4
- Wiring the primary CTA to a real brief route - feature 12 builds it; the CTA
  points at `/contact` as the nav and pricing already do

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - hero copy and layout** - rewrite
  `src/components/home/hero.tsx` with the brief's section 1 copy on 1a tokens:
  mono eyebrow, the two-line lowercase statement headline in `font-display`, the
  supporting line, and both CTAs. Use `AccentLinkButton` for "Let's build" so it
  carries the split-text hover the rest of the site uses. Remove the video modal,
  its `PlayIcon` trigger and the `heroThumbImg` import. *Done when:* `bun run
  build` and `bun run lint` pass; `/` shows the brief's exact copy; no
  `bg-background-*` or `opai-*` class remains in the file; the headline is
  lowercase.

- [~] **Step 2 (original) - symbol treatment** - SUPERSEDED, see the step below.
  Kept so 3c can see what it inherited: the CSS/SVG symbol poster was never
  built, so 3c owns it. The original wording was: add
  `src/components/home/hero-symbol.tsx` rendering `symbol-dark.svg` inside a
  square frame with the `--color-accent-glow` radial bloom behind it, matching
  the mockup's `.hero__object`. This is a server component with no interactivity.
  Give the frame a stable, documented size so 3c can mount a canvas into the same
  box without the layout shifting. *Done when:* build passes; the symbol renders
  centred above the headline at 1280px and 375px; the frame's box is the same
  size with and without the symbol loaded, so nothing reflows.

- [x] **Step 2 - hero motion field** - superseded by direction in chat. Instead of
  a single symbol treatment above the headline, the hero carries two pointer-reactive
  layers: `hero-dot-field.tsx` (three halftone spheres, parallax + tilt + proximity
  bounce) and `hero-tech-bubbles.tsx` (fourteen brand-coloured technology bubbles
  drifting around the statement, hidden below `md`). The showreel frame below the
  CTAs holds the slot the starter's hero image used. *Done when:* build and lint
  pass; both layers respond to the pointer; both resolve to a static state under
  `prefers-reduced-motion`. **The symbol treatment 3c needs as its poster is still
  unbuilt** - that debt moves to 3c.

- [ ] **Step 3 - remove the starter's hero video** - delete
  `src/components/home/hero-video.tsx` and the `VideoModal` wiring on the home
  page if nothing else renders them, plus `ModalContext` and `useModal` if they
  are left with no consumer. Check before deleting: the modal context may be
  used elsewhere. *Done when:* build and lint pass; a grep for `HeroVideo` and
  `videoModal` across `src/` returns nothing; `/` renders and the home page has
  no autoplaying or modal video, which the plan lists as an anti-pattern.

## Work landed outside this spec

Directed in chat while 3a was open. Recorded here so `/complete` archives an
honest account, and noted against the owning items in `build-plan.md`.

**Content (features 5, 6, 11)**

- `src/data/clients.ts` - three real clients with engagement lines; the nine
  example names removed
- `src/data/projects.ts` - seven case studies (three real, four demo), all
  `placeholder: true`; brand SVG covers in `public/images/covers`
- `src/data/team.ts` - the three real members with the photos that were already
  in `src/assets/images/team`, replacing six fictional starter entries
- `blueprint/reference/content-brief.md` - an addendum recording all of it,
  including what is still missing
- `public/images/work/README.md` - where the real client screenshots go

**Technology capability grid (feature 7)**

- `src/components/shared/technologies.tsx` - seven tabbed categories over 44
  technologies, mounted on `/` and `/services`
- `public/images/tech/*.svg` - Simple Icons marks, recoloured to each brand hex;
  ten whose hex is darker than the canvas fall back to the ink token so they are
  visible rather than invisible
- `technologySchema` gained `slug`

**Branding and SEO (feature 14, partial)**

- `src/utils/generateMetaData.ts` - FathomXO defaults, `NEXT_PUBLIC_SITE_URL`
- Every route title and description; all 51 `Nexsas` strings replaced
- `src/app/icon.png`, `src/app/apple-icon.png` from the brand PNGs
- `<main>` moved off `bg-background-6` onto `bg-canvas`
- Footer: the second horizontal rule removed (`Divider` deleted; `BottomBar`
  already draws its own top border)

## Files / areas

- `src/components/home/hero.tsx` - rewritten
- `src/components/home/hero-symbol.tsx` - new, and 3c's fallback
- `src/components/home/hero-dot-field.tsx` - new in step 1: halftone spheres
  behind the statement, pointer-parallaxed and tilted, after the dropoutstudio
  reference the plan already names. No WebGL, so it is also 3c's low-end path
- `src/components/shared/ui/button/ghost-link-button.tsx` - new in step 1: the
  secondary CTA needed a brand-token pill carrying the same split-text hover as
  `AccentLinkButton`, and three surfaces were already inlining that border
- `src/components/shared/ui/button/cta-ornaments.tsx` - new in step 1: the
  starter's hero-button arrow badge and halo rings, kept and recoloured to the
  accent, shared by both hero CTAs
- `src/components/shared/ui/button/accent-link-button.tsx` - step 1: `size="hero"`
- `src/styles/common.css` - step 1: the halo breathe keyframe and its
  reduced-motion off switch
- `src/utils/cn.ts` - step 1: register the brand type scale with tailwind-merge,
  which otherwise files `text-12` under colour and drops `text-ink-muted`
- `src/components/home/hero-video.tsx` - deleted in step 3
- `src/app/page.tsx` - only if the video modal is wired there
- `src/context/ModalContext.tsx`, `src/hooks/useModal.ts` - step 3, only if orphaned
- Untouched: every other home section, the nav, the footer, `src/data`

## Data / contracts

No data modules and no schemas. The hero's copy is short and singular, so it
lives in the component rather than `src/data` - a content module for one hero
would be indirection with no reader.

One contract 3c depends on, and the reason step 2 exists at all:

**The symbol frame's box is load-bearing.** 3c mounts a WebGL canvas into the
same square and falls back to this treatment when WebGL is unavailable, the
device is low-power, or motion is reduced. Both states must occupy identical
space, or swapping them shifts the page.

Copy, verbatim from brief section 1:

| Element | Text |
| --- | --- |
| Eyebrow | `SOFTWARE STUDIO — DHAKA, BANGLADESH` |
| Headline | `building software` / `that actually works.` |
| Supporting | `We turn ambitious ideas into websites, apps, platforms, and AI-powered products people actually want to use.` |
| Primary CTA | `LET'S BUILD` |
| Secondary CTA | `SEE OUR WORK` |

## Testing

`AGENTS.md` declares no `test` command, so no test gate is active. This feature
adds no logic - it is a component and its copy.

- `bun run build` and `bun run lint` after every step
- **Compare the rendered hero against `prototypes/home.html` side by side** at
  1280px and 375px. The copy differs deliberately, the layout should not
- Step 2's done-when is measurable, not a matter of taste: the frame's box must
  be identical with and without the symbol, so 3c's swap does not reflow
- Step 3 is proved by the greps plus `/` still rendering

## Notes for the AI

- **The brief's copy wins over the mockup's.** The mockup predates the brief.
  Where they disagree on words, use the brief; where they disagree on layout,
  use the mockup.
- Lowercase editorial headline. The plan's voice rule was rewritten for exactly
  this: statements are lowercase, body is sentence case, labels are mono
  micro-caps.
- Style with 1a tokens only: `--color-canvas`, `--color-ink*`, `--color-accent`,
  `--color-accent-glow`, `--font-display`, `--font-mono`, `--tracking-display`,
  `--tracking-mono`, `--text-*`. No `bg-background-*`, no `opai-*`.
- The hero is the **one centred block on the site**; everything below it is
  left-aligned. Do not centre other sections to match.
- Use `symbol-dark.svg` - the variants are named for the ground they sit on, and
  ours is dark. Never `logo-light.svg` or `fxo-orange.svg`: both contain `<text>`
  and render in the visitor's fonts.
- Keep the hero a **server component** if possible. `AccentLinkButton` is already
  a client component, so the section itself need not be.
- The accent bloom is the one accent in this viewport besides the CTA. Do not add
  a third.
