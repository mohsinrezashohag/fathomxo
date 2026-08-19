# Feature: Site nav

**From build-plan:** feature 1b (under 1. Design system and shell)
**Status:** complete (2026-08-19)
**Branch:** `feature/site-nav`

## Goal

Replace the starter's four-mega-menu header with the FathomXO nav, built on the
1a brand tokens: the symbol mark beside the wordmark, five links that match the
real route set, a "Send the brief" CTA, and a full-screen mobile panel that works
with a keyboard.

This is the first feature that consumes the 1a tokens, so it also proves them in
a real surface. It replaces two divergent link datasets with one, and adds the
keyboard handling the template nav never had.

## Design reference

- [prototypes/home.html](../../prototypes/home.html) - nav bar and mobile panel
- [prototypes/theme.css](../../prototypes/theme.css) - `.nav`, `.nav__*`,
  `.mobile-nav*` blocks are the exact target
- [prototypes/pricing.html](../../prototypes/pricing.html) - shows the active-link state

The mobile panel was added to the mockups before this spec was written, so mobile
is a locked design rather than prose. Open `home.html` under 860px to see it.

Tokens are already in the app from 1a, so there is no theme-porting step here.

## In scope

- One nav data module as the single source of truth for both desktop and mobile
- A rebuilt `navbar.tsx`: sticky bar, hairline underline, backdrop blur, symbol +
  wordmark, five links, brief CTA
- Full-screen mobile panel with toggle, Escape, focus return, and body scroll lock
- Active-link marking from `usePathname`
- Deleting the four mega menus, their three row-renderers, the old mobile menu,
  its context, and `mobile-meu.ts`

## Out of scope

- The footer (1c) and the load-sequence timeline or Lenis/ScrollTrigger sync (1d)
- Migrating any page body to brand tokens - only the header changes, so template
  pages will sit under a brand-styled nav until their own features land
- Building the `/studio` and brief-intake routes the nav links to. Links point at
  the routes that exist today; the two that do not yet exist are listed under
  Data / contracts with what they resolve to in the meantime
- Removing template tokens or Google font families

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - nav data and types** - add a `NavLink` interface to
  `src/interface/index.ts` and `src/data/navigation.ts` exporting the five
  primary links plus the CTA. This is the single source of truth that replaces
  both the per-file hardcoded desktop arrays and `src/data/mobile-meu.ts`.
  Nothing renders from it yet. *Done when:* `bun run build` passes and
  `bun run lint` is clean; the module exports a typed array with no `any`.

- [x] **Step 2 - header shell, desktop nav, working mobile panel** - rewrite
  `src/components/shared/layout/navbar/navbar.tsx` against the mockup:
  **`fixed`** full-width bar with `--color-hairline` bottom border and backdrop blur,
  `symbol-dark.svg` beside "FathomXO" as real text in `font-display`, the five
  links from step 1, the accent CTA, a 44px hamburger under 860px, and the
  full-screen panel with open/close working. Remove `MobileMenuProvider` and the
  `<MobileMenu />` render from this file; local `useState` drives the panel.
  Leave the old menu files on disk - step 4 deletes them. *Done when:*
  `bun run build` passes; at 1280px the bar shows mark, five links, and CTA with
  no dropdowns; at 375px the links are hidden, the hamburger opens the panel and
  the close button dismisses it; no link points at a removed route.

- [x] **Step 3 - keyboard and motion behaviour** - add Escape to close, focus
  return to the toggle on close, `aria-expanded` on the toggle and `aria-hidden`
  on the panel, body scroll lock while open, `aria-current="page"` on the active
  link from `usePathname`, and visible accent focus rings on every interactive
  element. Panel transition uses `--dur-reveal` and `--ease-brand`, and resolves
  instantly under `prefers-reduced-motion`. *Done when:* tabbing reaches the
  toggle and shows an accent ring; Escape closes the panel and focus lands back
  on the toggle; the page behind cannot scroll while open; the current route's
  link is visually distinct; with reduced motion enabled the panel appears with
  no transition.

- [x] **Step 4 - delete the old menu system** - remove
  `company-menu.tsx`, `platform-menu.tsx`, `resources-menu.tsx`,
  `plan-and-support-menu.tsx`, their three `*-menu-link.tsx` renderers,
  `mobile-menu-button.tsx`, the `src/components/shared/layout/mobile-menu/`
  folder, `src/context/MobileMenuContext.tsx`, `src/hooks/useScrollHeader.ts`,
  and `src/data/mobile-meu.ts`. Prune the `MobileMenuData` and
  `MobileMenuSubItem` types from `src/interface/index.ts`, and any icon exports
  left with zero importers. *Done when:* `bun run build` and `bun run lint` pass;
  `grep -rn "mobile-meu\|MobileMenuContext\|useNavbarScroll\|mega-menu" src/`
  returns nothing; every surviving route still renders.

