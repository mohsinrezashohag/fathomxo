import { teamMembers } from '@/src/data/team';
import { generateMetadata as buildMetadata } from '@/src/utils/generateMetaData';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembers.find((entry) => entry.slug === slug);

  if (!member) return buildMetadata('Team - FathomXO', undefined, `/team/${slug}`);
  return buildMetadata(`${member.name} - FathomXO`, member.title, `/team/${slug}`);
}

/**
 * Renders the typed team fields. The starter's version read contactPhones,
 * email and imageAlt from markdown frontmatter, none of which teamMemberSchema
 * carries - and those were fake staff contact details, so they are gone rather
 * than migrated.
 *
 * Feature 11 builds the real studio and team surface.
 */
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const member = teamMembers.find((entry) => entry.slug === slug);

  if (!member) notFound();

  return (
    <section className="bg-canvas pt-40 pb-24">
      <div className="max-w-site mx-auto grid gap-12 px-5 lg:grid-cols-[320px_1fr]">
        <div>
          <Image
            src={member.photo}
            alt=""
            width={320}
            height={400}
            className="rounded-card w-full object-cover"
          />
        </div>

        <div>
          <p className="text-ink-muted font-mono text-xs tracking-[var(--tracking-mono)] uppercase">
            {member.role}
          </p>
          <h1 className="font-display text-ink mt-4 text-[length:var(--text-44)] tracking-[var(--tracking-display)]">
            {member.name}
          </h1>
          <p className="text-ink-secondary mt-4 max-w-[58ch]">{member.title}</p>

          {member.bio ? (
            <p className="text-ink-muted mt-8 max-w-[68ch] text-sm">{member.bio}</p>
          ) : null}

          {member.socials.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {member.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    className="border-hairline-strong text-ink-secondary hover:text-ink rounded-pill focus-visible:outline-accent inline-flex min-h-11 items-center border px-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default page;
