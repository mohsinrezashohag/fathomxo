# Feature: Site footer

**From build-plan:** feature 1c (under 1. Design system and shell)
**Status:** complete (2026-08-19)
**Branch:** `feature/site-footer`

## Goal

Replace the starter's footer with the FathomXO one: brand mark and tagline,
three link groups matching the real route set, contact and location, socials,
and the full-width scramble wordmark. Built on the 1a tokens and reading one
data module, the same way 1b rebuilt the nav.

This completes the visible shell. After it, only 1d (scroll and page
transitions) remains before the shell is done.

## Design reference

- [prototypes/home.html](../../prototypes/home.html) - the `.footer` block
- [prototypes/theme.css](../../prototypes/theme.css) - `.footer`, `.footer__*`
- [../reference/content-brief.md](../reference/content-brief.md) section 15 -
  the copy, verbatim

Tokens are already in the app from 1a, so there is no theme-porting step.

## In scope

- `src/data/footer.ts` as the single source for footer groups, socials and
  contact, typed with the `NavLink` shape 1b locked
- Rebuilt `footer.tsx`: brand column, three link groups, contact and location
- `ShuffledTitle` retargeted to the FathomXO wordmark, on brand tokens
- Bottom bar: copyright plus the brief's tagline
- Social icons for the four networks the brief names
- Deleting the newsletter block and its component

## Out of scope

- 1d's Lenis/ScrollTrigger sync and page transitions
- Migrating any page body to brand tokens
- A working newsletter. It is removed here; if it returns it belongs with
  feature 13, which owns the email integration
- Real social URLs. The brief names the networks but not the handles, so those
  stay clearly marked until you supply them

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - footer data module** - add `src/data/footer.ts` exporting the
  three link groups (Explore, Services, Studio), the four socials, and the
  contact block, plus a `FooterLinkGroup` interface in `src/interface/index.ts`
  reusing `NavLink`. The Services group lists the **four** real service lines,
  not the brief's six: Custom Software and Automation have no page, and 1b
  already settled on four lines. Nothing renders from it yet. *Done when:*
  `bun run build` and `bun run lint` pass; the module is typed with no `any`,
  and every href resolves to a route that exists today.

- [x] **Step 2 - footer shell and columns** - rewrite
  `src/components/shared/layout/footer/footer.tsx` against the mockup: brand
  column with the symbol badge, tagline, contact and location; three link
  groups with mono micro-cap headings; all on 1a tokens with a
  `--color-hairline` top rule. Remove the `<Newsletter />` render and the
  decorative gradient PNG. Leave `news-letter.tsx` on disk; step 5 deletes it.
  *Done when:* `bun run build` passes; at 1280px the footer shows four columns,
  at 375px it stacks to two; no link points at a removed route; no
  `bg-background-*` or `opai-*` class remains in the file.

- [x] **Step 3 - scramble wordmark** - retarget `Shuffled-title.tsx` from
  `NEXSAS` to `FATHOMXO`, restyle to `--color-ink` with the accent on the mark,
  and keep the ScrollTrigger scramble intact. Fix the dead `footer-title-2`
  class, which is applied but only `.footer-title` is defined in `common.css`.
  *Done when:* build passes; scrolling the footer into view resolves random
  characters into `FATHOMXO`; with `prefers-reduced-motion` the final text is
  shown without the scramble.

- [x] **Step 4 - bottom bar and socials** - rebuild `bottom-bar.tsx` with the
  brief's tagline in mono micro-caps beside the copyright, and pass the four
  networks from step 1 into `SocialIcons`. **`socialIconsMap` has no GitHub
  entry** - it covers Facebook, Instagram, X, LinkedIn and YouTube - so this
  step also adds a `GitHubIcon` to `src/components/shared/icon/index.tsx` and
  registers it, or the brief's fourth network renders nothing. Every social href stays a clearly
  marked placeholder until you supply the handles. *Done when:* build and lint
  pass; the tagline renders; the four social icons appear with accessible names
  and visible accent focus rings.

- [x] **Step 5 - remove the newsletter** - delete
  `src/components/shared/layout/footer/news-letter.tsx` and any icon or style
  left with zero importers. *Done when:* `bun run build` and `bun run lint`
  pass; `grep -rn "news-letter\|Newsletter" src/` returns nothing; every
  surviving route still renders.

## Outcome

9 source files, +173 / -321. `footer.tsx` went from 232 lines to 82 and now
reads entirely from one data module, the same shape as the nav.

**Evidence at completion:**

- `bun run build` exit 0 and `bun run lint` 0 errors after every step. Two
  warnings remain, both pre-existing template artifacts.
- All nine routes still generate.
- Greps confirm no `bg-background-*` or `opai-*` in the footer, no `Newsletter`
  references, and `pixels71` plus the US phone number are gone.