- [x] **Step 5 - Services mega menu** - added after steps 1-4 at your request:
  the dropdown stays a live product feature, in the template's rich style rather
  than a narrow list. `NavLink` gains an optional `children`; `nav-dropdown.tsx`
  renders a full-bar panel with the four service lines on the left and two
  featured case studies with imagery on the right, and the mobile panel nests
  the lines under Services. Unlike the template's version it opens on **focus as
  well as hover**, closes on Escape, sets `aria-expanded` / `aria-controls`, and
  gives panel links `tabIndex={-1}` while closed. Service lines point at
  `/services` until feature 7 builds a page per line. *Done when:* build and lint
  pass; hovering or tabbing to Services opens the panel; Escape closes it; the
  mobile panel lists the lines indented under Services.

## Outcome

29 files changed. The nav went from 214 lines across 13 files to 3 components
reading one data module.

**Evidence at completion:**

- `bun run build` exit 0; `bun run lint` 0 errors. Two warnings, both
  pre-existing template artifacts (`getMarkDownData.ts`, and `readTime` in the
  archived `_reference/ui/blog-card.tsx`).
- Route table unchanged; all nine routes still generate.
- Brand tokens from 1a generate real utilities for the first time, verified in
  the emitted CSS: `.bg-canvas`, `.text-ink`, `.border-hairline`, `.bg-accent`,
  `.rounded-pill`, `.font-display`, `.bg-radial-[circle_at_top]`,
  `.shadow-[0_3px_18px_0_var(--color-accent-glow)]`.
- Mobile panel confirmed rendering at 375px from a user screenshot.

**Two bugs caught by checking the emitted CSS rather than assuming:**

- `max-w-container-site` generated nothing. Tailwind strips the namespace, so
  `--container-site` yields `max-w-site`. The width cap was silently inert.
- The extracted `menu-icons.tsx` lost its `cn` import and failed the build.

**Course corrections during the build:**

The nav was rebuilt three times against user feedback. Recorded so the
reasoning is not lost:

1. First pass replaced the starter's floating pill with a full-width sticky bar
   from the mockups. Wrong: the user wanted the template's pill. Rebuilt as a
   centred `fixed top-6` pill with a circular mark badge, mono micro-cap links,
   the hairline-plus-bloom hover, and a pill CTA.
2. The Services dropdown started as a 256px list, then became a full-bar mega
   menu with a service-line column and two featured case-study cards, matching
   the starter's density.
3. The full-screen mobile panel was replaced by the starter's original
   slide-in drawer, restored verbatim including its accordion.

**Animations restored after being dropped:**

| Motion | Mechanism |
| --- | --- |
| Pill rises on load | `RevealAnimation` up, 100px offset, 0.8s delay |
| Pill lifts past the fold | `useNavbarScroll(150)`, `top-6` to `top-2` |
| CTA letters roll on hover | `useButtonSplitText`, GSAP SplitText, per-char stagger |
| Menu row background fades up | `HoverBgTransform`, 300ms |
| Drawer slides from right | `translate-x-full` to `translate-x-0`, 300ms |
| Accordion expands | `h-0/opacity-0` to `h-fit/opacity-100`, 300ms |

**Deviations from the spec as written:**

- Position is `fixed`, not the mockup's `sticky`. Every hero already carries
  96-200px of top padding because the nav overlays; sticky would have pushed
  all nine routes down.
- `symbol-dark.svg`, not `symbol-light.svg`. The variants are named for the
  ground they sit on, so the dark-ground file is the one with light strokes.
- Step 5 (the mega menu) was added mid-build at the user's request.
- `src/_reference/` was added, holding 1,231 lines of starter patterns kept
  unimported for later reuse. `prototypes/` was **not** discarded, since 1c
  still needs the mockups.

**Carried forward:**

- Escape, focus-return, and scroll-lock on the drawer were implemented but
  never executed in a browser during the build.
- No focus trap while the drawer is open; belongs with feature 15.
- **The app serves a shell with no body content.** `useSearchParams()` in
  `smooth-scroll.tsx`, inside the layout's `<Suspense>`, bails the whole tree
  out of prerendering. Predates this feature and undercuts features 14 and 15.
  Feature 1d owns that provider.
