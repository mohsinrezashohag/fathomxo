import ProjectDetailsContent from '@/src/components/project-details/content';
import ProjectDetailsHero from '@/src/components/project-details/hero';
import { projects } from '@/src/data/projects';
import { generateMetadata as buildMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    return buildMetadata('Project Details - FathomXO', undefined, `/projects/${slug}`);
  }

  return buildMetadata(`${project.title} - FathomXO`, project.summary, `/projects/${slug}`);
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) notFound();

  return (
    <>
      <ProjectDetailsHero project={project} />
      <ProjectDetailsContent project={project} />
    </>
  );
};

export default page;
