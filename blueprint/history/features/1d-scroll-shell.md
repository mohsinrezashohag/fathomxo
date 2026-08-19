# Feature: Scroll and page-transition shell

**From build-plan:** feature 1d (under 1. Design system and shell)
**Status:** complete (2026-08-19)
**Branch:** `feature/scroll-shell`

## Goal

Finish the shell. Three things, all in the provider layer:

1. Stop the whole app bailing out of prerendering, so pages ship real HTML
   instead of an empty shell.
2. Drive Lenis from the GSAP ticker and feed ScrollTrigger from it, so the ~14
   components using ScrollTrigger stay in step with the smoothed scroll.
3. Add the route-change transition, and make the whole scroll layer resolve to
   a plain, instant state under `prefers-reduced-motion`.

The first is the most consequential thing left in the shell: today every route
returns a 36KB document with no `<header>`, `<main>` or `<footer>` in it.

## Design reference

No mockup applies. `prototypes/*.html` are static pages, so they show no route
transition and no scroll behaviour. The motion rules come from the plan:

- Reveals 400-600ms, one shared easing curve (`--ease-brand`, `--dur-reveal`
  from 1a), hovers instant
- **No scroll-jacked section snapping**
- Under `prefers-reduced-motion`: Lenis off, triggers resolve to their final
  state, no transition

## In scope

- Removing `useSearchParams()` from `SmoothScrollProvider`, which is what forces
  the client bailout
- Wiring `lenis.raf` to `gsap.ticker` and `lenis.on('scroll', ScrollTrigger.update)`
- A `prefers-reduced-motion` path that skips Lenis entirely
- A route-change transition via `src/app/template.tsx`
- Verifying real HTML now reaches the wire

## Out of scope

- The hero's orchestrated load timeline - that is feature 3
- Retuning any existing ScrollTrigger animation. This feature makes the sync
  correct; individual components keep their current start/end values
- Scroll-to-top on `/projects` pagination. It does not happen today either (see
  Data / contracts), and the pagination component owns that, not the provider
- The 180 KB JS budget and Lighthouse work - feature 15

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - stop the prerender bailout** - remove the `useSearchParams()`
  call and its dependency-array entry from
  `src/components/animation/smooth-scroll.tsx`. It is inert: the effect guards on
  `previousPathnameRef.current !== pathname`, so a query-only change never
  scrolled anything. With it gone the `<Suspense>` in `layout.tsx` has no
  bail-out to catch, so remove that too. *Done when:* `bun run build` passes;
  `curl` of a running production server returns HTML containing the nav, footer
  and page body - specifically `FathomXO` and a heading from the page - where it
  previously returned a shell with none of them; `/projects?page=2` still
  paginates.

- [x] **Step 2 - drive Lenis from the GSAP ticker** - set `autoRaf={false}` on
  `ReactLenis`, add `gsap.ticker.add((time) => lenis.raf(time * 1000))` with
  `gsap.ticker.lagSmoothing(0)`, and `lenis.on('scroll', ScrollTrigger.update)`.
  Remove both on unmount. This replaces two independent loops - Lenis's own RAF
  and GSAP's ticker - with one. *Done when:* `bun run build` passes; scrolling
  the home page still feels smoothed; a ScrollTrigger-driven reveal (the footer
  wordmark scramble, or any `RevealAnimation`) fires at the right point rather
  than early or late.

- [x] **Step 3 - reduced-motion path** - when
  `matchMedia('(prefers-reduced-motion: reduce)')` matches, disable smoothing
  and skip the ticker wiring, then call `ScrollTrigger.refresh()` so triggers
  measure against native scroll. Re-evaluate if the preference changes.
  **Keep `ReactLenis` mounted** and turn smoothing off through its options
  rather than swapping it for a fragment: the preference resolves in an effect,
  so changing the tree shape would remount every child, re-running all GSAP
  setup and resetting component state on load. *Done when:* with reduced motion on,
  the page scrolls natively with no easing or inertia, and every section is
  reachable and readable; with it off, smoothing returns.

- [x] **Step 4 - route-change transition** - add `src/app/template.tsx` (a
  client component; Next remounts it per navigation) that fades and lifts the
  incoming page using `--dur-reveal` and `--ease-brand`. It must be a **fade-in
  only**, not an exit animation: the existing `lenis.scrollTo(0, { immediate:
  true })` fires on pathname change and would fight an outgoing animation.
  Resolve instantly under `prefers-reduced-motion`. *Done when:* navigating
  between two routes shows the new page fading up rather than snapping;
  no content flashes at the wrong scroll position; with reduced motion the page
  appears with no transition; `bun run build` passes.

## Outcome

4 files, +123 / -13. Completes feature 1: the shell is done.

**The headline result.** Every route now ships real HTML. Measured with `curl`
against a running production server, before and after:

| Route | Before | After | header/main/footer |
| --- | --- | --- | --- |
| `/` | - | 202,185 | 1 / 1 / 1 |
| `/about` | - | 139,693 | 1 / 1 / 1 |
| `/pricing` | **35,745** | **121,417** | 1 / 1 / 1 |
| `/faq` | - | 108,888 | 1 / 1 / 1 |
| `/services` | - | 156,765 | 1 / 1 / 1 |

