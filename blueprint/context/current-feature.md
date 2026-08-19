# Fix: Template teardown

**Type:** Fix
**Status:** not started

## The problem

`project-plan.md` §5 mandates a pre-build teardown of the NextSaaS starter's
dead surfaces before feature 1: the `blog`, `login`, `signup`, and `team`
routes, their content, and unused dependencies. Dead template code is worse
than missing code because it is the nearest example in the repo, so every
later feature risks copying its conventions.

Blast-radius analysis narrowed the scope (user-approved): `gray-matter` feeds
6 surviving routes (including `/` and `/about`) and `react-markdown` +
`rehype-slug` render the surviving `/projects/[slug]` and `/services/[slug]`,
so the markdown pipeline for projects/services stays until feature 2 replaces
it with typed TS modules. The full "no markdown pipeline" state from the plan
lands at feature 2, not here. `swiper` has zero imports and goes now.

## The fix

Delete the four doomed route groups, their component folders, and blog/team
markdown; remove the two surviving-page sections that read doomed data (home
Blog, about Team); repoint or remove every nav link that targets a removed
route; sweep orphans; drop `swiper`. The site must build and every surviving
route must keep working after each step.

**Pre-step for `/implement`:** the repo has zero commits. Make an initial
commit of the current state on `main` (ask first), then branch
`fix/template-teardown`.

## Build steps

- [ ] **Step 1 - delete doomed routes, components, and content** - remove
  `src/app/blog/`, `src/app/login/`, `src/app/signup/`, `src/app/team/`;
  `src/components/auth/`, `src/components/blog/`, `src/components/blog-details/`,
  `src/components/team-details/`; `src/data/blog/`, `src/data/team/`. Also
  delete `src/components/home/blog.tsx` and remove `<Blog />` from
  `src/app/page.tsx`; delete `src/components/about/team.tsx` and remove
  `<Team />` from `src/app/about/page.tsx` (both read doomed data folders and
  would crash the build). *Done when:* `bun run build` passes; `/blog`,
  `/login`, `/signup`, `/team/*` 404; home renders without the Blog section
  and About without the Team grid.

- [ ] **Step 2 - remove dead links from surviving nav** - in
  `src/data/mobile-meu.ts` remove the "Blog & News", "Login", and "Create
  Account" entries; in `navbar.tsx` repoint the "Try now" CTA from `/login` to
  `/contact`; in `resources-menu.tsx` remove the `/blog` entry; in
  `platform-menu.tsx` remove the two hardcoded blog feature cards plus their
  `ns-img-424.jpg` / `ns-img-425.jpg` imports and delete those two images from
  `public/images/`; in `plan-and-support-menu.tsx` remove the `/login` and
  `/signup` entries. *Done when:* no desktop or mobile menu link targets a
  removed route; build passes.

- [ ] **Step 3 - orphan sweep and swiper removal** - delete
  `src/utils/blogFilters.ts`, `src/utils/generateTOC.ts`,
  `src/utils/parseUseCaseDate.ts`, `src/data/footer.ts`,
  `src/components/shared/ui/card/blog-card.tsx`, `team-card.tsx`,
  `src/hooks/use-typewriter.ts`, `src/components/animation/typewriter.tsx`,
  `src/components/shared/demo-showcase.tsx`. In `src/interface/index.ts`
  remove `FooterData`, `FooterLink`, `FooterLinkGroup`, `FooterSocialLink`,
  `BlogPost`, `BlogCategory`, `BlogDateRecord`, `TeamMember`, `UseCasePost`.
  Prune newly dead icon exports after confirming zero importers:
  `GoogleIcon`, `FacebookBrandIcon`, `CrossIcon`, `SearchIcon`, `GradientSvg`
  in `shared/icon/index.tsx`; `BlogIcon`, `LoginIcon`, `SignUpIcon` in
  `shared/icon/menu-icon/index.tsx`. Remove the `.blog-details-markdown` and
  `.team-details-markdown` blocks from `src/styles/common.css`. Remove
  `swiper` from `package.json` and run `bun install`. *Done when:* build and
  lint pass; `grep -ri swiper src/` is empty; no references to the deleted
  files or types remain.

## Must not break (keep-list)

- `gray-matter`, `react-markdown`, `rehype-slug` and
  `src/utils/getMarkDownData.ts` / `getMarkDownContent.ts` - feature 2
  removes them, not this fix
- `src/data/projects/` and `src/data/services/` markdown
- `react-fast-marquee` (home testimonial marquee)
- `src/data/{faq-data,pricing-data,testimonials-data,mobile-meu}.ts`
- Shared code used by surviving pages: `use-button-split-text`,
  `shared/ui/pagination`, `shared/social-icons`, `shared/cta`,
  `generateMetaData`, `animation/{reveal-animation,text-reveal-animation}`
- `public/fonts/next-sass.*` icon font (glyphs used by `/about`)
- Bulk `public/images/` cleanup is out of scope: `opai-avatar-img-01..05`
  are shared with `testimonials-data.ts`; leftover blog/team images are inert
  and get swept when features replace template assets

## Verify

- `bun run build` and `bun run lint` green (no test runner configured; the
  evidence gate is build + lint + click-through)
- Removed routes 404: `/blog`, `/blog/anything`, `/login`, `/signup`,
  `/team/anything`
- Surviving routes render: `/`, `/about`, `/contact`, `/faq`, `/pricing`,
  `/projects`, one `/projects/[slug]`, `/services`, one `/services/[slug]`
- Desktop nav menus and the mobile menu contain no links to removed routes;
  the "Try now" CTA goes to `/contact`
