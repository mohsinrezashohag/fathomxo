import { clientSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * The verified client roster. Detail on both companies is in the addendum at
 * the end of the content brief.
 *
 * The nine example names section 5 of the brief shipped with (Enscentea,
 * Corvien, AJ Supplies and the rest) were never real clients and have been
 * removed rather than left flagged: an invented roster that outnumbers the real
 * one nine to two is the kind of thing that survives review and ships.
 *
 * `descriptor` is the one-line engagement shown beside the name on the roster.
 * Both are written from what each client's live site actually is, so they stay
 * within what can be pointed at; neither claims a result, a metric or a scope
 * beyond the build itself.
 */
export const clients = parseContent(
  clientSchema,
  [
    {
      name: 'Redwave Marketing',
      descriptor: 'Built their marketing site, from the sales-led homepage to careers intake.',
      industry: 'Field sales and direct marketing',
      order: 0,
    },
    {
      name: 'X-Factor Academic Solutions',
      descriptor:
        'Built their academic services platform, with published check pricing and a quote flow.',
      industry: 'Education and academic services',
      order: 1,
    },
    {
      name: 'Boichitro BD',
      descriptor:
        'Built their multivendor electronics marketplace, from vendor catalogues to checkout.',
      industry: 'Consumer electronics and computer retail',
      order: 2,
    },
  ],
  'clients.ts'
);
