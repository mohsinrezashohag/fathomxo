import { faqSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * The fifteen questions from section 13 of the content brief. The brief supplies
 * questions only, so these answers are drafted, not authored by FathomXO.
 *
 * Every entry is `published: false` until the wording is reviewed.
 *
 * Answers draw only on facts the brief already states: the four service lines,
 * the published prices, the 5-10 day turnaround, the optional-hosting and
 * maintenance lines, and the verified stack in `technologies.ts`. Where the
 * brief supports no answer - discovery calls, working alongside another agency,
 * inheriting an existing design - the answer says what is knowable and stops,
 * rather than inventing a commitment.
 *
 * Anything below marked TODO needs a real decision before it is published.
 */
export const faqs = parseContent(
  faqSchema,
  [
    {
      category: 'About us',
      question: 'What makes FathomXO different from other software agencies?',
      answer:
        'We publish our prices and we build custom software, not template skins. You get a real number before the call, and a team that takes a position on what your product should be.',
      order: 0,
      published: false,
    },
    {
      category: 'About us',
      question: 'Do you offer discovery calls?',
      answer:
        'TODO: confirm. Today the route in is the brief form - tell us the scope, budget band and timeline, and we reply with a real number.',
      order: 1,
      published: false,
    },
    {
      category: 'What we build',
      question: 'Can you build a completely custom website or application?',
      answer:
        'Yes. Website / App covers custom UI/UX, responsive layouts, SEO-ready architecture and API integrations, built around your business rather than a page builder. From ৳120,000.',
      order: 2,
      published: false,
    },
    {
      category: 'What we build',
      question: 'Do you build e-commerce platforms?',
      answer:
        'Yes, and it is our most developed line. Three tiers: a free Starter for up to 10 products, Essential from ৳60,000 for a serious store, and Grow from ৳120,000 for courier reconciliation, inventory sync and custom integrations.',
      order: 3,
      published: false,
    },
    {
      category: 'AI and automation',
      question: 'Can you integrate AI into an existing business?',
      answer:
        'Yes. AI Agents / Automation covers assistants, custom API integrations and a knowledge base built on your own material. From ৳60,000, priced around what you actually need.',
      order: 4,
      published: false,
    },
    {
      category: 'AI and automation',
      question: 'Can you automate repetitive business processes?',
      answer:
        'That is most of the work: customer support, lead qualification, data entry, and email and WhatsApp automation, with a dashboard so you can see it running.',
      order: 5,
      published: false,
    },
    {
      category: 'Working together',
      question: 'Can you work with our existing developers or agency?',
      answer: 'TODO: confirm how you want to handle shared engagements.',
      order: 6,
      published: false,
    },
    {
      category: 'Working together',
      question: 'Do you work with startups and small businesses?',
      answer:
        'Yes. The e-commerce Starter tier is free, so a small merchant can begin today and move up when the volume justifies it.',
      order: 7,
      published: false,
    },
    {
      category: 'Process',
      question: 'How long does a typical project take?',
      answer:
        'A landing page goes live in 5 to 10 days. A website or app has the same 5 to 10 day initial turnaround, then iterates. Larger platforms are scoped from your brief.',
      order: 8,
      published: false,
    },
    {
      category: 'After launch',
      question: 'Can you maintain the software after launch?',
      answer: 'Yes. Updates and maintenance are available on every line.',
      order: 9,
      published: false,
    },
    {
      category: 'After launch',
      question: 'Do you provide hosting and deployment?',
      answer:
        'Hosting is optional on the website, app and landing page lines. Deployment and setup are included with AI agents work.',
      order: 10,
      published: false,
    },
    {
      category: 'Working together',
      question: 'Can you work with an existing design?',
      answer: 'TODO: confirm whether you take handoff from an existing design.',
      order: 11,
      published: false,
    },
    {
      category: 'About us',
      question: 'Why should I choose custom software instead of WordPress/Wix/Webflow?',
      answer:
        'Because a builder decides what your product can do, and then you work around it. Custom means the software fits the business, and performance is something we control rather than inherit.',
      order: 12,
      published: false,
    },
    {
      category: 'Working together',
      question: 'Can you integrate with our existing APIs and software?',
      answer: 'Yes. Custom API integrations are part of the website, app and AI automation lines.',
      order: 13,
      published: false,
    },
    {
      category: 'Process',
      question: 'How do I get started?',
      answer:
        'Send the brief. Tell us what you are building, the budget band and the timeline, and you get a real number back rather than a discovery maze.',
      order: 14,
      published: false,
    },
  ],
  'faqs.ts'
);
