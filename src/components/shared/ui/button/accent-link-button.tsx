'use client';

import { useButtonSplitText } from '@/src/hooks/use-button-split-text';
import { cn } from '@/src/utils/cn';
import Link from 'next/link';
import { useRef } from 'react';

export interface AccentLinkButtonProps {
  href: string;
  /** Plain string: GSAP SplitText splits it per character. */
  children: string;
  className?: string;
  displayClassName?: string;
}

/**
 * The brand accent pill, with the starter's split-text hover: the label rolls up
 * and out while a second copy rolls in beneath it, staggered per character.
 *
 * Same `useButtonSplitText` hook the template's buttons use, so the motion is
 * identical; only the palette is ours. Label colour is --color-accent-ink, never
 * white, which measures 3.77:1 on the accent and fails.
 */
export function AccentLinkButton({
  href,
  children,
  className,
  displayClassName,
}: Readonly<AccentLinkButtonProps>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useButtonSplitText(wrapperRef);

  return (
    <div
      ref={wrapperRef}
      className={cn('button-split-text-wrapper inline-block', displayClassName)}
    >
      <Link
        href={href}
        aria-label={children}
        className={cn(
          'group bg-accent hover:border-accent focus-visible:outline-accent relative flex max-h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-transparent px-6 py-[11px] shadow-[0_3px_18px_0_var(--color-accent-glow)] transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2',
          className
        )}
      >
        <div className="relative overflow-hidden">
          <div className="h-5.5">
            <span
              className="button-split-upper-text text-accent-ink block font-mono text-xs leading-[1.4] font-medium tracking-[var(--tracking-mono)] text-nowrap uppercase"
              aria-hidden
            >
              {children}
            </span>
          </div>
          <div className="absolute h-5.5">
            <span
              className="button-split-lower-text text-accent-ink block font-mono text-xs leading-[1.4] font-medium tracking-[var(--tracking-mono)] text-nowrap uppercase"
              aria-hidden
            >
              {children}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
