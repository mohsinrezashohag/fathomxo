import { NavLink } from '@/src/interface';

/**
 * The single source of truth for site navigation. Desktop and mobile both read
 * this, replacing the template's split between per-file hardcoded arrays and
 * the old mobile data file, which had drifted into a different menu structure.
 *
 * The four service lines are the real ones from the project plan. Until feature
 * 7 builds a page per line, each child points at the `/services` index, so the
 * dropdown works and nothing 404s; feature 7 repoints each href to its slug.
 */
export const navLinks: NavLink[] = [
  { label: 'Work', href: '/projects' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'E-commerce', href: '/services' },
      { label: 'Website / App', href: '/services' },
      { label: 'Landing page', href: '/services' },
      { label: 'AI agents / automation', href: '/services' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  // Feature 11 repoints this at the real studio page.
  { label: 'Studio', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

/** Feature 12 repoints this at the brief intake route. */
export const navCta: NavLink = { label: 'Send the brief', href: '/contact' };
