# Feature: Schema layer

**From build-plan:** feature 2a (under 2. Content model)
**Status:** complete (2026-08-19)
**Branch:** `feature/schema-layer`

## Goal

Install Zod and define the nine content schemas in `src/interface`, so that from
here on every content module is validated and a malformed entry fails the build
instead of shipping a broken card.

This is the contract layer. 2b authors the brief's content against these
schemas, 2c migrates the markdown onto them, and features 5-11 all read shapes
defined here. Getting a field wrong now is a cross-cutting change later, so this
feature defines shapes and proves validation - it moves no content.

## Design reference

None. This feature renders nothing. The shapes come from the Data model section
of [project-overview.md](project-overview.md), and the field values they must
accommodate come from
[../reference/content-brief.md](../reference/content-brief.md).

## In scope

- `zod` as a dependency
- Nine schemas in `src/interface`: Client, Project, Service, PricingPlan, Faq,
  Campaign, Testimonial, TeamMember, Technology
- Types inferred from the schemas rather than hand-written alongside them, so
  the two cannot drift
- A `parseContent` helper that validates a module and throws with the failing
  entry named
- One real content module converted as proof the harness works end to end
- Documenting the pattern in `coding-standards.md`, which still describes the
  markdown pipeline

## Out of scope

- Authoring the brief's content - that is 2b
- Migrating projects, services or team off markdown, and removing
  `gray-matter`, `react-markdown` or `rehype-slug` - that is 2c
- Any component or page change beyond the single module converted as proof
- Runtime validation of the lead payload. Feature 12 owns the form schema, which
  is a different shape with a different lifetime

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - install Zod and add the validation helper** - add `zod`, then
  create `src/interface/content.ts` with a `parseContent(schema, entries, label)`
  helper that validates an array and, on failure, throws naming the module and
  the index and path of the offending entry. A validation error must be readable
  enough to fix without a debugger. *Done when:* `bun run build` and `bun run
  lint` pass; `zod` appears in `package.json` and `bun.lock`.

- [x] **Step 2 - the four content-brief schemas** - define `clientSchema`,
  `serviceSchema`, `pricingPlanSchema` and `technologySchema` in
  `src/interface`, with types inferred via `z.infer`. `pricingPlanSchema` must
  accommodate both shapes the brief uses: e-commerce's three tiers and the single
  starting price the other lines carry, with `priceBdt: 0` valid for the free
  tier and `startingFrom` carrying the `+`. `clientSchema` carries `placeholder`.
  *Done when:* build and lint pass; a scratch parse of a valid e-commerce tier
  and a valid single-price plan both succeed, and one missing a required field
  throws a message naming the field.

- [x] **Step 3 - the five remaining schemas** - define `projectSchema`,
  `faqSchema`, `campaignSchema`, `testimonialSchema` and `teamMemberSchema` the
  same way. `projectSchema` and `teamMemberSchema` carry `placeholder`, since 2c
  migrates template content under that flag. *Done when:* build and lint pass;
  all nine schemas export both a schema and an inferred type; no hand-written
  interface duplicates a schema.

- [x] **Step 4 - prove the harness on one real module** - convert
  `src/data/testimonials-data.ts` to parse through `testimonialSchema` at module
  load. **Not `faq-data.ts`**, as first planned: the template's FAQ data is
  nested (`FaqSection` holding `items[]`) rather than the flat entries
  `faqSchema` describes, so converting it would restructure six consumers - that
  is feature 10's job. Testimonials is a flat array with a single consumer.
  Adjust `testimonialSchema` to the real content while doing it: add the avatar
  fields the marquee renders, and make `clientName` optional, since the template
  entries carry an author and role but no company. *Done when:* `bun run build`
  passes and the home testimonial marquee renders exactly as before;
  temporarily breaking one entry **fails the build** with a message naming the
  module and field, and the build passes again once restored. That failure is
  the point of the feature and must be demonstrated, not assumed.

- [x] **Step 5 - document the pattern** - update the Content section of
  `blueprint/context/coding-standards.md`, which still describes markdown plus
  `gray-matter`, to describe typed modules validated by Zod at module load, and
  name `parseContent` as the entry point. *Done when:* the Content section
  matches what the repo now does, and the markdown description is marked as
  applying only to what 2c has yet to migrate.

## Outcome

9 files, +499 / -115. Zod 4.4.3, nine schemas, nine inferred types, and a
validation harness proven to reject.

**The proof.** Step 4 required a demonstration rather than a claim. Removing a
required field from one testimonial entry:

```
Error: Failed to collect configuration for /
  [cause]: Error: Invalid content in testimonials-data.ts, entry 0:
      authorName: Invalid input: expected string, received undefined
BUILD EXIT: 1
```

Restored, exit 0. `.strict()` also rejects unknown keys:
`Unrecognized key: "typo"`.

**Other evidence:** `bun run build` exit 0 and `bun run lint` 0 errors after
every step. Both pricing shapes parse without special-casing - a free tier at
`priceBdt: 0` and a single plan with `startingFrom: true`.

