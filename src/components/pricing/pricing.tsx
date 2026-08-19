import RevealAnimation from '@/src/components/animation/reveal-animation';
import { pricingPlans } from '@/src/data/pricing';
import { services } from '@/src/data/services';
import { cn } from '@/src/utils/cn';
import Link from 'next/link';

const formatBdt = (amount: number) => `৳${amount.toLocaleString('en-US')}`;

/**
 * Minimal render of the real pricing data, replacing the template's
 * monthly/yearly toggle tiers, which no longer match the brief's model.
 *
 * Deliberately plain: feature 8 rebuilds this as the tabbed surface with one
 * tab per service line. This exists so /pricing shows true prices in the
 * meantime rather than the template's invented ones.
 */
const Pricing = () => {
  return (
    <section className="bg-canvas pt-32 pb-24">
      <div className="max-w-site mx-auto px-5">
        <RevealAnimation direction="up">
          <div>
            <p className="text-ink-muted font-mono text-xs tracking-[var(--tracking-mono)] uppercase">
              Pricing
            </p>
            <h1 className="font-display text-ink mt-4 text-[length:var(--text-44)] tracking-[var(--tracking-display)]">
              Published prices, so you can stop guessing.
            </h1>
            <p className="text-ink-secondary mt-6 max-w-[58ch]">
              Every tier is fixed scope. Anything outside them is quoted from your brief.
            </p>
          </div>
        </RevealAnimation>

        {services.map((service) => {
          const plans = pricingPlans
            .filter((plan) => plan.serviceSlug === service.slug)
            .sort((a, b) => a.order - b.order);

          return (
            <div key={service.slug} className="border-hairline mt-16 border-t pt-8">
              <h2 className="font-display text-ink text-[length:var(--text-24)] tracking-[var(--tracking-display)]">
                {service.name}
              </h2>
              <p className="text-ink-muted mt-2 max-w-[58ch] text-sm">{service.tagline}</p>

              <div
                className={cn(
                  'mt-8 grid gap-6',
                  plans.length > 1 ? 'lg:grid-cols-3' : 'lg:max-w-2xl'
                )}
              >
                {plans.map((plan) => (
                  <article
                    key={`${plan.serviceSlug}-${plan.name}`}
                    className={cn(
                      'bg-surface rounded-card flex flex-col gap-6 border p-8',
                      plan.recommended ? 'border-hairline-strong' : 'border-hairline'
                    )}
                  >
                    <div>
                      {plan.recommended ? (
                        <p className="text-ink mb-2 font-mono text-xs tracking-[var(--tracking-mono)] uppercase">
                          Most chosen
                        </p>
                      ) : null}
                      <p className="text-ink-muted font-mono text-xs tracking-[var(--tracking-mono)] uppercase">
                        {plan.name}
                      </p>
                      <p className="font-display text-ink mt-3 text-[length:var(--text-32)] tracking-[var(--tracking-display)] tabular-nums">
                        {plan.priceBdt === 0 ? 'Free' : formatBdt(plan.priceBdt)}
                        {plan.startingFrom ? '+' : ''}
                      </p>
                      <p className="text-ink-muted mt-2 text-sm">{plan.period}</p>
                    </div>

                    <ul className="border-hairline text-ink-secondary grid gap-2 border-t pt-6 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>

                    <Link
                      href={plan.ctaHref}
                      className={cn(
                        'rounded-pill focus-visible:outline-accent mt-auto flex min-h-11 items-center justify-center px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2',
                        plan.recommended
                          ? 'bg-accent text-accent-ink'
                          : 'border-hairline-strong text-ink border'
                      )}
                    >
                      {plan.ctaLabel}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
