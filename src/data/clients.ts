import { clientSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * Client names from section 5 of the content brief, which flags them as
 * example placeholders rather than real engagements.
 *
 * `descriptor` and `industry` are required by the schema but absent from the
 * brief. They deliberately read as unfilled rather than plausible: a convincing
 * invention survives review and can ship, which is exactly what the plan's rule
 * against claiming work FathomXO has not done is there to prevent.
 *
 * Every entry is `placeholder: true`. Nothing with that flag may reach
 * production - replace the descriptors and industries with real ones, or drop
 * the entry, before launch.
 */
const NEEDS_REAL_DETAIL = 'TODO: describe the real engagement';
const NEEDS_REAL_INDUSTRY = 'TODO: industry';

export const clients = parseContent(
  clientSchema,
  [
    'Enscentea',
    'Aetheria Selfcare',
    'Corvien',
    'AJ Supplies',
    'Parbo Foundation',
    'Fermion Studio',
    'Learnova',
    'NADS Group',
    'Elegant Panjabi',
  ].map((name, index) => ({
    name,
    descriptor: NEEDS_REAL_DETAIL,
    industry: NEEDS_REAL_INDUSTRY,
    order: index,
    placeholder: true,
  })),
  'clients.ts'
);
