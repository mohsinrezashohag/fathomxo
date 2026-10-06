import whyChooseUsImage from '@/public/images/opai-img-475.jpg';
import whyChooseUsImage2 from '@/public/images/opai-img-509.png';
import whyChooseUsImage3 from '@/public/images/opai-img-510.png';
import whyChooseUsImage4 from '@/public/images/opai-img-511.png';
import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import { PrimaryLinkButton } from '@/src/components/shared/ui/button/primary-link-button';
import Image from 'next/image';

const WhyChooseUs = () => {
  return (
    <section className="overflow-hidden py-24 xl:py-32 2xl:py-44">
      <div className="main-container space-y-18">
        <div className="space-y-5">
          <div className="text-center">
            <TextReveal>
              <h2 className="xl:text-sora-heading-2 lg:text-sora-heading-3 text-sora-heading-4 inline-block text-center font-normal text-white/90">
                Why <span className="text-white/30">FathomXO?</span>
              </h2>
            </TextReveal>
          </div>
          {/* The starter stacked customer avatars and a "99+" chip here. With three
              clients on the roster that is a number nobody can back, so the proof
              is the thing that is actually true and unusual in this market. */}
          <RevealAnimation delay={0.3}>
            <p className="text-ink-muted text-12 text-center font-mono tracking-[var(--tracking-mono)] uppercase">
              Published prices on every service line
            </p>
          </RevealAnimation>
        </div>

        <div className="grid grid-cols-12 items-center gap-y-8 lg:gap-x-8">
          <RevealAnimation delay={0.2} direction="left">
            <div className="col-span-12 lg:col-span-4">
              <div className="border-stroke-1/11 group relative flex min-h-[347px] items-end rounded-xl border p-8">
                <figure className="absolute top-0 left-0 size-full overflow-hidden rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Image
                    src={whyChooseUsImage}
                    alt="Why Choose Us"
                    className="size-full object-cover"
                  />
                </figure>
                <div
                  className="absolute inset-0 z-0 size-full scale-105 bg-[linear-gradient(232deg,rgba(13,16,23,0.00)_49.68%,rgba(13,16,23,0.60)_70.59%,#0D1017_84.77%)] bg-cover bg-center bg-no-repeat transition-all duration-700 group-hover:scale-100"
                  aria-hidden
                />
                <h3 className="lg:text-sora-heading-5 text-sora-heading-6 relative z-10 font-normal text-white">
                  A real number before the first call, not after the third
                </h3>
              </div>
            </div>
          </RevealAnimation>

          <div className="col-span-12 space-y-8 lg:col-span-4">
            <RevealAnimation delay={0.3} direction="up">
              <div className="border-stroke-1/11 group relative flex min-h-[347px] items-end rounded-xl border p-8">
                <figure className="absolute top-0 left-0 size-full overflow-hidden rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Image
                    src={whyChooseUsImage2}
                    alt="Why Choose Us"
                    className="size-full object-cover"
                  />
                </figure>
                <div
                  className="absolute inset-0 z-0 size-full scale-105 bg-[linear-gradient(232deg,rgba(13,16,23,0.00)_49.68%,rgba(13,16,23,0.60)_70.59%,#0D1017_84.77%)] bg-cover bg-center bg-no-repeat transition-all duration-700 group-hover:scale-100"
                  aria-hidden
                />
                <h3 className="lg:text-sora-heading-5 text-sora-heading-6 relative z-10 font-normal text-white">
                  Custom builds shaped around your operations, not a theme
                </h3>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.4}>
              <div className="border-stroke-1/11 group relative flex min-h-[347px] items-end overflow-hidden rounded-xl border p-8">
                <figure className="absolute top-0 left-0 size-full overflow-hidden rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Image
                    src={whyChooseUsImage3}
                    alt="Why Choose Us"
                    className="size-full object-cover"
                  />
                </figure>
                <div
                  className="absolute inset-0 z-0 size-full scale-105 bg-[linear-gradient(232deg,rgba(13,16,23,0.00)_49.68%,rgba(13,16,23,0.60)_70.59%,#0D1017_84.77%)] bg-cover bg-center bg-no-repeat transition-all duration-700 group-hover:scale-100"
                  aria-hidden
                />
                <h3 className="lg:text-sora-heading-5 text-sora-heading-6 relative z-10 font-normal text-white">
                  You own the code, the accounts and the domain on handover
                </h3>
              </div>
            </RevealAnimation>
          </div>

          <RevealAnimation delay={0.4} direction="right">
            <div className="col-span-12 lg:col-span-4">
              <div className="border-stroke-1/11 group relative flex h-[347px] items-end overflow-hidden rounded-xl border p-8">
                <figure className="absolute top-0 left-0 size-full overflow-hidden rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Image
                    src={whyChooseUsImage4}
                    alt="Why Choose Us"
                    className="size-full object-cover"
                  />
                </figure>
                <div
                  className="absolute inset-0 z-0 size-full scale-105 bg-[linear-gradient(232deg,rgba(13,16,23,0.00)_49.68%,rgba(13,16,23,0.60)_70.59%,#0D1017_84.77%)] bg-cover bg-center bg-no-repeat transition-all duration-700 group-hover:scale-100"
                  aria-hidden
                />
                <h3 className="lg:text-sora-heading-5 text-sora-heading-6 relative z-10 font-normal text-white">
                  A real number before the first call, not after the third
                </h3>
              </div>
            </div>
          </RevealAnimation>
        </div>

        <RevealAnimation delay={0.1}>
          <div className="text-center">
            <PrimaryLinkButton href="/contact">Send the brief</PrimaryLinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default WhyChooseUs;
