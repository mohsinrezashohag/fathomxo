import RevealAnimation from '@/src/components/animation/reveal-animation';
import { PaginationNextIcon, PaginationPrevIcon } from '@/src/components/shared/icon';
import { PaginationItem } from '@/src/components/shared/ui/pagination/pagination-item';
import { PaginationWrapper } from '@/src/components/shared/ui/pagination/pagination-wrapper';
import { services } from '@/src/data/services';
import type { Project } from '@/src/interface';
import Image from 'next/image';
import Link from 'next/link';

/** Service line names, keyed by slug, for the card's eyebrow. */
const SERVICE_LABEL = Object.fromEntries(
  services.map((service) => [service.slug, service.name])
) as Record<Project['serviceSlug'], string>;

function buildProjectPageUrl(page: number): string {
  if (page <= 1) return '/projects';
  return `/projects?page=${page}`;
}

interface ProjectsGridProps {
  projects: Project[];
  totalPages: number;
  currentPage: number;
}

const ProjectsGrid = ({ projects, totalPages, currentPage }: ProjectsGridProps) => {
  const prevUrl = currentPage > 1 ? buildProjectPageUrl(currentPage - 1) : undefined;
  const nextUrl = currentPage < totalPages ? buildProjectPageUrl(currentPage + 1) : undefined;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="overflow-hidden py-24 xl:py-32 2xl:py-39">
      <div className="main-container">
        <div className="grid grid-cols-12 gap-y-8 *:col-span-12 md:gap-x-8 md:*:col-span-6 lg:[&>*:nth-child(4n+1)]:col-span-5 lg:[&>*:nth-child(4n+2)]:col-span-7 lg:[&>*:nth-child(4n+3)]:col-span-7 lg:[&>*:nth-child(4n+4)]:col-span-5">
          {projects.map((project, index) => (
            <RevealAnimation key={project.slug} delay={0.4 + index * 0.1}>
              <div className="w-full">
                <Link
                  href={`/projects/${project.slug}`}
                  className="border-hairline hover:border-hairline-strong focus-visible:outline-accent group bg-surface block overflow-hidden rounded-[var(--radius-card)] border transition-colors duration-[var(--dur-hover)] focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {/* Aspect ratio, not a fixed height: the columns alternate 5/7,
                      so a fixed height cropped every other card to a different
                      shape and the grid read as broken rather than editorial. */}
                  <figure className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      width={1600}
                      height={1000}
                      className="ease-brand size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span
                      className="from-surface pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t to-transparent"
                      aria-hidden
                    />
                  </figure>

                  <div className="space-y-3 p-7 md:p-9">
                    <p className="text-ink-faint text-12 flex items-center gap-2 font-mono tracking-[var(--tracking-mono)] uppercase">
                      <span>{SERVICE_LABEL[project.serviceSlug]}</span>
                      <span aria-hidden>/</span>
                      <span>{project.clientName}</span>
                    </p>

                    <h3 className="font-display text-ink text-24 lg:text-32 leading-[1.15] font-semibold tracking-[var(--tracking-display)]">
                      {project.title}
                    </h3>

                    <p className="text-ink-muted line-clamp-2 text-sm leading-[var(--leading-body)]">
                      {project.summary}
                    </p>

                    <span className="text-ink-secondary group-hover:text-accent text-12 inline-flex items-center gap-2 pt-2 font-mono tracking-[var(--tracking-mono)] uppercase transition-colors duration-[var(--dur-hover)]">
                      View case study
                      <span
                        className="ease-brand inline-block transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      >
                        &#8594;
                      </span>
                    </span>
                  </div>
                </Link>
              </div>
            </RevealAnimation>
          ))}
        </div>

        {totalPages > 1 && (
          <RevealAnimation delay={0.1}>
            <div className="mt-14 flex justify-center">
              <PaginationWrapper>
                <PaginationItem href={prevUrl} disabled={currentPage <= 1}>
                  <PaginationPrevIcon />
                </PaginationItem>
                {pages.map((page) => (
                  <PaginationItem
                    key={page}
                    href={buildProjectPageUrl(page)}
                    active={page === currentPage}
                  >
                    {page}
                  </PaginationItem>
                ))}
                <PaginationItem href={nextUrl} disabled={currentPage >= totalPages}>
                  <PaginationNextIcon />
                </PaginationItem>
              </PaginationWrapper>
            </div>
          </RevealAnimation>
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid;
