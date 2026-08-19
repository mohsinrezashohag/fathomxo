# Feature: Brand token layer

**From build-plan:** feature 1a (under 1. Design system and shell)
**Status:** complete (2026-08-19)
**Branch:** `feature/brand-token-layer`

## Goal

Put the FathomXO design tokens into the app as Tailwind v4 `@theme` tokens, so
every later feature styles against named brand values instead of the template's
`opai-purple` / `background-6` vocabulary. This is the foundation 1b (nav), 1c
(footer), and 1d (transitions) build on, and the token names it establishes are
consumed by every feature after it.

Nothing visual changes in this feature. The tokens are added **alongside** the
template's, so all nine surviving routes render exactly as they do today. The
template tokens die later, when the last component using them is rebuilt.

## Design reference

`prototypes/theme.css` is the source of truth for every value here. The three
mockups show the tokens in use and are the visual target for 1b and 1c:

- [prototypes/theme.css](../../prototypes/theme.css) - the token values
- [prototypes/home.html](../../prototypes/home.html)
- [prototypes/pricing.html](../../prototypes/pricing.html)
- [prototypes/case-study.html](../../prototypes/case-study.html)

Contrast values in `theme.css` were measured, not estimated. Do not lower
`--hairline-strong` below 0.36 alpha (3.03:1) or interactive borders stop
meeting the plan's 3:1 floor.

## In scope

- A new `src/styles/brand.css` holding all FathomXO tokens in its own
  `@theme static` block, imported by `globals.css` after `variable.css`
- Colour tokens: canvas, surfaces, hairlines, ink ramp, accent
- Type tokens: the ten-step size scale, display/mono tracking, body/display
  leading, and three role-named font families pointing at fonts the app
  **already loads** (Space Grotesk, Inter Tight, IBM Plex Mono)
- Radius, easing, and container tokens
- Z-index and duration values as plain custom properties (Tailwind v4 has no
  theme namespace for either)
- Dropping the `--font-funnel-display` token, which names a face that was never
  loaded

## Out of scope

- Migrating any existing component to the new tokens (1b, 1c, and later features)
- Deleting the template's tokens in `variable.css` - they stay until their last
  consumer is rebuilt
- Adding or removing any font family. All six Google families stay loaded in
  `font.ts`; this feature only points role-named tokens at three of them
- Migrating the 25 `font-funnel-display` / `text-fd-heading-*` usages - 1b and
  1c handle those as they rebuild each surface
- Adopting the z-index scale across the 122 existing `z-*` usages
- Nav, footer, page transitions, Lenis/ScrollTrigger work (1b, 1c, 1d)
- Discarding `prototypes/` - that happens at the last shell feature's `/complete`

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - colour tokens** - create `src/styles/brand.css` with an
  `@theme static` block defining `--color-canvas`, `--color-surface`,
  `--color-surface-raised`, `--color-hairline`, `--color-hairline-strong`,
  `--color-ink`, `--color-ink-secondary`, `--color-ink-muted`,
  `--color-ink-faint`, `--color-accent`, `--color-accent-ink`,
  `--color-accent-glow`, with the values and the measured-contrast comments from
  `theme.css`. Import it in `src/app/globals.css` **after** `variable.css` so the
  `--color-accent` redefinition wins. *Done when:* `bun run build` passes; the
  emitted production CSS under `.next/static/chunks/*.css` contains
  `--color-canvas:#0c0c15` and `--color-accent:#e2560a`; `/pricing` and
  `/projects` render unchanged from before the step.

- [x] **Step 2 - type tokens** - add to `brand.css`: the ten sizes `--text-12`
  through `--text-120`, `--tracking-display` and `--tracking-mono`,
  `--leading-body` and `--leading-display`, and three role-named families
  pointing at already-loaded faces:
  `--font-display: 'Space Grotesk', system-ui, sans-serif`,
  `--font-body: 'Inter Tight', 'Inter', system-ui, sans-serif`,
  `--font-mono: 'IBM Plex Mono', ui-monospace, monospace`.
  *Done when:* build passes; the emitted CSS contains `--text-60`,
  `--tracking-display`, and `--font-display` declarations; `--text-it-heading-1`
  and `--text-tagline-2` are still present with their template values.

