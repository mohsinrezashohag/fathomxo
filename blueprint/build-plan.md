# Build Plan

> Project: **FathomXO**. Depth lives in `project-plan.md`; each item here gets its
> own `/feature` spec when it comes up.
>
> Scaffolding (Next.js, Tailwind, Bun, the `src/` layout) and the logo assets in
> `src/assets/images/logos/` are already in place, so they are not listed as
> features. Item 1 turns the brand tokens from the logos README into code;
> everything after it consumes those tokens.

## MVP

- [ ] 1. **Design system and shell** - map the brand tokens into `src/styles`, set
  the type scale and motion tokens, and build the nav, footer and page-transition shell
- [ ] 2. **Content model** - typed content modules in `src/data` with Zod schemas in
  `src/interface`, validated at build time; migrates projects, services and team off
  the starter's markdown pipeline and removes `gray-matter`, `react-markdown` and
  `rehype-slug` once nothing imports them
- [ ] 3. **Hero and 3D signature** - statement headline with an orchestrated load
  sequence and the symbol-derived 3D object, plus its poster-frame fallback
- [ ] 4. **Positioning sections** - scroll-revealed oversized statements carrying the
  studio's point of view down the home page
- [ ] 5. **Client roster** - typographic list of clients with descriptors, each row
  linking through to its case study
- [ ] 6. **Case study pages** - problem, approach, stack, outcome and gallery for a
  single project
- [ ] 7. **Services** - the four service lines with deliverables, and a detail page
  per line
- [ ] 8. **Pricing tabs** - one tab per service line with BDT tiers, recommended
  state and CTAs
- [ ] 9. **Launch campaign banner** - countdown and progress bar for an active
  product release
- [ ] 10. **FAQ** - searchable entries with a category rail and accordion answers
- [ ] 11. **Studio and team** - who FathomXO is, plus team members with photos, roles
  and titles, restyled from the existing content to the brand system
- [ ] 12. **Project brief intake** - multi-step qualified form with shared validation
  and spam protection
- [ ] 13. **Brief notifications** - route handler that sends the internal alert and
  the branded auto-reply
- [ ] 14. **SEO and social** - metadata, structured data, sitemap, robots, dynamic OG
  images, favicon and PWA icon set, cookieless analytics
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