**Three course corrections:**

1. **Step 4 retargeted from `faq-data.ts` to `testimonials-data.ts`.** The
   template's FAQ data is nested (`FaqSection` holding `items[]`), not the flat
   entries `faqSchema` describes, so converting it would have restructured six
   consumers - feature 10's work. Testimonials is flat with one consumer. The
   spec was amended before the code changed.
2. **A duplicate-identifier build failure was useful.** It surfaced that
   `PricingPlan`, `FeatureCategory` and `TeamMember` in `src/interface/index.ts`
   were dead: `pricing-data.ts` defines its own `PricingPlanItem` and
   `about/team.tsx` declares `TeamMember` locally. Deleting them fixed the
   collision and removed dead code.
3. **The first attempt to break the data silently failed.** Prettier had
   reindented the file, so the match missed and the build passed - which looked
   momentarily like validation was not running. Verifying the mutation had
   landed, rather than trusting the green build, caught it.

**Design decision worth carrying:** `serviceSlugs` is a `const` tuple driving a
`z.enum`, so the four-service-line decision is enforced by the type system. A
fifth line is a deliberate schema change, not a stray string.

**Also corrected in `coding-standards.md`,** all false before this feature: the
header describing markdown content, `Swiper for carousels` (removed in the
teardown), the file-organisation line still listing a blog folder, and a TODO
saying Zod was not installed.

**Carried forward:**

- `parseContent` and the schemas are exactly the pure-logic case
  `coding-standards.md` names as in scope for unit tests. No runner is
  configured and installing one mid-feature is against the rules, so they are
  the first targets when `/tests` runs.
- `testimonialSchema` gained `avatar`, `avatarAlt` and an optional `clientName`,
  fitted to what the real content carries.
- 2b authors the brief's content against these schemas; 2c migrates the markdown
  and removes `gray-matter`, `react-markdown` and `rehype-slug`.
## Files / areas

- `package.json`, `bun.lock` - adds `zod`
- `src/interface/content.ts` - new, the `parseContent` helper
- `src/interface/index.ts` - the nine schemas and their inferred types
- `src/data/testimonials-data.ts` - step 4 only, parses through its schema
- `src/components/home/testimonial.tsx` - step 4 only, follows the field rename
- `blueprint/context/coding-standards.md` - step 5 only
- Untouched: every component, every page, all markdown content

## Data / contracts

Every shape here is **load-bearing**. The overview's Data model section is the
source; this feature makes it executable. Features 5-11 read these types, and
2b and 2c author against them.

Two decisions the brief forces, both already settled in the plan:

**A service line carries 1..n pricing plans.** E-commerce has three tiers, the
other lines one. The schema must not assume tiers, so a single-plan line is not
a special case:

```ts
priceBdt: z.number().int().min(0),        // 0 is the free Starter
startingFrom: z.boolean().default(false), // renders the + in BDT 60,000+
recommended: z.boolean().default(false),
```

**Placeholder content is flagged, never disguised.** `clientSchema`,
`projectSchema` and `teamMemberSchema` carry
`placeholder: z.boolean().default(false)`. The plan's rule is that nothing with
`placeholder: true` may ship to production; feature 16 can enforce it because
the flag exists.

Types are **inferred, not written twice**:

```ts
export type Client = z.infer<typeof clientSchema>;
```

Hand-writing an interface beside a schema is how the two drift.

## Testing

`AGENTS.md` declares no `test` command, so no test gate is active. This feature
does add pure logic worth testing - `parseContent` and the schemas are exactly
the parser/validator case `coding-standards.md` names as in scope - but adding a
runner is `/tests`' job and this spec is not the place to install one.

So the evidence is the build, and step 4 is the real proof:

- `bun run build` and `bun run lint` after every step
- **Step 4 must demonstrate a failing build**, not describe one. Break an entry,
  watch the build fail with a useful message, restore it, watch it pass. A
  validation layer that has never rejected anything is not known to work
- The home testimonial marquee must render identically before and after step 4
- If `/tests` is run later, `parseContent` and each schema's required-field
  behaviour are the first things worth covering

## Notes for the AI

- **Validate at module load, not on render.** Parsing inside the module means a
  malformed entry fails `bun run build`, which is what the plan asks for. Parsing
  in a component would only fail at request time, on the visitor's machine.
- Infer types with `z.infer`; never hand-write an interface next to a schema.
- `src/interface/index.ts` currently holds hand-written interfaces including
  `NavLink`, `FooterLinkGroup` and the template's markdown types. Leave the nav
  and footer types alone: they are not content modules and 1b and 1c depend on
  them. Only the nine content shapes become schemas.
- Prefer `.strict()` on object schemas so an unknown key is an error rather than
  silently dropped. A typo in a content file should fail loudly.
- Keep the error message specific: module name, entry index, field path. The
  person fixing it will be editing a data file, not reading a stack trace.
- Check which Zod major installs and use its API. v4 changed some surface from
  v3; do not assume v3 idioms.
