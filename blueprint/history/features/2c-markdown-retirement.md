# Feature: Markdown retirement

**From build-plan:** feature 2c (under 2. Content model)
**Status:** complete (2026-08-19)
**Branch:** `feature/markdown-retirement`

## Goal

Move the last content off the starter's markdown pipeline and remove it. After
this, every content module in `src/data` is typed TypeScript validated by Zod at
build time, and `gray-matter`, `react-markdown` and `rehype-slug` are gone.

This closes feature 2. It also resolves a live inconsistency: 2b authored the
four real service lines into `services.ts`, but `/services` still reads nine
template markdown files describing a different business.

## Design reference

None. This is a content and plumbing migration; no surface is redesigned.
Project and team copy is template placeholder that features 6 and 11 replace,
so it moves as-is rather than being rewritten.

## In scope

- `src/data/projects.ts` and `src/data/team.ts` as typed modules, every entry
  `placeholder: true`
- Repointing all seven consumers off `getMarkDownData` / `getMarkDownContent`
- Deleting the nine template service markdown files and pointing `/services` and
  `/services/[slug]` at `services.ts`
- Removing the two markdown utils, the three `react-markdown` render components,
  and the three dependencies

## Out of scope

- Rewriting project or team copy. It is placeholder for features 6 and 11
- Building the real services surface with deliverables and technology badges -
  feature 7. This feature only stops `/services` describing a business that is
  not yours
- Rebuilding `/projects/[slug]` or `/team/[slug]` into their final form -
  features 6 and 11 own that. They are **simplified** here, not redesigned:
  see the note below on fields the schema does not carry

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - projects module** - add `src/data/projects.ts` with the nine
  entries from `src/data/projects/*.md`, parsed through `projectSchema`, every
  one `placeholder: true`. Field mapping is in Data / contracts. Nothing imports
  it yet, so the app is untouched. *Done when:* `bun run build` and `bun run
  lint` pass; nine entries, all `placeholder: true`; each `serviceSlug` is one of
  the four real slugs.

- [x] **Step 2 - repoint project consumers** - switch
  `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx` and
  `src/components/home/projects.tsx` from `getMarkDownData` to the step 1 module,
  and rebuild `src/components/project-details/content.tsx` around the typed
  fields. The detail page currently reads `titleItalic`, `before`, `after`,
  `details` and `testimonial`, **none of which `projectSchema` carries**, so
  `before-after.tsx`, `testimonial-block.tsx` and `details-sidebar.tsx` lose
  their data source and are deleted. The page renders problem, approach,
  outcome and stack instead. Feature 6 builds the real case-study layout.
  *Done when:* build and lint pass; `/projects` lists nine cards,
  `/projects/[slug]` renders for every one of the nine slugs, and the home
  page still shows its three `showHomepage` projects.

- [x] **Step 3 - team module and consumers** - add `src/data/team.ts` with the
  six entries from `src/data/team/*.md`, all `placeholder: true`, then repoint
  `src/app/team/[slug]/page.tsx` and `src/components/about/team.tsx`, replacing
  the `react-markdown` body in
  `src/components/team-details/details-markdown-data.tsx`. Team is smaller than
  projects, so module and consumers fit one step. *Done when:* build and lint
  pass; six entries, all `placeholder: true`; `/about` shows the team grid and
  all six `/team/[slug]` routes render.

- [x] **Step 4 - services onto the real four** - delete the nine files in
  `src/data/services/` and repoint `src/app/services/page.tsx`,
  `src/app/services/[slug]/page.tsx` and
  `src/components/services/our-services.tsx` at `services.ts`. The URL set
  changes from nine template slugs to the four real ones. Render plainly, the
  way 2b handled `/pricing`: feature 7 builds the proper surface with
  deliverables and technology badges. Replace the `react-markdown` body in
  `src/components/services-details/content.tsx` with the typed fields. *Done
  when:* build and lint pass; the build lists exactly four `/services/[slug]`
  paths matching `serviceSlugs`; `/services` renders four lines; no route 500s.

- [x] **Step 5 - remove the pipeline** - delete
  `src/utils/getMarkDownData.ts`, `src/utils/getMarkDownContent.ts`, and any of
  the three markdown render components left with no importer. Remove
  `gray-matter`, `react-markdown` and `rehype-slug` from `package.json` and run
  `bun install`. Prune `ProjectPost`, `ServicePost` and any other now-dead
  markdown types from `src/interface/index.ts`. *Done when:* `bun run build` and
  `bun run lint` pass; a grep for `gray-matter`, `react-markdown`, `rehype-slug`
  and `getMarkDown` across `src/` and `package.json` returns nothing; `src/data`
  contains no `.md` files; every route still renders.

## Outcome

51 files, +703 / -2,340. The starter's markdown pipeline is gone and feature 2
is complete: every content module in `src/data` is typed TypeScript validated by
Zod at build time.

**Evidence at completion:**

- `bun run build` exit 0 after every step. Lint dropped from 2 warnings to 1,
  because the deleted `getMarkDownData.ts` carried one of the two pre-existing
  template warnings.
- Route counts match the spec exactly: 9 `/projects/[slug]`, 6 `/team/[slug]`,
  and **exactly 4** `/services/[slug]` (`e-commerce`, `website-app`,
  `landing-page`, `ai-agents-automation`).
- Every route verified 200 against a running production server. The retired
  `/services/advanced-ai-development-services` correctly returns 404.
