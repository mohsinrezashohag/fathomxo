import RevealAnimation from '@/src/components/animation/reveal-animation';
import { AccentLinkButton } from '@/src/components/shared/ui/button';
import { engagements } from '@/src/data/engagements';

/**
 * How a client can engage the studio, as hairline-ruled rows rather than cards.
 *
 * Not numbered: these are four alternatives, not four steps, and the plan bans
 * `01 / 02 / 03` markers on anything that is not a sequence. The `bestWhen` line
 * is the load-bearing part - a reader scanning the right-hand column should be
 * able to find their own situation without reading a paragraph.
 */
const EngagementModels = () => {
  return (
    <section
      className="border-hairline bg-canvas border-t px-5 py-20 md:py-24 lg:py-28"
      aria-labelledby="engagements-heading"
    >
      <div className="max-w-site mx-auto">
        <RevealAnimation direction="up">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-[46ch]">
              <p className="text-ink-muted text-12 font-mono tracking-[var(--tracking-mono)] uppercase">
                How we work
              </p>
              <h2
                id="engagements-heading"
                className="font-display text-ink mt-5 text-[clamp(var(--text-32),4.5vw,var(--text-60))] leading-[1.05] font-semibold tracking-[var(--tracking-display)]"
              >
                four ways in.
              </h2>
              <p className="text-ink-secondary text-20 mt-5 leading-[var(--leading-body)]">
                Most people arrive knowing what they want built and not how any of this works. So
                here is how it works.
              </p>
            </div>

            <AccentLinkButton href="/contact">Send the brief</AccentLinkButton>
          </div>
        </RevealAnimation>

        <RevealAnimation direction="up" delay={0.1}>
          <ul className="border-hairline mt-14 border-t">
            {engagements.map((engagement) => (
              <li
                key={engagement.name}
                className="border-hairline hover:bg-surface group relative grid gap-4 border-b px-1 py-8 transition-colors duration-[var(--dur-hover)] md:grid-cols-[minmax(0,18rem)_1fr_minmax(0,16rem)] md:gap-10 md:px-6 md:py-10"
              >
                <span
                  className="bg-accent absolute inset-y-0 left-0 w-px scale-y-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-y-100"
                  aria-hidden
                />

                <h3 className="font-display text-ink text-24 leading-[1.15] font-semibold tracking-[var(--tracking-display)]">
                  {engagement.name}
                </h3>

                <p className="text-ink-muted text-16 leading-[var(--leading-body)]">
                  {engagement.summary}
                </p>

                <p className="text-ink-faint text-12 group-hover:text-accent font-mono leading-[1.6] tracking-[var(--tracking-mono)] uppercase transition-colors duration-[var(--dur-hover)] md:text-right">
                  {engagement.bestWhen}
                </p>
              </li>
            ))}
          </ul>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default EngagementModels;
