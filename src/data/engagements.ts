import { engagementSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * The four ways to work with the studio. Every one traces to section 6 of the
 * project plan (project work, retainers, productised tiers, own products) or to
 * an answer already published in `faqs.ts`, so nothing here is a new commitment
 * invented for the sake of a fuller page.
 *
 * A buyer arriving cold does not ask "what can you build" first. They ask "how
 * would this even work" - and until this section existed the site had no answer.
 */
export const engagements = parseContent(
  engagementSchema,
  [
    {
      name: 'Fixed-scope project',
      summary:
        'We scope it, quote it, build it and hand it over. One price agreed up front, paid across milestones, and new work quoted before it starts rather than discovered on the invoice.',
      bestWhen: 'You know roughly what you want built',
      order: 0,
    },
    {
      name: 'Overflow engineering',
      summary:
        'We take specific pieces alongside your existing developers or agency. It needs one thing agreed up front: who owns which part of the codebase. Shared ownership with no boundary is how two good teams ship one broken product.',
      bestWhen: 'You have a team, and more work than team',
      order: 1,
    },
    {
      name: 'Care plan',
      summary:
        'Monthly: updates, fixes, small changes and keeping the thing running, with an agreed response time for anything genuinely down. Optional, and it is your call whether we host in your accounts or ours.',
      bestWhen: 'It is live and you would rather not think about it',
      order: 2,
    },
    {
      name: 'Product partner',
      summary:
        'From an idea to a first shipped version, then the next one. We take a position on what the product should be rather than building the spec you walked in with and calling it done.',
      bestWhen: 'You are building something that does not exist yet',
      order: 3,
    },
  ],
  'engagements.ts'
);
