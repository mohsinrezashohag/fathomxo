'use client';

import { ReactNode } from 'react';

/**
 * Next remounts `template.tsx` on every navigation, which is what makes a
 * route-change animation possible at all.
 *
 * Fade-in only, deliberately. `SmoothScrollProvider` fires
 * `lenis.scrollTo(0, { immediate: true })` on pathname change, so an exit
 * animation would still be playing while the page jumps to the top.
 *
 * CSS rather than GSAP: this wraps every page on every route change, so the
 * cheapest thing that reads correctly wins. `--dur-reveal` and `--ease-brand`
 * come from feature 1a and are zeroed under reduced motion, which is why there
 * is no separate media query here.
 */
const Template = ({ children }: { children: ReactNode }) => {
  return <div className="route-transition">{children}</div>;
};

export default Template;
