'use client';

import { CtaArrow, CtaHalo } from '@/src/components/shared/ui/button/cta-ornaments';
import { useButtonSplitText } from '@/src/hooks/use-button-split-text';
import { cn } from '@/src/utils/cn';
import Link from 'next/link';
import { useRef } from 'react';

export interface GhostLinkButtonProps {
  href: string;
  /** Plain string: GSAP SplitText splits it per character. */
  children: string;
  /** `hero` adds the starter's arrow badge and breathing halo rings. */
  size?: 'default' | 'hero';
  className?: string;
  displayClassName?: string;
}

/** Ink, not accent: two accent-ringed buttons side by side and neither leads. */
const GHOST_HALO = ['border-ink/12', 'border-ink/8', 'border-ink/5'] as const;

/**
 * The secondary pill: hairline border on the canvas, same split-text hover as
 * AccentLinkButton so the two read as one family.
 *
 * Border is --color-hairline-strong rather than --color-hairline, because this
 * is an interactive edge and only the strong token clears the 3:1 floor.
 */
/* The hero pill's left padding is not a round number on purpose. The arrow badge
   only sits on the right, so symmetric padding would leave the label visibly left
   of centre. 3.875rem is 62px: the label's own pr-3 (12) plus the badge's ml-1 (4),
   its 40px box, and the pill's pr-1.5 (6). Change any of those four and this moves
   with them. */
export function GhostLinkButton({
  href,
  children,
  size = 'default',
  className,
  displayClassName,
}: Readonly<GhostLinkButtonProps>) {
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
          'group border-hairline-strong hover:bg-surface-raised focus-visible:outline-accent relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2',
          isHero ? 'py-[5px] pr-1.5 pl-[3.875rem]' : 'max-h-12 px-6 py-[11px]',
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

        {isHero && <CtaArrow discClassName="bg-surface-raised" arrowClassName="stroke-ink" />}
      </Link>

      {isHero && <CtaHalo ringClassNames={GHOST_HALO} />}
    </div>
  );
}
