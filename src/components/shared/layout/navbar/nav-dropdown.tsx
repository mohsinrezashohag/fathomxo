'use client';

import HoverBgTransform from '@/src/components/shared/hover-bg-transform';
import { NavLink } from '@/src/interface';
import { cn } from '@/src/utils/cn';
import { navItemGlow, navItemLine, navLinkText } from './navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useId, useRef } from 'react';

/** Featured work shown beside the service list, so the menu sells rather than just routes. */
const featured = [
  {
    title: 'Transforming e-Commerce',
    blurb: 'Recommendations engine that lifted conversion 40%.',
    href: '/projects/ai-ecommerce-smart-shopping',
    image: '/images/opai-img-488.jpg',
  },
  {
    title: 'Automated customer support',
    blurb: 'Context-aware virtual agents answering in seconds.',
    href: '/projects/automated-ai-customer-support',
    image: '/images/opai-img-487.jpg',
  },
];

interface NavDropdownProps {
  link: NavLink;
  isActive: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  itemClassName: string;
}

/**
 * The template's mega menu opened on hover only, so the panel was unreachable by
 * keyboard and its trigger was an `href="#"` placeholder. Here the trigger is a
 * real link that still navigates, and the panel opens on hover *and* on focus.
 *
 * The panel positions against the `<header>`, not this `<li>`, so it can span the
 * full bar. DOM containment is unchanged, so the focus handling below still works.
 */
const NavDropdown = ({
  link,
  isActive,
  isOpen,
  onOpen,
  onClose,
  itemClassName,
}: NavDropdownProps) => {
  const panelId = useId();
  const itemRef = useRef<HTMLLIElement>(null);

  // Only close when focus actually leaves the item, not when it moves between
  // the trigger and the children inside it.
  const handleBlur = (event: React.FocusEvent<HTMLLIElement>) => {
    if (!itemRef.current?.contains(event.relatedTarget as Node | null)) onClose();
  };

  return (
    <li
      ref={itemRef}
      className={itemClassName}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={handleBlur}
      onKeyDown={(event) => event.key === 'Escape' && onClose()}
    >
      <span className={navItemLine} />
      <span className={navItemGlow} />
      <Link
        href={link.href}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-current={isActive ? 'page' : undefined}
        className="focus-visible:outline-accent relative z-1 flex items-center gap-1.5 rounded focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className={navLinkText}>{link.label}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden
          className={cn('transition-transform duration-[var(--dur-hover)]', isOpen && 'rotate-180')}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <div
        id={panelId}
        className={cn(
          'absolute top-full left-1/2 w-[min(1100px,calc(100vw-2.5rem))] -translate-x-1/2 pt-3',
          'transition-[opacity,transform] duration-[var(--dur-hover)] ease-[var(--ease-brand)]',
          'motion-reduce:transition-none',
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-1 opacity-0'
        )}
      >
        <div className="border-hairline bg-surface rounded-card grid gap-8 border p-6 backdrop-blur-xl lg:grid-cols-[minmax(220px,1fr)_2fr]">
          <div>
            <p className="text-ink-muted mb-2 px-3 font-mono text-xs tracking-[var(--tracking-mono)] uppercase">
              Service lines
            </p>
            <ul className="grid gap-0.5">
              {link.children?.map((child) => (
                <li key={child.label}>
                  <Link
                    href={child.href}
                    tabIndex={isOpen ? undefined : -1}
                    onClick={onClose}
                    className="group focus-visible:outline-accent relative block rounded-[10px] px-3 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {/* The starter's layered hover: a background pane fades up
                        behind the row rather than the row changing colour. */}
                    <HoverBgTransform className="bg-surface-raised group-hover:opacity-100" />
                    <span className="text-ink-secondary group-hover:text-ink relative z-10 text-sm transition-colors duration-300">
                      {child.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {featured.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  tabIndex={isOpen ? undefined : -1}
                  onClick={onClose}
                  className="group border-hairline hover:border-hairline-strong focus-visible:outline-accent block rounded-[var(--radius-control)] border p-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <span className="block overflow-hidden rounded-[var(--radius-control)]">
                    <Image
                      src={item.image}
                      alt=""
                      width={320}
                      height={180}
                      className="h-36 w-full object-cover transition-transform duration-[var(--dur-reveal)] ease-[var(--ease-brand)] group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </span>
                  <span className="text-ink mt-3 block text-sm font-medium">{item.title}</span>
                  <span className="text-ink-muted mt-1 block text-xs">{item.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default NavDropdown;
