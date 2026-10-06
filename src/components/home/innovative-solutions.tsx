import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import {
  FinanceIcon,
  HealthcareIcon,
  LegalRealEstateIcon,
  RetailEcommerceIcon,
} from '@/src/components/shared/icon';
import { SecondaryLinkButton } from '@/src/components/shared/ui/button/secondary-link-button';
import { cn } from '@/src/utils/cn';

const iconMap: Record<
  'RetailEcommerce' | 'Healthcare' | 'Finance' | 'LegalRealEstate',
  React.ComponentType<{ className?: string }>
> = {
  RetailEcommerce: RetailEcommerceIcon,
  Healthcare: HealthcareIcon,
  Finance: FinanceIcon,
  LegalRealEstate: LegalRealEstateIcon,
};

const InnovativeSolutions = () => {
  /* The four service lines, in the order they appear everywhere else. Icon ids
     are the starter's and are reused rather than renamed; feature 7 maps real
     icons to `Service.iconKey`. */
  const innovativeSolutionsCards = [
    {
      id: 'e-commerce',
      iconId: 'RetailEcommerce',
      title: 'E-commerce',
      description: 'Storefronts that handle stock, courier and cash on delivery.',
    },
    {
      id: 'website-app',
      iconId: 'Healthcare',
      title: 'Website / app',
      description: 'Built around your business, not around a page builder.',
    },
    {
      id: 'landing-page',
      iconId: 'Finance',
      title: 'Landing page',
      description: 'One page, one job, live in five to ten days.',
    },
    {
      id: 'ai-agents-automation',
      iconId: 'LegalRealEstate',
      title: 'AI agents / automation',
      description: 'Assistants wired to your real data, not to a script.',
      gridClassName: 'lg:col-span-4 lg:col-start-5',
    },
  ];

  return (
    <section
      className="bg-background-7 py-10 pb-20 sm:py-20 md:py-28 lg:py-30 xl:py-40 2xl:py-44"
      aria-labelledby="innovative-solutions-heading"
    >
      <div className="main-container">
        <div className="mb-10 space-y-12 lg:space-y-19">
          <div className="space-y-2 text-center md:space-y-3">
            <TextReveal>
              <h2
                id="innovative-solutions-heading"
                className="font-sora text-sora-heading-4 text-background-13/90 md:text-sora-heading-3 lg:text-sora-heading-2 font-normal max-md:leading-[110%] lg:mx-auto lg:max-w-[600px]"
                itemProp="name"
              >
                we take your wildest ideas{' '}
                <span className="text-background-13/50">
                  and turn them into <br className="hidden md:block" /> working, scalable products
                </span>
              </h2>
            </TextReveal>
            <TextReveal>
              <p
                className="font-inter-tight text-tagline-2 text-background-13/60 font-normal lg:mx-auto lg:max-w-[350px]"
                itemProp="description"
              >
                Four lines of work, one way of working: scope it honestly, build it properly, hand
                it over.
              </p>
            </TextReveal>
          </div>

          <div className="grid grid-cols-12 gap-y-8 md:gap-8">
            {innovativeSolutionsCards.map((card, index) => {
              const IconComponent = iconMap[card.iconId as keyof typeof iconMap];
              return (
                <div
                  key={card.id}
                  className={cn('col-span-12 md:col-span-6 lg:col-span-4 last:lg:col-start-5')}
                >
                  <RevealAnimation delay={0.1 + index * 0.1}>
                    <div
                      className="border-stroke-3/18 flex flex-col items-center gap-8 rounded-lg border bg-white px-10.5 py-10.5 text-center"
                      aria-labelledby={`innovative-solutions-card-${card.id}`}
                    >
                      <div className="size-[52px]" aria-hidden>
                        {IconComponent && <IconComponent />}
                      </div>
                      <div className="space-y-0">
                        <h3
                          id={`innovative-solutions-card-${card.id}`}
                          className="font-sora text-sora-heading-5 text-background-6/80 font-normal tracking-[-0.72px]"
                        >
                          {card.title}
                        </h3>
                        <p className="font-inter-tight text-tagline-3 text-background-6/50 font-normal">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </RevealAnimation>
                </div>
              );
            })}
          </div>
        </div>

        <RevealAnimation delay={0.5}>
          <div className="inline-flex w-full justify-center md:flex">
            <SecondaryLinkButton
              href="/services"
              displayClassName="max-md:w-[85%] max-md:mx-auto"
              className="w-full"
            >
              See all services
            </SecondaryLinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default InnovativeSolutions;
