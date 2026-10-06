import RevealAnimation from '@/src/components/animation/reveal-animation';
import { GhostLinkButton } from '@/src/components/shared/ui/button';
import { systems } from '@/src/data/systems';

/**
 * The operational systems the studio takes on, as an edge-to-edge grid rather
 * than cards with gaps.
 *
 * Borders are drawn per cell with negative margins so adjacent cells share one
 * hairline instead of stacking two, which is what makes a grid read as ruled
 * rather than boxed. The plan asks for edge-to-edge lists separated by hairlines;
 * this is that, at sixteen items.
 *
 * A server component: nothing here is interactive beyond CSS hover.
 */
const SystemsWeBuild = () => {
  return (
    <section
      className="border-hairline bg-canvas border-t px-5 py-24 md:py-32"
      aria-labelledby="systems-heading"
    >
      <div className="max-w-site mx-auto">
        <RevealAnimation direction="up">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-[46ch]">
              <p className="text-ink-muted text-12 font-mono tracking-[var(--tracking-mono)] uppercase">
                Systems
              </p>
              <h2
                id="systems-heading"
                className="font-display text-ink mt-5 text-[clamp(var(--text-32),4.5vw,var(--text-60))] leading-[1.05] font-semibold tracking-[var(--tracking-display)]"
              >
                the software that runs a business.
              </h2>
              <p className="text-ink-secondary text-20 mt-5 leading-[var(--leading-body)]">
                Not products off a shelf. These are the shapes of build we take on, each one made
                around how your operation actually runs.
              </p>
            </div>

            <GhostLinkButton href="/contact">Scope yours</GhostLinkButton>
          </div>
        </RevealAnimation>

        <RevealAnimation direction="up" delay={0.1}>
          <ul className="border-hairline mt-14 grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-4">
            {systems.map((system) => (
              <li
                key={system.name}
                className="border-hairline hover:bg-surface group relative border-r border-b p-7 transition-colors duration-[var(--dur-hover)] lg:p-8"
              >
                {/* The accent arrives only on hover, and only as a 1px rule.
                    Sixteen permanent accents would break the one-per-viewport
                    rule; one under the pointer is a light source. */}
                <span
                  className="bg-accent absolute inset-x-0 top-0 h-px scale-x-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-x-100"
                  aria-hidden
                />
                <h3 className="font-display text-ink text-20 leading-[1.2] font-semibold tracking-[var(--tracking-display)]">
                  {system.name}
                </h3>
                <p className="text-ink-muted mt-3 text-sm leading-[var(--leading-body)]">
                  {system.summary}
                </p>
              </li>
            ))}
          </ul>
        </RevealAnimation>

        <RevealAnimation direction="up" delay={0.2}>
          <p className="text-ink-faint text-12 mt-8 font-mono tracking-[var(--tracking-mono)] uppercase">
            Not on the list? It is still probably a build we have done a version of.
          </p>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default SystemsWeBuild;
