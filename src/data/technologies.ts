import { technologySchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * Section 12 of the content brief lists thirteen candidate technologies with
 * one instruction: "only show technologies that are actually part of
 * FathomXO's current stack".
 *
 * So this is the verifiable floor - every entry below is a dependency of this
 * repo, checkable in `package.json`. The brief's other eight (Express, Python,
 * Django, PostgreSQL, MongoDB, Cloudflare, AWS, OpenAI) are not in this project
 * and are left out rather than claimed. Add them once they are real; the list
 * is meant to grow, not to flatter.
 */
export const technologies = parseContent(
  technologySchema,
  [
    { name: 'TypeScript', category: 'Language', order: 0 },
    { name: 'React', category: 'Framework', order: 1 },
    { name: 'Next.js', category: 'Framework', order: 2 },
    { name: 'Node.js', category: 'Runtime', order: 3 },
    { name: 'Tailwind CSS', category: 'Styling', order: 4 },
  ],
  'technologies.ts'
);
