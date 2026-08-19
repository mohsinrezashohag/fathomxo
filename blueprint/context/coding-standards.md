# Coding Standards

> Tuned by `/onboard` to the real stack: Next.js 16 (App Router) + React 19 +
> TypeScript (strict) + Tailwind CSS v4, Bun as package manager, GSAP/Lenis for
> animation, typed content modules validated by Zod. Edit as conventions evolve.

## TypeScript

- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Define interfaces for all props, API responses, and data models
- Use type inference where obvious, explicit types where helpful

## React

- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused - one job per component
- Extract reusable logic into custom hooks

## Next.js

- Server components by default; the template is client-heavy (GSAP animation),
  so keep `'use client'` at the leaf components that animate, not whole pages
- Only use `'use client'` when needed (interactivity, hooks, browser APIs)
- Use Server Actions for form submissions and simple mutations when a backend
  is added (contact, login, and signup are template UI only today)
- Use API routes only for webhooks, long-running operations, specific HTTP
  status codes or headers, or third-party integrations
- Otherwise, read data directly in server components
- Dynamic routes for item pages: `blog/[slug]`, `projects/[slug]`,
  `services/[slug]`, `team/[slug]`

## File Organization

- Components: `src/components/[feature]/ComponentName.tsx`, shared ones in
  `src/components/shared/`, animation helpers in `src/components/animation/`
- Pages: `src/app/[route]/page.tsx`
- Types: `src/interface/index.ts` (single barrel file)
- Utils: `src/utils/[utility].ts` (`cn.ts` combines clsx + tailwind-merge)
- Hooks: `src/hooks/`
- React context providers: `src/context/`
- Content and data: `src/data/` (typed TS modules validated by Zod; `projects`
  and `team` are still markdown until feature 2c)
- Styles: CSS partials in `src/styles/`, imported by `src/app/globals.css`
- Path alias: `@/*` maps to the repo root (for example `@/src/components/...`),
  `@/public/*` for public assets

## Naming

- Components: PascalCase (`ItemCard.tsx`)
- Files: Match component name or kebab-case
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase (no prefix)

## Styling

- Tailwind CSS v4 for all styling: CSS-first config, no `tailwind.config.js`;
  theme variables and shared styles live in `src/styles/` partials
- Use the `cn()` util for conditional class merging
- No inline `style` attributes (GSAP setting styles at runtime is fine)
- Prettier with `prettier-plugin-tailwindcss` keeps class order consistent
- Animation: GSAP with `@gsap/react` (`useGSAP`), Lenis for smooth scrolling,
  driven from `gsap.ticker` so ScrollTrigger reads the smoothed position. No
  carousel library: use CSS scroll-snap. Keep animation logic in client leaf
  components

> TODO: document the dark/light mode policy once the theme approach is settled.

## Content

There is no database. Content is file-based and lives in `src/data/`, as typed
TypeScript modules validated by Zod.

**Every content module validates at load time.** A schema lives in
`src/interface/index.ts`, the module parses its entries through it, and a
malformed entry fails `bun run build` rather than rendering a broken card:

```ts
import { testimonialSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

export const testimonialsData = parseContent(
  testimonialSchema,
  [{ quote: '...', authorName: '...', authorRole: '...' }],
  'testimonials-data.ts'
);
```

Rules that keep this honest:

- **Parse in the module, never in a component.** Parsing at module load fails
  the build. Parsing on render fails on the visitor's machine.
- **Infer types, never hand-write them beside a schema.** Use
  `export type Client = z.infer<typeof clientSchema>;`. A hand-written
  interface next to a schema is how the two drift.
- **Schemas are `.strict()`**, so a typo in a content file is an error rather
  than a silently dropped key.
- **Pass a real label** to `parseContent` - the filename. The error names the
  module, entry index and field path, because whoever fixes it is editing a
  data file, not reading a stack trace.
- **Placeholder content is flagged, never disguised.** Clients, projects and
  team members carry `placeholder`. Nothing with `placeholder: true` may ship
  to production.
- A new content type means a schema in `src/interface/index.ts` plus a module
  in `src/data/` that parses through it.

**Markdown is legacy and on the way out.** `src/data/projects` and
`src/data/team` are still markdown with frontmatter, read through
`src/utils/getMarkDownData.ts` and `getMarkDownContent.ts` and rendered with
`react-markdown` + `rehype-slug`. Feature 2c migrates them to typed modules and
removes `gray-matter`, `react-markdown` and `rehype-slug`. Do not add new
markdown content.

> TODO: if a database or CMS is added later, document the ORM/client and
> migration conventions here first.

## Data Fetching

- Server components read markdown and data files directly via `src/utils/`
- Client components receive data as props; no client-side fetching for static
  content
