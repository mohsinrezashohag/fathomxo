'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { technologies, technologyCategories } from '@/src/data/technologies';
import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import { useMemo, useState } from 'react';

const Technologies = () => {
  const [active, setActive] = useState(technologyCategories[0]);

  /* Grouped once rather than filtered per render: the list is static, and a tab
     click should not walk forty entries to find six. */
  const byCategory = useMemo(
    () =>
      technologyCategories.map((category) => ({
        category,
        items: technologies
          .filter((technology) => technology.category === category)
          .sort((a, b) => a.order - b.order),
      })),
    []
  );

  const shown = byCategory.find((group) => group.category === active)?.items ?? [];

  return (
    <section
      className="border-hairline bg-canvas border-t px-5 py-24 md:py-32"
      aria-labelledby="technologies-heading"
    >
      <div className="max-w-site mx-auto">
        <RevealAnimation direction="up">
          <div className="max-w-[52ch]">
            <p className="text-ink-muted text-12 font-mono tracking-[var(--tracking-mono)] uppercase">
              Capabilities
            </p>
            <h2
              id="technologies-heading"
              className="font-display text-ink mt-5 text-[clamp(var(--text-32),4.5vw,var(--text-60))] leading-[1.05] font-semibold tracking-[var(--tracking-display)]"
            >
              the stack we build on.
            </h2>
            <p className="text-ink-secondary text-20 mt-5 leading-[var(--leading-body)]">
              Backend, frontend, mobile, data, infrastructure, AI and design. We staff each build to
              the stack the project actually needs, rather than bending the project to fit ours.
            </p>
          </div>
        </RevealAnimation>

        <RevealAnimation direction="up" delay={0.1}>
          <div
            className="border-hairline mt-12 flex flex-wrap gap-1 rounded-[var(--radius-pill)] border p-1"
            role="tablist"
            aria-label="Technology categories"
          >
            {technologyCategories.map((category) => {
              const isActive = category === active;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  id={`tech-tab-${category}`}
                  aria-selected={isActive}
                  aria-controls="tech-panel"
                  onClick={() => setActive(category)}
                  className={cn(
                    'focus-visible:outline-accent rounded-[var(--radius-pill)] px-4 py-2 font-mono text-xs tracking-[var(--tracking-mono)] uppercase transition-colors duration-[var(--dur-hover)] focus-visible:outline-2 focus-visible:outline-offset-2',
                    isActive
                      ? 'bg-accent text-accent-ink font-bold'
                      : 'text-ink-muted hover:text-ink cursor-pointer'
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </RevealAnimation>

        <ul
          id="tech-panel"
          role="tabpanel"
          aria-labelledby={`tech-tab-${active}`}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        >
          {shown.map((technology) => (
            <li
              key={`${technology.category}-${technology.name}`}
              className="border-hairline hover:border-hairline-strong bg-surface hover:bg-surface-raised text-ink-muted hover:text-ink grid place-items-center gap-3 rounded-[var(--radius-card)] border px-4 py-8 transition-colors duration-[var(--dur-hover)]"
            >
              <Image
                src={`/images/tech/${technology.slug}.svg`}
                alt=""
                width={32}
                height={32}
                className="size-8"
              />
              <span className="text-12 text-center font-mono tracking-[var(--tracking-mono)] uppercase">
                {technology.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Technologies;
