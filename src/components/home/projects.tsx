import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import { PrimaryLinkButton } from '@/src/components/shared/ui/button/primary-link-button';
import ProjectCard from '@/src/components/shared/ui/card/project-card';
import { projects as allProjectEntries } from '@/src/data/projects';

const HOME_PROJECTS_LIMIT = 3;

const Projects = async () => {
  const allProjects = allProjectEntries;
  const projects = allProjects.filter((p) => p.showHomepage === true).slice(0, HOME_PROJECTS_LIMIT);

  return (
    <section className="border-hairline bg-canvas relative border-t py-20 md:py-24 lg:py-28">
      <div className="main-container relative z-10">
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-2 pb-5 text-center md:space-y-3">
            <TextReveal>
              <h2
                className="font-display text-ink text-[clamp(var(--text-32),4.5vw,var(--text-60))] leading-[1.05] font-semibold tracking-[var(--tracking-display)] lg:mx-auto lg:max-w-[16ch]"
                id="projects-heading"
              >
                selected work.{' '}
                <span className="text-ink-faint">the problem, and what changed.</span>
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-ink-secondary text-20 leading-[var(--leading-body)] lg:mx-auto lg:max-w-[54ch]">
                Three studios, three different problems. Demo entries are labelled.
              </p>
            </TextReveal>
          </div>

          <div className="grid grid-cols-12 gap-y-8 lg:gap-x-8">
            {projects.map((project, index) => (
              <RevealAnimation key={project.slug} delay={0.3 + index * 0.1}>
                <div className="col-span-12">
                  <ProjectCard
                    href={`/projects/${project.slug}`}
                    title={project.title}
                    description={project.summary}
                    imageSrc={project.cover}
                    imageAlt={project.title}
                  />
                </div>
              </RevealAnimation>
            ))}
          </div>

          <RevealAnimation delay={0.1}>
            <div className="mx-auto w-full text-center max-md:w-[85%] md:mx-0 md:w-auto">
              <PrimaryLinkButton href="/projects" className="w-full md:w-auto">
                View all projects
              </PrimaryLinkButton>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Projects;
