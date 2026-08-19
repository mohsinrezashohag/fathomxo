import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import TeamCard from '@/src/components/shared/ui/card/team-card';
import { teamMembers } from '@/src/data/team';

const Team = () => {
  return (
    <section className="pt-20 pb-28 xl:pb-34 2xl:pt-28 2xl:pb-44">
      <div className="main-container">
        <div className="mb-18 space-y-3 text-center">
          <TextReveal>
            <h2 className="font-sora text-sora-heading-4 lg:text-sora-heading-3 xl:text-sora-heading-2 inline-block font-normal text-white/90">
              Meet the team
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-tagline-2 mx-auto max-w-xl font-normal text-white/60">
              Driven by Expertise, United by Innovation
            </p>
          </TextReveal>
        </div>
        <div className="grid grid-cols-12 gap-x-8 gap-y-8">
          {teamMembers.map((member, i) => (
            <RevealAnimation key={member.slug} delay={0.3 + i * 0.1}>
              <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <TeamCard
                  key={member.slug}
                  href={`/team/${member.slug}`}
                  title={member.name}
                  description={member.role}
                  imageSrc={member.photo}
                  imageAlt=""
                />
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
