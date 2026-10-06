'use client';

import { cn } from '@/src/utils/cn';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DURATION_MS = 2000;
const WORDMARK = 'FATHOMXO';
/** Where the ghost half ends and the accent half begins. */
const SPLIT = 6;

interface WordmarkProps {
  /**
   * Font size in container-query width units, because both callers cap their
   * container and a viewport unit would overflow on a wide screen. 17cqw puts
   * FATHOMXO at roughly 91% of the container in Space Grotesk Bold.
   */
  sizeClassName?: string;
  wrapperClassName?: string;
}

/**
 * The oversized FATHOMXO signature: FATHOM ghosted into the canvas, XO in the
 * accent, both scrambling into place the first time they enter view.
 *
 * Shared by the hero and the footer so the two cannot drift apart. Decorative in
 * both places - the page already names the studio in its h1 and its logo link -
 * so it stays aria-hidden rather than announcing a second heading.
 */
const Wordmark = ({
  sizeClassName = 'text-[17cqw]',
  wrapperClassName = 'py-1 lg:py-2',
}: Readonly<WordmarkProps>) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const fathomRef = useRef<HTMLSpanElement>(null);
  const xoRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = titleRef.current;
      const fathom = fathomRef.current;
      const xo = xoRef.current;
      if (!element || !fathom || !xo) return;

      // Scrambling letters is exactly the kind of motion reduced-motion users
      // ask not to see, so resolve straight to the wordmark instead.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      let startTime: number | null = null;
      let frame = 0;

      /* Scramble the wordmark as one string, then slice it across the two spans.
         Rewriting each span separately would let them settle out of step, and
         the colour break has to stay at the same letter throughout. */
      const paint = (text: string) => {
        fathom.textContent = text.slice(0, SPLIT);
        xo.textContent = text.slice(SPLIT);
      };

      const animate = (currentTime: number) => {
        startTime ??= currentTime;
        const progress = Math.min((currentTime - startTime) / DURATION_MS, 1);
        const revealed = Math.floor(progress * WORDMARK.length);

        paint(
          WORDMARK.split('')
            .map((char, index) =>
              index < revealed ? char : CHARS[Math.floor(Math.random() * CHARS.length)]
            )
            .join('')
        );

        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        } else {
          paint(WORDMARK);
        }
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 100%',
        once: true,
        onEnter: () => {
          startTime = null;
          frame = requestAnimationFrame(animate);
        },
      });

      return () => {
        cancelAnimationFrame(frame);
        scrollTrigger.kill();
      };
    },
    { scope: titleRef }
  );

  return (
    <div
      ref={titleRef}
      className={cn('[container-type:inline-size] overflow-hidden', wrapperClassName)}
      aria-hidden
    >
      <p
        /* Size first: tailwind-merge treats font-size as conflicting with leading,
           because stock `text-lg` sets both. Ours sets only the size, so a size
           class placed after leading silently deletes it. */
        className={cn(
          sizeClassName,
          'font-display text-center leading-[0.72] font-bold tracking-[var(--tracking-display)] text-nowrap'
        )}
      >
        <span ref={fathomRef} className="footer-title">
          FATHOM
        </span>
        <span ref={xoRef} className="text-accent">
          XO
        </span>
      </p>
    </div>
  );
};

export default Wordmark;
