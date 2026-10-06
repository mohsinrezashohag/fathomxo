# Client work screenshots

Drop a screenshot of each client's live site here, named after the project slug
in `src/data/projects.ts`. The names below are what the code will look for:

| File | Project | Site |
| --- | --- | --- |
| `redwave-marketing-site.webp` | Two audiences, one site | <https://redwavemarketing.ca/> |
| `x-factor-academic-platform.webp` | Pricing in the open | <https://xfactoras.com/> |
| `boichitro-bd-marketplace.webp` | Fifteen categories, many sellers | <https://boichitrobd.com/> |

All three are in place. The originals as captured live in
`src/assets/images/work-source/`, outside `public` so they are not served; the
WebP files here are what ship.

Demo projects still use the brand SVG covers in `public/images/covers`.

## What to capture

- **Full homepage above the fold**, 1440px wide viewport, no browser chrome.
- **Roughly 16:9** (for example 1440x810 or 1600x900). The card and the case
  study hero both crop to that, so anything much taller loses its bottom.
- PNG or WebP. Keep it under about 400 KB; the whole route has a 180 KB
  first-load JS budget and images eat the rest of the page weight.
- Real content, not a logged-in or admin view. These are public marketing pages.

Once the files are here, `cover` in `src/data/projects.ts` points at
`/images/work/<slug>.png` instead of the SVG, and the three real case studies
show the actual work rather than a generated tile.
