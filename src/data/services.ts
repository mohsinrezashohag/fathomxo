import { serviceSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * The four service lines, from section 6 of the content brief.
 *
 * Names and descriptions are verbatim. The brief gives no tagline or
 * deliverables per line, so both are sourced from that line's own pricing
 * section (8-11) rather than invented: `tagline` is its supporting sentence,
 * `deliverables` the headline items from its feature list.
 *
 * `iconKey` is a plain string. Feature 7 maps keys to icon components.
 */
export const services = parseContent(
  serviceSchema,
  [
    {
      slug: 'e-commerce',
      name: 'E-Commerce',
      tagline: 'Four stages. One commerce platform.',
      description:
        'Online stores and commerce platforms designed to sell, scale, and manage operations efficiently.',
      deliverables: [
        'Custom storefront',
        'Advanced checkout',
        'Courier integration',
        'Orders and inventory dashboard',
        'Analytics and exports',
      ],
      iconKey: 'commerce',
      order: 0,
    },
    {
      slug: 'website-app',
      name: 'Website / App',
      tagline: "Everything you need to look legit online. Nothing you don't.",
      description:
        'Custom websites and web applications built around your business — not limited by templates or page builders.',
      deliverables: [
        'Custom UI/UX',
        'Responsive across mobile, tablet, and desktop',
        'SEO-ready architecture',
        'Performance optimization',
        'API integrations',
      ],
      iconKey: 'website',
      order: 1,
    },
    {
      slug: 'landing-page',
      name: 'Landing Page',
      tagline: 'Stop losing leads to slow, boring pages. Go live in 5–10 days.',
      description:
        'High-converting landing pages with strong design, messaging, performance, and responsive experiences.',
      deliverables: [
        'Conversion-focused design',
        'Copywriting assistance',
        'Mobile-first experience',
        'High-performance implementation',
        'Analytics integration',
      ],
      iconKey: 'landing',
      order: 2,
    },
    {
      slug: 'ai-agents-automation',
      name: 'AI Agents / Automation',
      tagline:
        'From one simple assistant to a full custom AI application — priced around what you actually need.',
      description:
        'AI-powered assistants, business automation, integrations, and custom AI applications that reduce repetitive work.',
      deliverables: [
        'AI-powered business assistants',
        'Repetitive-task automation',
        'Custom API integrations',
        'Business-specific knowledge base',
        'Dashboard and monitoring',
      ],
      iconKey: 'ai',
      order: 3,
    },
  ],
  'services.ts'
);
