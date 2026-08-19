# Feature: Brief content modules

**From build-plan:** feature 2b (under 2. Content model)
**Status:** complete (2026-08-19)
**Branch:** `feature/brief-content`

## Goal

Turn the content brief into real, validated data: clients, the four service
lines, the pricing plans, the FAQ, and the technology list. Each becomes a typed
module in `src/data` parsed through the schema 2a defined, so a malformed entry
fails the build.

Nothing renders these yet - features 5, 7, 8 and 10 build those surfaces. This
feature makes the content exist and be correct, so those features build against
real copy instead of placeholders.

## Design reference

[../reference/content-brief.md](../reference/content-brief.md) is the source for
every string here. Sections 5 (clients), 6 (services), 8-11 (pricing), 12
(technologies) and 13 (FAQ).

No visual work, so `prototypes/` does not apply.

## In scope

- `src/data/clients.ts` - the nine names from the brief, all flagged placeholder
- `src/data/services.ts` - the four service lines
- `src/data/pricing.ts` - e-commerce's three tiers plus one plan per other line
- `src/data/faqs.ts` - the fifteen questions with drafted answers, unpublished
- `src/data/technologies.ts` - only what this repo demonstrably uses
- Deleting `src/data/pricing-data.ts`, the template's pricing, once nothing
  imports it

## Out of scope

- Rendering any of it. Features 5, 7, 8 and 10 build the roster, services,
  pricing tabs and FAQ
- The hero, positioning statements, featured project and final CTA from the
  brief - those are copy for features 3, 4, 6 and 12, not content modules
- Migrating projects and team off markdown - that is 2c
- Campaign and testimonial modules. `campaignSchema` and `testimonialSchema`
  exist, but the brief supplies no campaign, and testimonials are already
  converted

## Build loop

Build one step at a time, never the whole feature at once.

1. Plan mode lays out the step before any code.
2. The AI implements just that step.
3. It shows the diff (not full files); you read it and understand it.
4. You approve, then choose whether to commit a checkpoint or roll straight on.
   Checkpoints are optional; `/complete` makes the real feature-level commit at the end.

Never accept a step you haven't read. If a diff is too big to review, the step was too big, so split it.

## Build steps

- [x] **Step 1 - services** - add `src/data/services.ts` with the four lines from
  brief section 6, parsed through `serviceSchema`. The brief gives a name and
  description for each; `tagline` comes from the pricing section's supporting
  line for that line, and `deliverables` from that line's feature list, so both
  trace to the brief rather than being invented. `iconKey` is a plain string key
  - no icon component is chosen here. *Done when:* `bun run build` and `bun run
  lint` pass; the module exports four entries whose slugs match `serviceSlugs`
  exactly.

- [x] **Step 2 - pricing** - add `src/data/pricing.ts` with the six plans from
  brief sections 8-11: e-commerce Starter (free), Essential, and Grow, plus one
  plan each for website/app, landing page and AI agents. Prices, periods,
  features and CTA labels are verbatim from the brief. Mark e-commerce Essential
  `recommended`. *Done when:* build and lint pass; grouping the export by
  `serviceSlug` yields 3 / 1 / 1 / 1; the free tier is `priceBdt: 0` and every
  other plan has `startingFrom: true`.

- [x] **Step 3 - retire the template pricing** - delete
  `src/data/pricing-data.ts` and repoint or remove its two consumers,
  `src/components/pricing/pricing.tsx` and
  `src/components/shared/ui/card/pricing-card.tsx`. The template's pricing page
  renders monthly/yearly toggle tiers that no longer match the brief's model, so
  the page shows the new data or an honest placeholder until feature 8 rebuilds
  it. Decide which at the step and say so in the diff. *Done when:* build and
  lint pass; `grep -rn "pricing-data" src/` returns nothing; `/pricing` still
  renders without error.

- [x] **Step 4 - clients** - add `src/data/clients.ts` with the nine names from
  brief section 5, every entry `placeholder: true`. `descriptor` and `industry`
  are required by the schema but absent from the brief, so each carries an
  obviously provisional value that names itself as such rather than inventing a
  plausible engagement. *Done when:* build and lint pass; nine entries, all
  `placeholder: true`; no descriptor reads as a real completed project.

- [x] **Step 5 - technologies** - add `src/data/technologies.ts` with only what
  this repo demonstrably uses, verified against `package.json`: TypeScript,
  React, Next.js, Node.js, Tailwind CSS. Not the brief's other eight, which
  cannot be verified. *Done when:* build and lint pass; every entry is traceable
  to a dependency in `package.json`, and a comment says so.

- [x] **Step 6 - FAQ** - add `src/data/faqs.ts` with the fifteen questions from
  brief section 13 and drafted answers, every entry `published: false`. Answers
  use **only** facts already in the brief - the 5-10 day turnaround, the
  published prices, the four service lines, the stack from step 5. Where the
  brief supports no answer, say what is knowable and stop rather than inventing
  a commitment. *Done when:* build and lint pass; fifteen entries, all
  `published: false`; no answer states a delivery time, price, guarantee or
  partnership term that is not in the brief.

## Outcome

9 source files, +542 / -355. The content brief is now validated data.

