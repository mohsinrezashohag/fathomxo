import { FooterLinkGroup, FooterSocialLink } from '@/src/interface';

/**
 * The single source for the footer, matching how `navigation.ts` feeds the nav.
 * Copy comes from section 15 of blueprint/reference/content-brief.md.
 */

export const footerTagline = 'Software built for ambitious ideas.';

/** Rendered in the bottom bar as mono micro-caps. */
export const footerSignoff = "FATHOMXO — BUILDING WHAT'S NEXT.";

export const footerGroups: FooterLinkGroup[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Work', href: '/projects' },
      { label: 'Services', href: '/services' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    // The brief lists six here, but Custom Software and Automation are not
    // service lines and have no page. Feature 7 gives each of these four its
    // own slug; until then they share the services index.
    title: 'Services',
    links: [
      { label: 'E-Commerce', href: '/services' },
      { label: 'Website / App', href: '/services' },
      { label: 'Landing Page', href: '/services' },
      { label: 'AI Agents / Automation', href: '/services' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'About', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

/**
 * The brief names the networks but not the handles, so every href is a
 * placeholder. Nothing with `placeholder: true` may ship to production.
 */
export const footerSocials: FooterSocialLink[] = [
  { name: 'Instagram', href: '#', placeholder: true },
  { name: 'LinkedIn', href: '#', placeholder: true },
  { name: 'GitHub', href: '#', placeholder: true },
  { name: 'Facebook', href: '#', placeholder: true },
];

export const footerContact = {
  email: 'hello@fathomxo.com',
  location: 'Dhaka, Bangladesh',
};
