import { teamMemberSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * The real FathomXO team, replacing the six fictional members the NextSaaS
 * starter shipped. Names, roles and photos come from the addendum at the end of
 * the content brief.
 *
 * `title` is the longer line under the card's short `role`. These are written
 * from the role rather than supplied by each person, so they are safe to
 * correct - they describe the job, and claim nothing about anyone's history.
 * `bio` is deliberately left empty for the same reason: a career summary is not
 * something to draft on someone else's behalf.
 *
 * Photos are the originals from `src/assets/images/team`, copied into `public`
 * under the slug so the schema's string path resolves. They are 0.8-1.1 MB
 * each; feature 15 owns compressing them.
 */
export const teamMembers = parseContent(
  teamMemberSchema,
  [
    {
      slug: 'john-anchit-bepari',
      name: 'John Anchit Bepari',
      role: 'CEO',
      title: 'Runs the studio and owns the relationship from first brief to delivery.',
      photo: '/images/team/john-anchit-bepari.png',
      order: 0,
    },
    {
      slug: 'mohsin-reza-shohag',
      name: 'Mohsin Reza Shohag',
      role: 'CTO',
      title: 'Sets the technical direction and holds the engineering standard.',
      photo: '/images/team/mohsin-reza-shohag.jpeg',
      order: 1,
    },
    {
      slug: 'mohammad-momin',
      name: 'Mohammad Momin',
      role: 'Software Architect',
      title: 'Turns a brief into a system: architecture, data shapes, build plan.',
      photo: '/images/team/mohammad-momin.png',
      order: 2,
    },
  ],
  'team.ts'
);
