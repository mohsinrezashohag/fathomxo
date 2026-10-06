'use client';

import symbolMark from '@/src/assets/images/logos/svg/symbol-dark.svg';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** The four service lines, as the chips on the process card. */
const LINES = ['E-commerce', 'Website / app', 'Landing page', 'AI automation'];

/**
 * The build log. `tone` picks the prefix and colour: a step that is running, a
 * step that finished, and the one line that is the point of the whole card.
 */
const LOG = [
  { tone: 'prompt', text: 'fxo new "wild idea"' },
  { tone: 'running', text: 'scoping requirements...' },
  { tone: 'done', text: 'architecture mapped' },
  { tone: 'done', text: 'stack chosen, timeline fixed' },
  { tone: 'done', text: 'automation wired' },
  { tone: 'running', text: 'deploying to production...' },
  { tone: 'live', text: 'live, and yours' },
] as const;

const TONE = {
  prompt: { mark: '$', markClass: 'text-accent', textClass: 'text-ink' },
  running: { mark: '>', markClass: 'text-ink-faint', textClass: 'text-ink-faint' },
  done: { mark: 'ok', markClass: 'text-accent', textClass: 'text-ink-secondary' },
  live: { mark: '*', markClass: 'text-accent', textClass: 'text-ink font-bold' },
} as const;

const HowWeWork = () => {
  const logRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>('[data-log-line]');
      if (!lines.length) return;

      /* Reduced motion still gets the card, just not the type-in. gsap.set is the
         final state, so nothing is left hidden. */
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(lines, { opacity: 1, x: 0 });
        return;
      }

      gsap.set(lines, { opacity: 0, x: -8 });
      const tween = gsap.to(lines, {
        opacity: 1,
        x: 0,
        duration: 0.35,
        stagger: 0.16,
        ease: 'power2.out',
        scrollTrigger: { trigger: logRef.current, start: 'top 80%', once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: logRef }
  );

  return (
    <section
      className="border-hairline bg-canvas border-t px-5 py-24 md:py-32"
      aria-labelledby="how-we-work-heading"
    >
      <div className="max-w-site mx-auto">
        <RevealAnimation direction="up">
          <p className="text-ink-muted text-12 font-mono tracking-[var(--tracking-mono)] uppercase">
            Scope / Stack / Ship
          </p>
        </RevealAnimation>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* ---- Idea in. Product out. ---- */}
          <RevealAnimation direction="up" delay={0.1}>
            <article className="border-hairline bg-surface tech-grid relative overflow-hidden rounded-[var(--radius-card)] border p-7 md:p-10">
              <div className="flex items-center gap-3">
                <Image src={symbolMark} alt="" width={34} height={22} className="w-[34px]" />
                <span className="text-ink-faint font-mono text-xs tracking-[var(--tracking-mono)] uppercase">
                  Scope / Stack / Ship
                </span>
              </div>

              {/* The step chart: four stops, the last one open because it is the
                  handover rather than another milestone. */}
              <svg
                viewBox="0 0 520 260"
                className="mt-10 w-full"
                role="img"
                aria-label="Four stages from idea to live"
              >
                <path
                  d="M40 220 H120 L170 130 H300 L350 50 H470"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="3"
                  strokeDasharray="12 10"
                  strokeLinecap="round"
                />
                <circle cx="40" cy="220" r="8" fill="var(--color-accent)" />
                <circle cx="170" cy="130" r="6" fill="var(--color-ink-muted)" />
                <circle cx="350" cy="50" r="6" fill="var(--color-ink-muted)" />
                <circle
                  cx="470"
                  cy="50"
                  r="9"
                  fill="var(--color-canvas)"
                  stroke="var(--color-accent)"
                  strokeWidth="3"
                />
              </svg>

              <div className="text-12 mt-2 flex justify-between font-mono tracking-[var(--tracking-mono)] lowercase">
                <span className="text-ink-muted">01 - idea</span>
                <span className="text-accent">04 - live</span>
              </div>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
                <h2
                  id="how-we-work-heading"
                  className="font-display text-[clamp(var(--text-32),4vw,var(--text-60))] leading-[1.02] font-bold tracking-[var(--tracking-display)]"
                >
                  <span className="text-ink">Idea in.</span>
                  <br />
                  <span className="text-accent">Product out.</span>
                </h2>

                <ul className="flex flex-wrap gap-2">
                  {LINES.map((line) => (
                    <li
                      key={line}
                      className="border-hairline-strong text-ink-secondary rounded-[var(--radius-pill)] border px-4 py-2 text-sm"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </RevealAnimation>

          {/* ---- the build log ---- */}
          <RevealAnimation direction="up" delay={0.2}>
            <article
              ref={logRef}
              className="border-hairline bg-surface tech-grid relative overflow-hidden rounded-[var(--radius-card)] border p-7 md:p-10"
            >
              <div className="border-hairline overflow-hidden rounded-[var(--radius-control)] border">
                <div className="border-hairline flex items-center gap-3 border-b px-4 py-3">
                  <span className="flex gap-1.5" aria-hidden>
                    <span className="bg-accent size-2.5 rounded-full" />
                    <span className="bg-ink-faint size-2.5 rounded-full" />
                    <span className="bg-ink-faint size-2.5 rounded-full" />
                  </span>
                  <span className="text-ink-muted font-mono text-xs">fathomxo - build</span>
                </div>

                <div className="space-y-2 p-4 font-mono text-sm md:p-6">
                  {LOG.map((line) => {
                    const tone = TONE[line.tone];
                    return (
                      <p key={line.text} data-log-line className="flex gap-3">
                        <span className={`${tone.markClass} shrink-0`} aria-hidden>
                          {tone.mark}
                        </span>
                        <span className={tone.textClass}>
                          {line.text}
                          {line.tone === 'live' && (
                            <span className="caret-blink text-accent ml-1" aria-hidden>
                              _
                            </span>
                          )}
                        </span>
                      </p>
                    );
                  })}
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ['5-10 days', 'landing page live'],
                  ['24 hours', 'first reply to a brief'],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="border-hairline bg-surface-raised rounded-[var(--radius-control)] border px-4 py-4"
                  >
                    <dt className="text-accent font-display text-24 font-bold tracking-[var(--tracking-display)]">
                      {value}
                    </dt>
                    <dd className="text-ink-muted mt-1 text-sm">{label}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
