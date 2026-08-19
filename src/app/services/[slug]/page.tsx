import ServicesDetailsHero from '@/src/components/services-details/hero';
import { pricingPlans } from '@/src/data/pricing';
import { services } from '@/src/data/services';
import { generateMetadata as buildMetadata } from '@/src/utils/generateMetaData';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);

  if (!service) return buildMetadata('Services - FathomXO', undefined, `/services/${slug}`);
  return buildMetadata(`${service.name} - FathomXO`, service.description, `/services/${slug}`);
}

/**
 * Renders one of the four real service lines. The starter's version read nine
 * markdown files describing a different business, with fields
 * (`titleItalic`, `contentImages`, long-form body) that `serviceSchema` does
 * not carry.
 *
 * Deliberately plain: feature 7 builds the real surface with the technology
 * badges. This exists so /services/[slug] resolves to the four lines the rest
 * of the site already uses.
 */
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);

  if (!service) notFound();

  const plans = pricingPlans
    .filter((plan) => plan.serviceSlug === service.slug)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <ServicesDetailsHero service={service} />

      <section className="bg-canvas py-24">
        <div className="max-w-site mx-auto max-w-[68ch] px-5">
          <h2 className="font-display text-ink text-[length:var(--text-24)] tracking-[var(--tracking-display)]">
            What you get
          </h2>
          <ul className="text-ink-secondary mt-6 grid gap-3">
            {service.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {plans.length > 0 ? (
            <p className="text-ink-muted mt-12 text-sm">
              From ৳{plans[0].priceBdt.toLocaleString('en-US')}
              {plans[0].startingFrom ? '+' : ''}.{' '}
              <Link href="/pricing" className="text-ink underline underline-offset-4">
                See the tiers
              </Link>
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default page;