- [x] **Step 3 - radius, easing, container, and plain custom properties** - add
  `--radius-control`, `--radius-card`, `--radius-pill`, `--ease-brand`, and
  `--container-site: 1290px` to the `@theme static` block, plus a separate
  `:root` block with `--z-base/raised/nav/menu/modal` and
  `--dur-hover/reveal/slow`, and a `prefers-reduced-motion` block zeroing the
  durations. **Do not define `--radius-sm`, `--radius-md`, `--radius-lg`, or
  `--radius-xl`** - those are Tailwind defaults consumed by 43 `rounded-lg`, 16
  `rounded-xl`, 6 `rounded-sm`, and 5 `rounded-md` usages in template
  components. *Done when:* build passes; `--radius-card`, `--ease-brand`, and
  `--container-site` appear in the emitted CSS; `--radius-lg:.5rem` is still
  there, proving no template regression.

- [x] **Step 4 - retire Funnel Display entirely** - the face was declared but
  never loaded, and a reference audit found **zero component usages**: every
  mention is a definition. So this is dead-code removal with no migration debt,
  not the partial retirement first assumed. Remove `--font-funnel-display` and
  the twelve `--text-fd-heading-*` size and line-height tokens from
  `src/styles/variable.css`, the six `@utility text-fd-heading-*` blocks from
  `src/styles/typography.css`, and the `"funnel-display"` and `"fd-heading-1..6"`
  entries from the tailwind-merge config in `src/utils/cn.ts`. *Done when:*
  build passes; `grep -rn "funnel-display\|fd-heading" src/` returns nothing;
  `/pricing` and `/services` render unchanged.

## Files / areas

- `src/styles/brand.css` - new, all FathomXO tokens
- `src/app/globals.css` - one added import line, after `variable.css`
- `src/styles/variable.css` - step 4 only, removes one dead font token
- `src/styles/typography.css` - step 4 only, removes six utility bindings
- Untouched: `src/utils/font.ts`, `common.css`, and every component

## Data / contracts

No data shapes. The **token names are the contract** and are load-bearing:
1b, 1c, 1d, and every later feature style against them, so renaming one later is
a cross-cutting change. Locked names:

| Group | Tokens |
| --- | --- |
| Surfaces | `--color-canvas`, `--color-surface`, `--color-surface-raised` |
| Lines | `--color-hairline`, `--color-hairline-strong` |
| Ink | `--color-ink`, `--color-ink-secondary`, `--color-ink-muted`, `--color-ink-faint` |
| Accent | `--color-accent`, `--color-accent-ink`, `--color-accent-glow` |
| Type | `--text-12/14/16/20/24/32/44/60/84/120`, `--tracking-display`, `--tracking-mono`, `--leading-body`, `--leading-display` |
| Families | `--font-display`, `--font-body`, `--font-mono` |
| Shape | `--radius-control`, `--radius-card`, `--radius-pill` |
| Motion | `--ease-brand`, `--dur-hover`, `--dur-reveal`, `--dur-slow` |
| Layout | `--container-site`, `--z-base/raised/nav/menu/modal` |

Three deliberate departures from `theme.css`:

- `--text` (colour) becomes `--color-ink*`, because `--text-*` is Tailwind's
  font-size namespace and the two would read as the same family.
- `--space-*` is **dropped**. Tailwind v4 has no named-spacing namespace; the
  default `--spacing: 0.25rem` base already generates `p-4`, `gap-6`, and the
  template uses it throughout. Nothing is missing here.
- Families are **role-named** (`--font-display`) rather than face-named
  (`--font-space-grotesk`), so swapping a face later is one token edit rather
  than a repo-wide rename. The template's face-named tokens stay untouched
  alongside them.

## Testing

No test runner is configured (`AGENTS.md` declares no `test` command), and this
feature adds no logic - only CSS custom properties. So the gate is build plus
observable evidence, not unit tests:

- `bun run build` after every step
- Grep the emitted CSS under `.next/static/chunks/*.css` for the tokens each step
  adds. This is the objective proof a token actually reaches the output rather
  than sitting inert in a file, which is the main way this feature can fail
  silently.
- Step 3 additionally greps that `--radius-lg` is still `.5rem`, guarding the one
  real regression risk.
- Screenshot `/pricing` before step 1 and after step 4; they must be identical,
  since no component consumes the new tokens yet.

## Outcome

Source diff: +2 / -40 lines across 5 files, plus the new `brand.css`.