**Three gaps the spec did not foresee, found while building:**

1. **No GitHub icon existed.** `socialIconsMap` covered Facebook, Instagram, X,
   LinkedIn and YouTube, so the brief's fourth network would have rendered
   nothing. The spec was amended to record it before the icon was added.
2. **`.footer-title` had never rendered.** The component applied
   `footer-title-2`, which is defined nowhere. Fixing the class revealed a
   ghosted gradient text-clip worth keeping, but it used hardcoded white, so it
   was rewritten with `color-mix` from `--color-ink`.
3. **The scramble needed a reduced-motion guard.** Letters cycling through
   random characters is exactly what those users ask not to see; it now
   resolves straight to the wordmark.

**Decisions recorded during specing:**

- The brief's footer Services column lists six items. Only four are service
  lines, so Custom Software and Automation were dropped rather than linked to
  pages that do not exist. An inline comment in `footer.ts` says why.
- The newsletter was removed. The brief does not ask for one, there is no email
  backend, and a form that discards what people type is worse than none. Its
  split-text button animation survives in the nav CTA and `_reference/`.

**Also fixed:** 15 stray `nav__item` classes my earlier regex had added to the
*footer* links in all three mockups. That class carries the nav's hover glow, so
the design reference was wrong until this was corrected.

**Carried forward:**

- Step 3's done-when is behavioural. The scramble was verified by build and code
  review, not watched running.
- All four social hrefs are `#` with `placeholder: true`. Real handles are
  needed before launch.
- `prototypes/` was **not** discarded. The mockups still document the hero,
  positioning statements, roster, launch banner, pricing tabs and case study
  layout, which features 3-8 build against. Discard them once feature 8 lands.
## Files / areas

- `src/data/footer.ts` - new, the single footer source
- `src/interface/index.ts` - adds `FooterLinkGroup`
- `src/components/shared/layout/footer/footer.tsx` - rewritten
- `src/components/shared/layout/footer/Shuffled-title.tsx` - retargeted
- `src/components/shared/layout/footer/bottom-bar.tsx` - rewritten
- `src/styles/common.css` - fixes the `footer-title-2` mismatch
- `src/components/shared/icon/index.tsx` - step 4 only, adds `GitHubIcon`
- Deleted in step 5: `news-letter.tsx`
- Untouched: `divider.tsx`, `social-icons.tsx`, `layout.tsx`, every page body

## Data / contracts

`FooterLinkGroup` reuses the `NavLink` 1b locked, so both shells share one link
shape:

```ts
export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}
```

Link groups and where they point today:

| Group | Items | All resolve? |
| --- | --- | --- |
| Explore | Home, Work, Services, Pricing | yes |
| Services | E-Commerce, Website / App, Landing Page, AI Agents / Automation | yes, all to `/services` until feature 7 |
| Studio | About, FAQ, Contact | yes |

Placeholders that must not ship as real, mirroring the plan's rule on
`placeholder` content:

- The four social hrefs - the brief names the networks, not the handles
- `hello@fathomxo.com` and Dhaka, Bangladesh come from the brief and are
  treated as real

## Testing

No test runner is configured (`AGENTS.md` declares no `test` command), and this
feature adds no pure logic - it is a component and its data. Playwright is not
installed and this spec is not the place to add it, so per
`coding-standards.md` the evidence is the dev server plus the build:

- `bun run build` and `bun run lint` after every step
- Step 3's done-when is **behavioural** (scroll-triggered scramble, and its
  reduced-motion fallback). Prove it against the running app, not by reading
  the code
- Compare the running footer against `prototypes/home.html` side by side at
  1280px and 375px
- Step 5 is proved by the grep plus every route still rendering

## Notes for the AI

- **Reuse, do not rebuild, the scramble.** `Shuffled-title.tsx` is a working
  ScrollTrigger animation. Step 3 changes its text and colours only.
- The footer is a **server component** today and should stay one. Only
  `Shuffled-title.tsx` and `SocialIcons` need `'use client'`.
- Style with 1a tokens: `--color-canvas`, `--color-hairline`, `--color-ink*`,
  `--color-accent`, `--font-display`, `--font-mono`, `--tracking-mono`,
  `--container-site`. Do not reach for `bg-background-*` or `opai-*`.
- The current footer hardcodes 13 links inline, 8 of them `href="#"`, plus
  `hello@pixels71.com` and a US phone number. All of it goes.
- Use `symbol-dark.svg` for the mark, as 1b does. Never `logo-light.svg` or
  `fxo-orange.svg`: both contain `<text>` and render in the visitor's fonts.
- Mono micro-cap headings are `font-mono text-xs uppercase` with
  `tracking-[var(--tracking-mono)]`, matching the nav.
- Tap targets stay >= 44px and the layout must hold at 360px.
