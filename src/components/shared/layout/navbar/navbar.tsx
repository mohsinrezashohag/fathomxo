'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { AccentLinkButton } from '@/src/components/shared/ui/button';
import symbolMark from '@/src/assets/images/logos/svg/symbol-dark.svg';
import { navCta, navLinks } from '@/src/data/navigation';
import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import MobileMenu, { MobileMenuGroup } from '@/src/components/shared/layout/mobile-menu/MobileMenu';
import { MobileMenuProvider } from '@/src/context/MobileMenuContext';
import { useNavbarScroll } from '@/src/hooks/useScrollHeader';
import MobileMenuButton from './mobile-menu-button';
import NavDropdown from './nav-dropdown';

/**
 * The hairline that grows above a hovered item, and the accent bloom behind it.
 * Ported from the starter's header with the brand accent in place of its purple;
 * the two together are what make the pill read as lit rather than flat.
 */
export const navItemLine =
  'pointer-events-none absolute top-0 left-1/2 h-px w-0 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent,var(--color-ink),transparent)] transition-all duration-500 ease-out group-hover/nav-item:w-24';

export const navItemGlow =
  'pointer-events-none absolute top-0 left-1/2 h-[89%] w-[calc(100%+120px)] -translate-x-1/2 bg-radial-[circle_at_top] from-[var(--color-accent-glow)] from-30% to-transparent to-100% opacity-0 blur-[14px] transition-opacity duration-500 ease-out group-hover/nav-item:opacity-100';

export const navLinkText =
  'font-mono text-ink-muted text-xs tracking-[var(--tracking-mono)] uppercase transition-colors duration-500 group-hover/nav-item:text-ink';

const focusRing =
  'focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2';

/** The drawer's grouped shape, derived from the one nav source rather than a
 *  second data file. That split is what let the template's desktop and mobile
 *  menus drift into different structures. */
const drawerGroups: MobileMenuGroup[] = [
  ...navLinks.map((link) => ({
    id: link.label.toLowerCase(),
    title: link.label,
    submenu: (link.children ?? []).map((child) => ({
      id: `${link.label}-${child.label}`.toLowerCase().replace(/\s+/g, '-'),
      label: child.label,
      href: child.href,
    })),
  })),
  { id: 'brief', title: navCta.label, submenu: [] },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { isScrolled } = useNavbarScroll(150);
  const pathname = usePathname();

  return (
    <MobileMenuProvider>
      {/* A floating pill, not a full-width bar: it overlays the page, so the
          96-200px of top padding every hero already carries stays correct. */}
      <header
        onMouseLeave={() => setOpenDropdown(null)}
        className={cn(
          'fixed top-6 left-1/2 z-[var(--z-nav)] w-full max-w-[350px] -translate-x-1/2 transition-all duration-500 ease-in-out md:max-w-[640px] lg:max-w-[900px]',
          isScrolled && 'top-2'
        )}
      >
        {/* The pill rises up on load as part of the entrance sequence; feature 1d
            folds this into the orchestrated GSAP timeline. */}
        <RevealAnimation direction="up" offset={100} delay={0.8} instant>
          <nav className="border-hairline bg-surface/95 flex items-center justify-between gap-4 rounded-full border py-1.5 pr-1.5 pl-1.5 backdrop-blur-xl lg:gap-8">
            <Link
              href="/"
              aria-label="FathomXO home"
              className={cn(
                'bg-surface-raised grid size-11 shrink-0 place-items-center rounded-full',
                focusRing
              )}
            >
              <Image src={symbolMark} alt="" width={26} height={17} className="w-[26px]" priority />
            </Link>

            <ul className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const itemClassName = cn(
                  'group/nav-item relative flex items-center py-4',
                  isActive && '[&_span]:text-ink'
                );

                if (link.children?.length) {
                  return (
                    <NavDropdown
                      key={link.label}
                      link={link}
                      isActive={isActive}
                      isOpen={openDropdown === link.label}
                      onOpen={() => setOpenDropdown(link.label)}
                      onClose={() => setOpenDropdown(null)}
                      itemClassName={itemClassName}
                    />
                  );
                }

                return (
                  <li key={link.label} className={itemClassName}>
                    <span className={navItemLine} />
                    <span className={navItemGlow} />
                    <Link
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn('relative z-1 rounded', focusRing)}
                    >
                      <span className={navLinkText}>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <AccentLinkButton href={navCta.href} displayClassName="hidden lg:inline-block">
              {navCta.label}
            </AccentLinkButton>

            <MobileMenuButton />
          </nav>
        </RevealAnimation>
      </header>

      <MobileMenu menuData={drawerGroups} />
    </MobileMenuProvider>
  );
};

export default Navbar;
