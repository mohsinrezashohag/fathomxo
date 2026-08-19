import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import { PrimaryLinkButton } from '@/src/components/shared/ui/button/primary-link-button';
import type { Service } from '@/src/interface';

interface ServiceDetailsHeroProps {
  service: Service;
}

const ServiceDetailsHero = ({ service }: ServiceDetailsHeroProps) => {
  // The brief routes every service CTA to the brief form; feature 12 owns
  // the real intake route.
  const ctaHref = '/contact';

  return (
    <section className="bg-background-6 relative overflow-hidden pt-32 pb-18 xl:pt-40 2xl:pt-50">
      <div className="main-container relative z-10">
        <div className="mb-10 text-center lg:mb-20 xl:mb-28">
          <TextReveal>
            <h2 className="xl:text-sora-heading-2 lg:text-sora-heading-3 text-sora-heading-4 inline-block font-normal text-white/90">
              {service.name} <span className="text-white/30">{service.tagline}</span>
            </h2>
          </TextReveal>

          <TextReveal delay={0.2}>
            <p className="text-tagline-2 mx-auto mt-3 mb-14 max-w-xl font-normal text-white/60">
              {service.description}
            </p>
          </TextReveal>
          <RevealAnimation delay={0.3}>
            <div className="text-center">
              <PrimaryLinkButton href={ctaHref}>Send the brief</PrimaryLinkButton>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsHero;
