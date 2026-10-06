# Build Plan

> Project: **FathomXO**. Depth lives in `project-plan.md`; each item here gets its
> own `/feature` spec when it comes up.
>
> Scaffolding (Next.js, Tailwind, Bun, the `src/` layout) and the logo assets in
> `src/assets/images/logos/` are already in place, so they are not listed as
> features. Item 1 turns the brand tokens from the logos README into code;
> everything after it consumes those tokens.

## MVP

- [x] 1. **Design system and shell** - map the brand tokens into `src/styles`, set
  the type scale and motion tokens, and build the nav, footer and page-transition shell
  - [x] 1a. **Brand token layer** - FathomXO colours, the 12-120 type scale, motion
    easings, radius and container tokens as Tailwind v4 `@theme` tokens, with
    role-named font variables pointing at the template's existing Space Grotesk,
    Inter Tight and IBM Plex Mono
  - [x] 1b. **Site nav** - header on the new tokens: logo, primary links, brief CTA and
    mobile menu, replacing the template's four mega menus
  - [x] 1c. **Site footer** - footer on the new tokens, with links matching the real
    route set
  - [x] 1d. **Scroll and page-transition shell** - sync the existing Lenis provider with
    GSAP ScrollTrigger, then add the route-change transition, resolving to final state
    under `prefers-reduced-motion`
- [x] 2. **Content model** - typed content modules in `src/data` with Zod schemas in
  `src/interface`, validated at build time; migrates projects, services and team off
  the starter's markdown pipeline and removes `gray-matter`, `react-markdown` and
  `rehype-slug` once nothing imports them
  - [x] 2a. **Schema layer** - install Zod, define the nine content schemas in
    `src/interface`, and fail the build on a malformed entry
  - [x] 2b. **Brief content modules** - clients, the four service lines, pricing plans,
    FAQs and technologies, authored from the content brief against those schemas
  - [x] 2c. **Markdown retirement** - move projects and team to typed modules flagged
    as placeholder, repoint their consumers, and remove `gray-matter`,
    `react-markdown` and `rehype-slug`
- [ ] 3. **Hero and 3D signature** - statement headline with an orchestrated load
  sequence and the symbol-derived 3D object, plus its poster-frame fallback
  - [ ] 3a. **Hero section** - the statement headline, eyebrow, supporting line and
    both CTAs on the brand tokens, with a CSS/SVG symbol treatment that doubles as
    the 3D object's fallback
  - [ ] 3b. **Load sequence** - one orchestrated GSAP timeline on first paint:
    mask-reveal headline, symbol fades up, nav settles, resolving to final state
    under `prefers-reduced-motion`
  - [ ] 3c. **3D signature object** - React Three Fiber torus and crossed capsules
    derived from the symbol, accent-lit and pointer-reactive, lazily loaded outside
    the JS budget with the 3a treatment as its poster
- [ ] 4. **Positioning sections** - scroll-revealed oversized statements carrying the
  studio's point of view down the home page
- [ ] 5. **Client roster** - typographic list of clients with descriptors, each row
  linking through to its case study
  > Data landed early during feature 3: `src/data/clients.ts` holds the three real
  > clients (Redwave Marketing, X-Factor Academic Solutions, Boichitro BD) with
  > engagement lines, and the nine example names are removed. The roster surface
  > itself is still unbuilt.
- [ ] 6. **Case study pages** - problem, approach, stack, outcome and gallery for a
  single project
  > Data landed early during feature 3: seven entries in `src/data/projects.ts`,
  > three real and four demo, all `placeholder: true` until the real narratives are
  > confirmed. The three real clients now carry cropped WebP screenshots of their
  > live sites in `public/images/work`; the four demo entries use the brand SVG
  > covers in `public/images/covers`. The detail page is still the template's.
- [ ] 7. **Services** - the four service lines with deliverables, a detail page
  per line, and the technology capability badges
  > The technology badges landed early during feature 3:
  > `src/components/shared/technologies.tsx`, seven tabbed categories over 44
  > technologies with brand-coloured icons, mounted on `/` and `/services`. The
  > service lines and their detail pages are still the template's.
- [ ] 8. **Pricing tabs** - one tab per service line with BDT tiers, recommended
  state and CTAs
- [ ] 9. **Launch campaign banner** - countdown and progress bar for an active
  product release
- [ ] 10. **FAQ** - searchable entries with a category rail and accordion answers
- [ ] 11. **Studio and team** - who FathomXO is, plus team members with photos, roles
  and titles, restyled from the existing content to the brand system
  > Data landed early during feature 3: `src/data/team.ts` holds the three real
  > members with their photos, replacing the six fictional starter entries. The
  > About section and `team/[slug]` are still the template's layout.
- [ ] 12. **Project brief intake** - multi-step qualified form with shared validation
  and spam protection
- [ ] 13. **Brief notifications** - route handler that sends the internal alert and
  the branded auto-reply
- [ ] 14. **SEO and social** - metadata, structured data, sitemap, robots, dynamic OG
  images, favicon and PWA icon set, cookieless analytics
  > Partly landed during feature 3: every route title and description is FathomXO's,
  > `generateMetaData.ts` carries the real defaults and reads
  > `NEXT_PUBLIC_SITE_URL`, and `src/app/icon.png` / `apple-icon.png` ship the
  > favicon and touch icon. Structured data, sitemap, robots, the dynamic OG route
  > and analytics are all still to do.
- [ ] 15. **Performance and accessibility pass** - hit the JS budget, reduced-motion
  behaviour, contrast, keyboard paths and low-end-device fallbacks
- [ ] 16. **Deployment readiness** - Vercel config, env vars, health check, domain
  and production build verification

## Post-MVP

- [ ] 17. **Lead persistence** - Postgres schema mirroring the lead payload, with the
  brief writing to the database as well as email
- [ ] 18. **Admin authentication** - magic-link login and a protected admin area for
  the team
- [ ] 19. **Lead inbox** - list, filter, assign and status-track incoming briefs
- [ ] 20. **Content editing** - move `src/data` modules behind an editor so copy,
  pricing and case studies change without a deploy
- [ ] 21. **Insights** - short-form articles and build notes with tags and RSS
- [ ] 22. **Bangla language toggle** - localised routes and content for BN/EN
- [ ] 23. **Discovery call booking** - scheduling handoff from a qualified brief
- [ ] 24. **Client portal** - read-only project status and deliverable links for
  active clients
- [ ] 25. **Referral programme** - tracked partner codes and attribution on closed work
- [ ] 26. **Careers** - open roles and an application intake