- Validate user input at the boundary when forms get a real backend

Zod is installed and validates content modules (see Content). Feature 12 reuses
it for the brief form, sharing one schema between the client and the route
handler.

## Error Handling

- Use try/catch in Server Actions when they exist
- Return `{ success, data, error }` pattern from actions
- Display user-friendly error messages in the UI (no toast library installed;
  pick one when the first interactive form ships)

## Testing

The blueprint installs no test runner; testing is opt-in at the project level,
because the overlay can't know your stack. Adding unit testing is an explicit
setup task the AI can do through the normal workflow, either as a build-plan item
or with `/tests`. The setup should choose the stack-native runner, wire the
scripts or commands, add a small example test, and update the Commands section
of `AGENTS.md`.

When `AGENTS.md` declares a `Verify` command, treat it as the umbrella automated
gate. It combines only the checks this project actually has, in this order when
available: typecheck, tests, then build. The command does not enable an absent
test runner or replace focused evidence. It gives local work and optional CI one
exact command to run. `/ci` owns Verify and CI setup. `/tests` adds the real test
command to Verify when it already exists, but never creates CI only because
testing was configured.

**The opt-in switch is one signal: a `test` command in the Commands section of
`AGENTS.md`.** Declare one and **tests become a gate for logic-bearing steps**,
not an optional extra; leave it out and the loop verifies logic with the evidence
it already uses (run it, a screenshot, the build). Adding the runner is itself a
deliberate step, never a silent mid-step install. This is the single definition
of the switch; the skills and `ai-interaction.md` only point back here.

- **What to test (the scope rule):** pure logic where a wrong answer is possible -
  parsers, formatters, validators, id/slug builders, server actions. These have
  assertable inputs and outputs and real edge cases (empty, missing, malformed).
- **What not to test:** UI components and integration-level surfaces (render or
  export routes, anything driving a real browser or external service). Verify those
  with a screenshot and the build, not brittle unit tests.
- **The gate (when a runner is configured):** a build step that adds in-scope logic
  must ship a passing test in the same reviewable diff. The project's test command
  must be green before the step is approved, before any checkpoint commit, and
  before `/complete` merges. UI and integration-only steps are exempt and ride on
  screenshot plus build evidence.
- **When it's named:** the `/feature` spec's Testing section predicts the coverage,
  `/implement` writes the test with the step, and if a step surfaces logic the spec
  didn't foresee, add a focused test then.
- An empty suite should fail, not pass, so "no tests ran" never looks like "passed".
- Test files live next to source files (for example `feature.test.ts`).
- Run them via the project's test command (see Commands in `AGENTS.md`), not a
  hardcoded tool name.

Stack binding: this TypeScript app should use Vitest (run through Bun),
`vi.mock()` for external dependencies (filesystem reads, `next/navigation`),
and `vi.useFakeTimers()` for time-dependent logic. `/tests` makes the final
runner call when testing is set up; no runner is configured today. Likely first
test targets: the pure utils in `src/utils/` (`blogFilters`, `generateTOC`,
`parseUseCaseDate`).

## Browser Verification

For UI and integration behavior, prefer real browser evidence over reading the
code and assuming it works.

- If Playwright is already installed, or the Commands section of `AGENTS.md`
  declares a Playwright script, use Playwright for browser checks, screenshots,
  console-error checks, and user-flow verification.
- If Playwright is not installed, do not add it silently in the middle of an
  unrelated feature. Use the available dev server, browser screenshots, build
  output, API output, or manual verification evidence instead.
- Add Playwright only when the user asks for it, or when the current spec is
  explicitly about setting up browser automation.
- Browser evidence is especially important for flows that click, type, submit,
  navigate, download files, render complex layouts, or depend on client-side
  state.

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible

## Comments

Write code that explains itself; comment only what the code cannot say.
Over-commenting is a common AI tell, so resist it.

- Comment the **why**, not the **what**. Delete any comment that restates the code.
- No banner/header blocks, section dividers, or step-by-step narration of obvious
  code. A file does not need a comment announcing each region.
- A comment earns its place only when it captures something the code can't: a
  non-obvious decision, a gotcha or workaround, why a value is what it is, or a
  link to a spec or issue.
- Prefer self-documenting names and small functions over explanatory comments.
- Keep doc comments minimal: a one-line purpose on an exported type or function is
  plenty; don't write JSDoc that just repeats the signature.
- When in doubt, leave the comment out.

## Writing

- No em dashes (U+2014) in generated content: docs, comments, commit messages,
  READMEs, specs. They read as AI-generated.
- Use a hyphen for `term - description` separators; rephrase prose with commas,
  parentheses, or a colon. Avoid en dashes and the ellipsis character too.