**Evidence at completion.** `bun run build` exit 0 and `bun run lint` 0 errors
after every step. Counts confirmed by executing the modules, not by reading
them:

```
services: 4 | plans: 6 | clients: 9 | technologies: 5 | faqs: 15
all clients placeholder: true
all faqs unpublished: true
```

Pricing groups 3 / 1 / 1 / 1 by service line, the free Starter is `priceBdt: 0`,
every paid plan carries `startingFrom: true`, and e-commerce Essential is the
one `recommended`. `/pricing` returns 200 showing real prices.

**Where the brief was silent, nothing was invented.** This was the feature's
main risk, and the plan forbids claiming services, clients, technologies or
results FathomXO does not provide:

- **Client descriptors and industries** are absent from the brief but required
  by the schema. All nine read `TODO: describe the real engagement` rather than
  a plausible engagement. A convincing invention is the dangerous option,
  because it survives review and can ship.
- **Three FAQ answers** are `TODO`, where the brief supports no answer:
  discovery calls, working alongside another agency, and inheriting an existing
  design. Each is a business commitment, not a wording choice.
- **Technologies cut from thirteen to five.** Only TypeScript, React, Next.js,
  Node.js and Tailwind are dependencies of this repo. The brief's other eight
  (Express, Python, Django, PostgreSQL, MongoDB, Cloudflare, AWS, OpenAI) are
  not present and were left out rather than claimed.

**Where the brief was partially silent, values were sourced rather than
invented.** `serviceSchema` needs a tagline and deliverables that section 6 does
not give. Each line's tagline is its own supporting sentence from its pricing
section, and its deliverables come from that section's feature list, so both
trace back to the brief.

**The step 3 judgement call.** The spec allowed either the new data or an honest
placeholder on `/pricing`. The template's card was structurally incompatible -
monthly/yearly toggle against a model that has neither - so `pricing.tsx` was
rewritten as a deliberately plain render of the real plans: no tabs, no toggle.
Showing true prices beats a coming-soon panel. Feature 8 replaces it with the
tabbed surface, and the component says so.

A grep for `Basic` and `Business` after the swap looked like surviving template
tiers. Both are feature strings from the brief - 'Basic storefront' and
'Business-specific knowledge base'. `monthlyPrice`, `yearlyPrice` and
`featureCategories` return nothing.

**Carried forward:**

- Nine client descriptors and three FAQ answers need real decisions before
  anything publishes. All fifteen FAQs are `published: false` and all nine
  clients `placeholder: true`, so none can ship by accident.
- The technologies list is a floor, meant to grow as the stack becomes real.
- 2c migrates projects and team off markdown and removes `gray-matter`,
  `react-markdown` and `rehype-slug`.
## Files / areas

- `src/data/services.ts`, `pricing.ts`, `clients.ts`, `technologies.ts`,
  `faqs.ts` - all new
- `src/data/pricing-data.ts` - deleted in step 3
- `src/components/pricing/pricing.tsx`,
  `src/components/shared/ui/card/pricing-card.tsx` - step 3 only
- Untouched: `src/interface` (2a already defined every schema), markdown
  content, the nav, the footer

## Data / contracts

No new shapes. 2a locked all nine schemas; this feature authors against them.
Two constraints carry from the plan:

**Placeholder content is flagged, never disguised.** All nine clients are
`placeholder: true` and all fifteen FAQ entries are `published: false`. The
plan's rule is that nothing with `placeholder: true` reaches production, and
feature 16 can enforce it.

**Pricing groups by service line, 1..n plans each:**

| Line | Plans | From the brief |
| --- | --- | --- |
| e-commerce | 3 | Starter free, Essential 60,000+, Grow 120,000+ |
| website-app | 1 | 120,000+ |
| landing-page | 1 | 69,000+ |
| ai-agents-automation | 1 | 60,000+ |

Feature 8 reads this and renders three-up or a single wide card by count.

## Testing

`AGENTS.md` declares no `test` command, so no test gate is active. This feature
adds **no logic** - it is data authored against schemas that 2a already proved
reject bad input. The validation happens for free at module load.

- `bun run build` and `bun run lint` after every step. A schema violation fails
  the build, which is the check
- Step 3 is the only step that can break a page. `/pricing` must still render
- Grep the finished modules for the counts each done-when names: four services,
  six plans, nine clients, fifteen FAQs

## Notes for the AI

- **Do not invent business facts.** The plan forbids claiming services, clients,
  technologies or results FathomXO does not provide. Where the brief is silent -
  client descriptors, most FAQ answers - write something visibly provisional
  rather than something plausible. A plausible invention is worse than an
  obvious placeholder, because it survives review.
- Copy the brief's strings **verbatim** where it supplies them. Prices, feature
  lists and CTA labels are not places to improve the wording.
- Voice, per the plan: short sentences, lowercase editorial headings, no
  corporate buzzwords. FAQ answers are direct and human, not "we leverage".
- Every module parses through `parseContent(schema, entries, 'filename.ts')` at
  module load, per the Content section of `coding-standards.md`.
- The BDT figures in the brief use a comma format; store `priceBdt` as a plain
  integer and let the rendering feature format it.
- `iconKey` is a string, not a component. Feature 7 maps keys to icons.