- `grep` for `gray-matter`, `react-markdown`, `rehype-slug` and `getMarkDown`
  across `src/` and `package.json` returns nothing. Zero `.md` files remain in
  `src/data`.

**Two spec corrections made during the build:**

1. **The gallery mapping was wrong.** The spec said `gallery` came from the
   `after` image array. Reading the real frontmatter, `before` and `after` are
   *text bullet lists* for a before/after component, not images. `gallery` has
   no source at all, so it is empty and feature 6 supplies real images.
2. **The detail pages read fields the schema does not carry.** The spec assumed
   they would render the same fields from a different source. Projects used
   `titleItalic`, `before`, `after`, `details` and `testimonial`; team used
   `contactPhones`, `email` and `imageAlt`. Seven components lost their data
   source and were deleted rather than quietly dropping content. Losing the team
   contact fields was a bonus - they were fake staff emails at a competitor's
   domain.

**Generation over transcription.** Both modules were produced by parsing the
markdown rather than hand-copying 15 entries. That caught a real bug: the first
pass silently produced empty `clientName`, `date` and `stack`, because the
`details:` block is indented and a `^client:` pattern never matched. A per-entry
field report surfaced it; transcription would not have.

**Carried forward:**

- Service URLs changed permanently, nine template slugs to four real ones.
  Nothing internal linked to the old set.
- `/projects/[slug]`, `/team/[slug]` and `/services/[slug]` are all deliberately
  plain now. Features 6, 11 and 7 rebuild them.
- All 9 projects and 6 team members are `placeholder: true`. Their copy is
  template filler describing work FathomXO has not done.
- `serviceSlug` on each project was assigned, not sourced - the template
  projects predate the four service lines.
## Files / areas

- `src/data/projects.ts`, `src/data/team.ts` - new
- `src/data/projects/`, `src/data/team/`, `src/data/services/` - 24 markdown
  files deleted
- Repointed: both `projects` routes, both `services` routes, `team/[slug]`,
  `home/projects.tsx`, `about/team.tsx`, `services/our-services.tsx`
- Deleted in step 5: two utils, up to three markdown render components, three
  dependencies
- Untouched: `src/interface` schemas (2a defined them), the nav, the footer,
  `clients.ts`, `pricing.ts`, `faqs.ts`, `technologies.ts`

## Data / contracts

No new shapes. The mapping from markdown to `projectSchema`, which is the part
worth reviewing:

| Schema field | Source |
| --- | --- |
| `slug` | markdown filename |
| `title`, `summary` | `title`, `excerpt` |
| `problem` | body under `### Challenge` |
| `approach` | body under `### Our Solution` |
| `outcome` | `closingParagraph` |
| `stack` | `details.services`, split on commas |
| `clientName` | `details.client` |
| `cover` | `heroImage` |
| `gallery` | `[]` - see below |
| `date` | `details.year` |
| `serviceSlug` | **assigned**, see below |
| `showHomepage` | `showHomepage` |

The bodies split cleanly on `### Challenge` and `### Our Solution`, so
`problem` and `approach` map rather than being invented.

**`gallery` has no source.** The frontmatter's `before` and `after` keys are
text bullet lists - pain points and outcomes for a before/after component -
not image arrays, so `gallery` stays empty. Feature 6 supplies real gallery
images. The `before` and `after` bullets are dropped rather than forced into
a field that means something else. Where a body has no
matching heading, the field takes a `TODO` marker instead of prose moved from
somewhere it did not belong.

**`serviceSlug` has no source.** The template projects predate the four service
lines and their `details.services` strings say things like "AI Solutions,
E-commerce". Each project is assigned the closest of the four real slugs, and
the module records that the assignment is provisional. Every entry is
`placeholder: true` regardless, so feature 6 resets this.

Team maps more directly: `title` to `name`, `description` to `title`,
`imageSrc` to `photo`, `socialLinks` to `socials`, and the markdown body to
`bio`.

## Testing

`AGENTS.md` declares no `test` command, so no test gate is active. This feature
adds no logic - it moves data between formats and repoints imports. The Zod
parse at module load is the correctness check, and 2a already proved it rejects.

- `bun run build` and `bun run lint` after every step
- **Route coverage is the real check here**, because this feature changes what
  `generateStaticParams` returns. After each step read the build's route table
  and confirm the counts: nine `/projects/[slug]`, six `/team/[slug]`, and after
  step 4 exactly four `/services/[slug]`
- Step 4 changes URLs. Confirm the four new service routes return 200 and that
  nothing in `src/` still links to a removed nine-slug URL
- Step 5 is proved by the greps plus every route still rendering

## Notes for the AI

- **Do not rewrite the copy.** Project and team text is template placeholder
  that features 6 and 11 replace. Moving it verbatim keeps the diff reviewable
  and avoids inventing case studies for work FathomXO has not done.
- Where a schema field has no source, write `TODO`, not plausible prose. Every
  entry is `placeholder: true`; an obvious gap is safer than a convincing one.
- Markdown bodies contain `###` and `####` headings. Once the text is a plain
  string field, those markers are meaningless - strip them and keep the prose.
- `/services/[slug]` currently generates nine paths. After step 4 it must
  generate exactly four. A stale `generateStaticParams` reading the deleted
  folder is the most likely way this step fails quietly.
- Check `our-services.tsx` for a hardcoded nine-item list before assuming it
  reads the markdown.
- Each module parses through `parseContent(schema, entries, 'filename.ts')`, per
  the Content section of `coding-standards.md`.
