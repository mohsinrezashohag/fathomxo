import RevealAnimation from '@/src/components/animation/reveal-animation';
import type { Project } from '@/src/interface';

interface ProjectDetailsContentProps {
  project: Project;
}

/**
 * Renders the typed case-study fields. The starter's version read `before`,
 * `after`, `details` and `testimonial` from markdown frontmatter, none of which
 * `projectSchema` carries, so those sections and their components are gone.
 *
 * Deliberately plain: feature 6 builds the real case-study layout with a
 * gallery. This exists so /projects/[slug] keeps rendering after the markdown
 * pipeline is removed.
 */
const ProjectDetailsContent = ({ project }: ProjectDetailsContentProps) => {
  const sections = [
    { title: 'The problem', body: project.problem },
    { title: 'The approach', body: project.approach },
    { title: 'The outcome', body: project.outcome },
  ];

  return (
    <section className="bg-canvas py-24">
      <div className="max-w-site mx-auto px-5">
        <dl className="border-hairline grid gap-6 border-t pt-6 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-ink-muted text-xs tracking-[var(--tracking-mono)] uppercase">
              Client
            </dt>
            <dd className="text-ink mt-2">{project.clientName}</dd>
          </div>
          <div>
            <dt className="font-mono text-ink-muted text-xs tracking-[var(--tracking-mono)] uppercase">
              Year
            </dt>
            <dd className="text-ink mt-2">{project.date}</dd>
          </div>
          <div>
            <dt className="font-mono text-ink-muted text-xs tracking-[var(--tracking-mono)] uppercase">
              Service line
            </dt>
            <dd className="text-ink mt-2">{project.serviceSlug}</dd>
          </div>
        </dl>

        <div className="mt-16 max-w-[68ch]">
          {sections.map((section, index) => (
            <RevealAnimation key={section.title} delay={0.1 * index}>
              <div className={index > 0 ? 'mt-12' : undefined}>
                <h2 className="font-display text-ink text-[length:var(--text-24)] tracking-[var(--tracking-display)]">
                  {section.title}
                </h2>
                <p className="text-ink-secondary mt-3">{section.body}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>

        {project.stack.length > 0 ? (
          <ul className="mt-12 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="border-hairline-strong text-ink-secondary rounded-pill font-mono border px-4 py-2 text-xs tracking-[var(--tracking-mono)] uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
};

export default ProjectDetailsContent;