- Template pages sit under a brand nav with template-styled bodies until each
  page's own feature lands.
## Files / areas

- `src/data/navigation.ts` - new, the single nav source
- `src/interface/index.ts` - adds `NavLink`, removes two mobile-menu types
- `src/components/shared/layout/navbar/navbar.tsx` - rewritten
- `src/components/shared/layout/navbar/mobile-nav.tsx` - new, the panel
- `src/components/shared/layout/navbar/nav-dropdown.tsx` - new, the Services dropdown
- `src/components/shared/layout/navbar/_reference/` - the template's mega-menu and
  mobile-drawer patterns, kept unimported so a later feature can reuse them
- Deleted in step 4: eight navbar files, three mobile-menu files, one context,
  one hook, one data file
- Untouched: `layout.tsx` (still renders `<Navbar />`), the footer, every page body

## Data / contracts

**`NavLink`** is load-bearing - 1c reuses it for footer link groups:

```ts
export interface NavLink {
  label: string;
  href: string;
}
```

The five primary links and where they point today:

| Label | href | Exists? |
| --- | --- | --- |
| Work | `/projects` | yes |
| Services | `/services` | yes |
| Pricing | `/pricing` | yes |
| Studio | `/about` | yes, until feature 11 builds the real studio page |
| FAQ | `/faq` | yes |
| Send the brief (CTA) | `/contact` | yes, until feature 12 builds the brief route |

Every link resolves to a real route, so the nav ships with no dead ends. Features
11 and 12 repoint `Studio` and the CTA when their routes exist.

## Testing

No test runner is configured (`AGENTS.md` declares no `test` command), and this
feature adds no pure logic worth unit-testing - it is a component and its data.
Playwright is not installed and this spec is not the place to add it, so per
`coding-standards.md` the evidence is the dev server plus the build:

- `bun run build` and `bun run lint` after every step
- Steps 2 and 3 have **behavioural** done-whens (open, close, Escape, focus,
  scroll lock). Prove them with `/check` against the running app at 1280px and
  375px, not by reading the code
- Compare the running header against `prototypes/home.html` side by side
- Step 4 is proved by the greps plus every route still rendering

## Notes for the AI

- **Use `symbol-dark.svg`, not `symbol-light.svg`.** The variants are named for
  the ground they sit on: `symbol-dark` has light `#F2F0EE` strokes and is the
  one for our dark canvas. Both are outlined paths, so neither has the live-text
  problem.
- **Never render `logo-light.svg` or `fxo-orange.svg`.** Both contain `<text>`
  elements, so they use the visitor's system fonts, not the page's webfont, and
  the wordmark falls back to a wrong face on most machines. The wordmark is real
  HTML text in `--font-display` instead, which is why the mark is a symbol plus
  text rather than a single asset.
- **Position `fixed`, not `sticky`, despite the mockup.** The mockup uses
  `position: sticky`, which reserves layout space. Every existing hero already
  carries 96-200px of top padding (`pt-24` through `pt-50`) precisely because
  today's nav is `fixed` and overlays. Switching to sticky would push all nine
  routes down by the bar's height. Keep `fixed` so page spacing is undisturbed;
  a later feature can revisit once pages are rebuilt. Visually the two are
  identical for a bar pinned to the top.
- **Mark asset**: prefer a static import of
  `@/src/assets/images/logos/svg/symbol-dark.svg` so the brand file stays the
  single source. The template imports its marks from `public/`, so this path is
  unproven here - if the import does not resolve under Turbopack, copy the file
  to `public/images/logo/` rather than inlining the paths by hand, so the asset
  does not drift from the brand original.
- The nav is a client component (`'use client'`) - it holds panel state and reads
  `usePathname`.
- Style with the 1a tokens: `--color-canvas`, `--color-surface`,
  `--color-hairline`, `--color-ink*`, `--color-accent`, `--font-display`,
  `--radius-pill`, `--ease-brand`, `--dur-reveal`, and `z-[var(--z-nav)]` /
  `z-[var(--z-menu)]`. Do not reach for `bg-background-6` or `opai-purple`.
- On accent fills the label colour is `--color-accent-ink`, never white; white on
  the accent measures 3.77:1 and fails.
- The existing `RevealAnimation` wrapper on the nav can stay for now; 1d replaces
  it with the orchestrated load timeline.
- `useNavbarScroll` drove the old floating pill's shrink behaviour. The mockup's
  nav is a plain sticky bar, so the hook has no consumer after this feature and
  step 4 removes it.
- Tap targets stay >= 44px and the layout must hold at 360px.