**Evidence at completion:**

- `bun run build` exit 0; `bun run lint` 0 errors (the one warning is
  pre-existing in the untouched `src/utils/getMarkDownData.ts`).
- Every token verified present in the emitted production CSS, not just in
  source: `--color-canvas:#0c0c15`, `--color-accent:#e2560a`,
  `--color-hairline-strong:#f2f0ee61`, all ten `--text-*` sizes,
  `--font-display:"Space Grotesk",system-ui,sans-serif`, `--radius-card:20px`,
  `--ease-brand`, `--container-site:1290px`, `--z-nav:100`, `--dur-reveal:.52s`,
  and the `prefers-reduced-motion` block.
- Regression guard passed: `--radius-lg` is still `.5rem`, so the 43
  `rounded-lg` usages are unchanged. `--color-background-6`, `--color-opai-purple`,
  `--text-sora-heading-1`, and `--font-sora` all intact.
- The `--color-accent` redefinition (from the template's `#fcfcfc`) provably
  cannot affect rendering: the emitted CSS contains zero `var(--color-accent)`
  references and no accent utility class.

**What the build confirmed about `@theme static`:**

The spec predicted Tailwind prunes unused theme variables, and it held.
`text-sg-heading-*` is declared in `typography.css` but used by no component,
and appears nowhere in the emitted CSS - neither token nor utility. Every brand
token here is equally unused until 1b, so a bare `@theme` block would have
emitted nothing while the build still passed green.

**Deviations from the spec as written:**

- Step 4 was scoped as a partial retirement assuming 25 live Funnel Display
  usages needing migration by 1b/1c. A reference audit found **zero** - every
  mention was a definition. The spec was corrected mid-build and the removal
  became complete: the font token, its twelve size tokens, six `@utility`
  blocks, and the two `cn.ts` entries. No migration debt was passed on.
- `prototypes/` was **not** discarded at this completion, though `/complete`
  normally discards prototypes a feature has consumed. The mockups are the
  design reference for 1b (nav) and 1c (footer), which are not built yet.
  Discard them at the last shell sub-feature's completion.

**Carried forward:**

- The token names are load-bearing. 1b, 1c, 1d, and later features style
  against them; renaming one later is a cross-cutting change.
- The template's tokens in `variable.css` and all six Google font families stay
  loaded until their last consumer is rebuilt.
- `.prettierrc` sets `endOfLine: "lf"` against a CRLF working tree, so
  `prettier --check` fails repo-wide on untouched files. Still needs a
  `.gitattributes`.

## Notes for the AI

- **Use `@theme static`, not bare `@theme`.** Tailwind prunes theme variables
  nothing references: `--color-accent` is declared in `variable.css` today, has
  zero usages, and is absent from the built CSS as a result. Every token this
  feature adds is unused until 1b, so a bare `@theme` block would emit nothing,
  the done-whens would fail, and any hand-written `var(--color-canvas)` in a
  later feature would silently resolve to nothing. Verified against the parser in
  Tailwind 4.2.1, which accepts exactly `reference`, `inline`, `default`, and
  `static`.
- Tailwind v4 merges multiple `@theme` blocks, later wins. `brand.css` must be
  imported after `variable.css` in `globals.css`.
- `--color-accent` and `--color-secondary` exist in `variable.css` but have zero
  usages in `src/`, verified by grep, so redefining `--color-accent` is safe.
  `font-mono` likewise has zero usages, so overriding `--font-mono` is safe.
- Only these are real v4 theme namespaces: `--color-*`, `--font-*`, `--text-*`,
  `--tracking-*`, `--leading-*`, `--radius-*`, `--ease-*`, `--container-*`,
  `--shadow-*`, `--breakpoint-*`, and the single `--spacing`. Z-index and
  duration are **not** namespaces, so those go in a plain `:root` block and get
  consumed as `z-[var(--z-nav)]` and `duration-[var(--dur-reveal)]`.
- Every colour must trace to `src/assets/images/logos/README.txt` - the four
  brand hexes - or be derived from them by alpha or `color-mix`. No new hex ships.
- Keep the measured contrast comments from `theme.css` in `brand.css`; they are
  the reason the alpha values are what they are.
- This feature is additive only, apart from step 4's dead-token removal. If a
  step would change how an existing page renders, the step is wrong.
