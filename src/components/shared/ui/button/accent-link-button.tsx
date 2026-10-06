'use client';

import { CtaArrow, CtaHalo } from '@/src/components/shared/ui/button/cta-ornaments';
import { useButtonSplitText } from '@/src/hooks/use-button-split-text';
import { cn } from '@/src/utils/cn';
import Link from 'next/link';
import { useRef } from 'react';

export interface AccentLinkButtonProps {
  href: string;
  /** Plain string: GSAP SplitText splits it per character. */
  children: string;
  /** `hero` adds the starter's arrow badge and breathing halo rings. */
  size?: 'default' | 'hero';
  className?: string;
  displayClassName?: string;
}

const ACCENT_HALO = ['border-accent/22', 'border-accent/13', 'border-accent/7'] as const;

/**
 * The brand accent pill, with the starter's split-text hover: the label rolls up
 * and out while a second copy rolls in beneath it, staggered per character.
 *
 * Same `useButtonSplitText` hook the template's buttons use, so the motion is
 * identical; only the palette is ours. Label colour is --color-accent-ink, never
 * white, which measures 3.77:1 on the accent and fails.
 */
/* The hero pill's left padding is not a round number on purpose. The arrow badge
   only sits on the right, so symmetric padding would leave the label visibly left
   of centre. 3.875rem is 62px: the label's own pr-3 (12) plus the badge's ml-1 (4),
   its 40px box, and the pill's pr-1.5 (6). Change any of those four and this moves
   with them. */
export function AccentLinkButton({
  href,
  children,
  size = 'default',
  className,
  displayClassName,
}: Readonly<AccentLinkButtonProps>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useButtonSplitText(wrapperRef);
  const isHero = size === 'hero';

  return (
    <div
      ref={wrapperRef}
      className={cn('button-split-text-wrapper relative inline-block', displayClassName)}
    >
      <Link
        href={href}
        aria-label={children}
        className={cn(
          'group bg-accent hover:border-accent focus-visible:outline-accent relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-transparent shadow-[0_3px_18px_0_var(--color-accent-glow)] transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2',
          isHero
            ? 'py-[5px] pr-1.5 pl-[3.875rem] hover:shadow-[0_6px_30px_0_var(--color-accent-glow)]'
            : 'max-h-12 px-6 py-[11px]',
          className
        )}
      >
        <div
          className={cn(
            isHero ? 'text-14' : 'text-xs',
            'relative overflow-hidden',
            isHero && 'pr-3'
          )}
        >
          <div className="h-[1.4em]">
            <span
              className="button-split-upper-text text-ink block [text-indent:0.06em] font-mono leading-[1.4] font-bold tracking-[var(--tracking-mono)] text-nowrap uppercase"
              aria-hidden
            >
              {children}
            </span>
          </div>
          <div className="absolute h-[1.4em]">
            <span
              className="button-split-lower-text text-ink block [text-indent:0.06em] font-mono leading-[1.4] font-bold tracking-[var(--tracking-mono)] text-nowrap uppercase"
              aria-hidden
            >
              {children}
            </span>
          </div>
        </div>

        {isHero && <CtaArrow discClassName="bg-accent-ink" arrowClassName="stroke-ink" />}
      </Link>

      {isHero && <CtaHalo ringClassNames={ACCENT_HALO} />}
    </div>
  );
}