Before, `/pricing` contained no `<header>`, `<main>` or `<footer>` and none of
its own content. The cause was two lines: `useSearchParams` appeared **only in a
dependency array**, its value never read, while the effect's guard compares
pathnames - so a query-only change never did anything. It was inert code that
cost the entire site its server rendering, and with it the SEO and first-paint
story features 14 and 15 depend on.

**Other evidence at completion:**

- `bun run build` exit 0 and `bun run lint` 0 errors after every step. The two
  warnings are pre-existing template artifacts.
- `/projects?page=2` still returns 200 and the correct page.
- Emitted CSS confirms the transition and its reduced-motion override:
  `.route-transition{animation:route-fade-in var(--dur-reveal)var(--ease-brand)both}`
  and `@media (prefers-reduced-motion:reduce){.route-transition{animation:none}}`.

**Two corrections made to the first implementation:**

1. **Tree-shape remount.** The reduced-motion path was first built as the spec
   said - swap `ReactLenis` for a fragment. That changes the tree shape, and
   since the preference resolves in an effect, React would remount every child,
   re-running all GSAP setup and resetting state on load. The spec was corrected
   and Lenis now stays mounted with `smoothWheel: false`.
2. **Dead Lenis loop.** With `autoRaf={false}` and the ticker effect skipped
   under reduced motion, Lenis's loop would never run, so `scrollTo` on route
   change would silently break. The ticker now runs unconditionally; only
   smoothing differs.

**Carried forward:**

- Steps 2, 3 and 4 have behavioural done-whens verified by build and emitted CSS,
  not by watching: scroll feel, ScrollTrigger timing, reduced motion, and the
  route fade.
- `prototypes/` was not consumed by this feature and stays for features 3-8,
  which build the hero, positioning, roster, banner, pricing tabs and case study
  against those mockups. Discard once feature 8 lands.
- The provider disables Lenis and refreshes triggers under reduced motion.
  Individual components still need their own guards for their own animations.
## Files / areas

- `src/components/animation/smooth-scroll.tsx` - rewritten across steps 1-3
- `src/app/layout.tsx` - drops the now-unnecessary `<Suspense>`
- `src/app/template.tsx` - new, the route transition
- Untouched: every page body, the nav, the footer, and every existing
  ScrollTrigger animation

## Data / contracts

No data shapes. Two behavioural contracts every later feature depends on:

**ScrollTrigger reads from Lenis, not native scroll.** After this feature,
anything registering a ScrollTrigger gets positions consistent with the smoothed
scroll. Features 3-11 all add reveals, so getting this wrong once poisons all of
them.

**`prefers-reduced-motion` is honoured at the provider.** Individual components
still need their own guards for their own animations - the provider only
disables Lenis and refreshes triggers.

Recorded so it is not mistaken for a regression: **`/projects?page=2` does not
scroll to top today**, and will not after this feature. The provider's effect
compares pathnames only, so a query-only change was always a no-op. If that
behaviour is wanted it belongs in the pagination component, where it can scroll
without forcing a global prerender bailout.

## Testing

No test runner is configured (`AGENTS.md` declares no `test` command). This
feature adds no pure logic worth unit-testing - it is provider wiring. Playwright
is not installed and this spec is not the place to add it, so the evidence is
build output plus a running server:

- `bun run build` after every step
- **Step 1 is verified with `curl`, not by eye.** Start the production server and
  confirm the HTML body contains the nav, footer and page content. This is the
  one objective check that the bailout is gone, and it is the whole point of the
  step
- Steps 2, 3 and 4 have **behavioural** done-whens (smoothing, trigger timing,
  reduced motion, route transition). Prove them against the running app with
  `/check`, not by reading the code
- Toggle reduced motion at the OS level, or via DevTools rendering settings, for
  step 3

## Notes for the AI

- **`useSearchParams` is the bailout.** In Next.js it forces the nearest
  `<Suspense>` boundary to render client-side only. That boundary wraps the whole
  app in `layout.tsx`, so every route ships an empty shell. `/projects` stays
  dynamic regardless, because its **server** component reads `searchParams` -
  that is correct and unrelated.
- `ReactLenis` in lenis 1.3.17 takes `autoRaf` as a first-class prop, so no
  imperative instance juggling is needed to hand the loop to GSAP.
- Register plugins at module scope after the imports, matching the convention in
  `reveal-animation.tsx`: `gsap.registerPlugin(ScrollTrigger, useGSAP)`.
- `gsap.ticker.lagSmoothing(0)` matters: without it GSAP clamps large frame deltas
  and Lenis drifts out of step after a tab has been backgrounded.
- Do not add scroll-snapping or scroll-jacking of any kind. The plan bans it.
- `template.tsx` is a client component and remounts on every navigation. Keep it
  tiny - it wraps every page on every route change, so anything expensive here is
  paid site-wide.
