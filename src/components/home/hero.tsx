import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import HeroDotField from '@/src/components/home/hero-dot-field';
import HeroTechBubbles from '@/src/components/home/hero-tech-bubbles';
import { AccentLinkButton, GhostLinkButton } from '@/src/components/shared/ui/button';
import Wordmark from '@/src/components/shared/wordmark';

const Hero = () => {
  return (
    <section
      className="relative grid min-h-[88vh] place-items-center overflow-hidden px-5 pt-36 pb-24 text-center md:pt-40"
      aria-labelledby="hero-heading"
    >
      <HeroDotField />
      <HeroTechBubbles />

      <div className="max-w-site relative z-10 mx-auto w-full">
        <RevealAnimation direction="up" delay={0.1} instant>
          <p className="text-ink-muted text-12 font-mono tracking-[var(--tracking-mono)] uppercase">
            Software Studio &#8212; Dhaka, Bangladesh
          </p>
        </RevealAnimation>

        <TextReveal instant delay={0.2}>
          <h1
            id="hero-heading"
            className="font-display text-ink mx-auto mt-6 max-w-[16ch] text-[clamp(var(--text-44),7vw,var(--text-120))] leading-[var(--leading-display)] font-semibold tracking-[var(--tracking-display)]"
          >
            building software
            <br />
            that actually works.
          </h1>
        </TextReveal>

        <TextReveal instant delay={0.35}>
          <p className="text-ink-secondary text-20 mx-auto mt-8 max-w-[56ch] leading-[var(--leading-body)]">
            We turn ambitious ideas into websites, apps, platforms, and AI-powered products people
            actually want to use.
          </p>
        </TextReveal>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-10 md:gap-12">
          <RevealAnimation direction="up" delay={0.5} instant>
            <div>
              <AccentLinkButton href="/contact" size="hero">
                {"Let's build"}
              </AccentLinkButton>
            </div>
          </RevealAnimation>

          <RevealAnimation direction="up" delay={0.6} instant>
            <div>
              <GhostLinkButton href="/projects" size="hero">
                See our work
              </GhostLinkButton>
            </div>
          </RevealAnimation>
        </div>

        <RevealAnimation direction="up" delay={0.7} offset={60} instant>
          <div className="mt-16 md:mt-20">
            <Wordmark sizeClassName="text-[15cqw]" wrapperClassName="" />
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Hero;
