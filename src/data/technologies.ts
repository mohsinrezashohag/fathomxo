import { technologySchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * The capability grid, grouped by the seven categories the tabs render in this
 * order: Backend, Frontend, Mobile, Databases, DevOps, AI, UI/UX.
 *
 * The full merge of three lists: the reference layout's catalogue, the five
 * entries this repo actually depends on, and section 12 of the content brief.
 * Nothing is dropped, because the studio staffs each build to the stack the
 * project needs rather than the other way round - which is also why the section
 * copy says exactly that instead of implying it is all in-house today.
 *
 * The AI group makes the brief's "OpenAI / AI APIs" line concrete. It earns its
 * own tab rather than sitting under Backend because AI agents and automation is
 * one of the four service lines, not an implementation detail of another.
 *
 * `slug` is the icon file stem in `public/images/tech` and the suffix of its
 * CSS mask class in `src/styles/tech-icons.css`. Icons come from Simple Icons
 * (CC0); the marks themselves stay the trademarks of their owners, which is
 * fine for indicating a capability and not fine for implying endorsement.
 */
const CATALOGUE: Record<string, Array<[name: string, slug: string]>> = {
  Backend: [
    ['Node.js', 'nodedotjs'],
    ['PHP', 'php'],
    ['Laravel', 'laravel'],
    ['Python', 'python'],
    ['Django', 'django'],
    ['Java', 'openjdk'],
    ['C#', 'csharp'],
    ['.NET', 'dotnet'],
    ['Go', 'go'],
    ['Spring', 'spring'],
    ['FastAPI', 'fastapi'],
    ['Flask', 'flask'],
    ['NestJS', 'nestjs'],
    ['Express', 'express'],
  ],
  Frontend: [
    ['JavaScript', 'javascript'],
    ['TypeScript', 'typescript'],
    ['React', 'react'],
    ['Next.js', 'nextdotjs'],
    ['Vue.js', 'vuedotjs'],
    ['Angular', 'angular'],
    ['Tailwind CSS', 'tailwindcss'],
  ],
  Mobile: [
    ['Flutter', 'flutter'],
    ['React Native', 'react'],
    ['Kotlin', 'kotlin'],
  ],
  Databases: [
    ['PostgreSQL', 'postgresql'],
    ['MySQL', 'mysql'],
    ['MongoDB', 'mongodb'],
    ['Redis', 'redis'],
    ['Firebase', 'firebase'],
    ['SQL Server', 'microsoftsqlserver'],
    ['Oracle', 'oracle'],
    ['Cassandra', 'apachecassandra'],
  ],
  DevOps: [
    ['AWS', 'amazonwebservices'],
    ['Google Cloud', 'googlecloud'],
    ['Azure', 'microsoftazure'],
    ['Docker', 'docker'],
    ['Cloudflare', 'cloudflare'],
  ],
  AI: [
    ['OpenAI', 'openai'],
    ['Anthropic', 'anthropic'],
    ['Gemini', 'googlegemini'],
    ['LangChain', 'langchain'],
    ['Hugging Face', 'huggingface'],
  ],
  'UI/UX': [
    ['Figma', 'figma'],
    ['Sketch', 'sketch'],
    ['Adobe XD', 'adobexd'],
  ],
};

/** Tab order. Derived from the catalogue so a new category cannot be forgotten. */
export const technologyCategories = Object.keys(CATALOGUE);

export const technologies = parseContent(
  technologySchema,
  Object.entries(CATALOGUE).flatMap(([category, entries]) =>
    entries.map(([name, slug], index) => ({ name, category, slug, order: index }))
  ),
  'technologies.ts'
);
