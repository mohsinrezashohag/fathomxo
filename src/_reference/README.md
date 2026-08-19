# Reference

Patterns kept from the NextSaaS starter that the FathomXO build removed from the
live tree. **Nothing here is imported by the app.** The folder exists so a later
feature can reuse a pattern instead of rebuilding it, or reverse-engineering it
out of git history.

Because nothing imports these files, Next tree-shakes them: they add zero bytes
to the shipped bundle. They are still typechecked and linted, so they cannot rot
silently.

`types.ts` holds the few interfaces these files need (`BlogPost`, `FooterData`
and friends), declared locally rather than re-added to `src/interface`, so the
real barrel stays free of dead types.

## `nav/` - desktop mega menus

| File                 | Pattern                                                          |
| -------------------- | ---------------------------------------------------------------- |
| `resources-menu.tsx` | Simple 280px dropdown, one flat list of icon + label rows        |
| `platform-menu.tsx`  | Full-width mega menu, two columns with different row shapes      |
| `*-menu-link.tsx`    | Row renderers: icon, label, hover background                     |
| `menu-icons.tsx`     | The twelve icons these use, from the template's 1065-line barrel |

The live `navbar.tsx` already ships a mega menu on Services, built on these
patterns but keyboard-accessible. Reach for these only if you need a _different_
menu shape, such as the image-card layout in `platform-menu`.

`company-menu` and `plan-and-support-menu` were near-duplicates and are in git at
`d40d284~1`, along with the other 34 icons.

## `animation/` - typewriter effect

`typewriter.tsx` plus its `use-typewriter.ts` hook. GSAP `SplitText` driving a
character-by-character type-on, with ScrollTrigger support. Nothing in the app
uses it today; it is the most reusable animation the starter had.

## `content/` - list and long-form helpers

| File                  | What it does                                       | Likely home                      |
| --------------------- | -------------------------------------------------- | -------------------------------- |
| `blogFilters.ts`      | Search, category filter, date grouping, pagination | Feature 5 roster, projects index |
| `generateTOC.ts`      | Builds a table of contents from markdown headings  | Feature 6 case studies           |
| `parseUseCaseDate.ts` | Parses content dates for sorting                   | Any dated content                |

These are pure functions, which makes them the one part of this folder worth
unit-testing if it is ever promoted into the app.

## `ui/` - card and related-items patterns

| File               | Pattern                                                                |
| ------------------ | ---------------------------------------------------------------------- |
| `blog-card.tsx`    | Image, meta row, title, excerpt. Close to what a case-study card needs |
| `related-blog.tsx` | "You might also like" strip, with random-pick logic                    |

`blog-card.tsx` carries one lint warning (`readTime` declared but unused) from
the original. Left as-is so the file stays a faithful copy.

## `data/` - footer shape

`footer.ts` is the starter's footer data: logo, address, contact, socials, link
groups, bottom bar. Feature 1c builds the real footer and should reuse this
**shape** while replacing the content, which still carries the template's
`pixels71` contact details.

## Known gaps - improve these, do not copy them

- **Hover only.** The mega menus have no keyboard path, no Escape, no focus
  management, and their triggers are `href="#"` placeholders. `nav-dropdown.tsx`
  in the live nav shows the keyboard handling to match.
- **Link data hardcoded per file.** The live nav reads `src/data/navigation.ts`;
  anything restored should do the same rather than re-introducing a second
  source of truth. The template had exactly that bug.
- **Template tokens.** These use `bg-background-6`, `text-white` and
  `font-sora`, not the brand tokens from feature 1a. Restyle before shipping.
- **Competitor branding.** `footer.ts` and the card copy still say `pixels71` and
  `Nexsas`.
