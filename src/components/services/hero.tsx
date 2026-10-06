import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import { PrimaryLinkButton } from '@/src/components/shared/ui/button/primary-link-button';

const ServicesHero = () => {
  return (
    <section className="py-44">
      <div className="main-container">
        <div>
          <div className="space-y-3 text-center">
            <div className="mx-auto w-full max-w-[461px]">
              <TextReveal>
                <h2 className="xl:text-sora-heading-2 lg:text-sora-heading-3 text-sora-heading-4 inline-block font-normal text-white/90">
                  four lines of work <span className="text-white/30">and what they cost</span>
                </h2>
              </TextReveal>
            </div>
            <TextReveal delay={0.2}>
              <p className="text-tagline-2 font-inter-tight mx-auto w-full max-w-[442px] text-white/60">
                E-commerce, websites and apps, landing pages, and AI automation. Every one of them
                has a published starting price.
              </p>
            </TextReveal>
          </div>
          <RevealAnimation delay={0.3}>
            <div className="mt-14 text-center">
              <PrimaryLinkButton href="/pricing">See the prices</PrimaryLinkButton>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
