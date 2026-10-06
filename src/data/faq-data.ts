import { faqCategories, publishedFaqs } from '@/src/data/faqs';

export type FaqItem = {
  value: string;
  question: string;
  answer: string;
};

export type FaqSection = {
  id: string;
  title: string;
  titleHighlight: string;
  defaultOpenValue: string;
  items: FaqItem[];
};

/**
 * The FAQ page's sections, derived from `faqs.ts` rather than authored again.
 * The page's six section components predate the content and are still named for
 * the starter's categories; feature 10 rebuilds that surface. Until then this
 * keeps one set of answers behind both the page and the home accordion, so the
 * two can never disagree.
 *
 * `titleHighlight` is the accented half of each heading, so the split is on a
 * word worth emphasising rather than at the midpoint.
 */
const HEADINGS: Record<string, [lead: string, highlight: string]> = {
  'About the studio': ['About the ', 'studio'],
  'What we build': ['What we ', 'build'],
  'AI and automation': ['AI and ', 'automation'],
  'Working together': ['Working ', 'together'],
  'Timelines and pricing': ['Timelines and ', 'pricing'],
  'After launch': ['After ', 'launch'],
};

const slug = (category: string) =>
  category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const buildSection = (category: string): FaqSection => {
  const id = slug(category);
  const items = publishedFaqs
    .filter((faq) => faq.category === category)
    .sort((a, b) => a.order - b.order)
    .map((faq, index) => ({
      value: `${id}-${index + 1}`,
      question: faq.question,
      answer: faq.answer,
    }));

  const [title, titleHighlight] = HEADINGS[category] ?? [category, ''];

  return { id, title, titleHighlight, defaultOpenValue: `${id}-1`, items };
};

const [aboutSection, buildSectionData, aiSection, workingSection, pricingSection, afterSection] =
  faqCategories.map(buildSection);

/* Exported under the starter's names because six page components import them.
   Renaming those is feature 10's job, not a data concern. */
export {
  aboutSection as generalFaqSection,
  buildSectionData as servicesAndFeaturesFaqSection,
  aiSection as privacyAndSecurityFaqSection,
  workingSection as gettingStartedFaqSection,
  pricingSection as pricingAndBillingFaqSection,
  afterSection as technicalSupportFaqSection,
};
