import { pricingPlanSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * Pricing from sections 8-11 of the content brief. Prices, periods, feature
 * lists and CTA labels are verbatim.
 *
 * A service line carries 1..n plans: e-commerce has three tiers, the other
 * three lines one each. Feature 8 renders three-up or a single wide card by
 * count, so a single-plan line is not a special case.
 *
 * `priceBdt` is a plain integer; the rendering feature formats it. `0` is the
 * free Starter tier, not a missing price.
 */
export const pricingPlans = parseContent(
  pricingPlanSchema,
  [
    // --- e-commerce: three tiers -------------------------------------------
    {
      serviceSlug: 'e-commerce',
      name: 'Starter',
      priceBdt: 0,
      period: 'For businesses that want to start selling online.',
      features: [
        'Up to 10 products',
        'Up to 100 orders',
        'Basic storefront',
        'Standard checkout',
        'One built-in theme',
        'One staff account',
        'One courier integration',
        'Orders dashboard',
        'Basic analytics',
        'Basic support',
      ],
      ctaLabel: 'Get started',
      ctaHref: '/contact',
      order: 0,
    },
    {
      serviceSlug: 'e-commerce',
      name: 'Essential',
      priceBdt: 60000,
      startingFrom: true,
      period: 'For businesses ready for a serious online store.',
      recommended: true,
      features: [
        'Unlimited products',
        'Unlimited orders',
        'Custom storefront',
        'Advanced checkout',
        'Multiple themes',
        'Up to 3 staff accounts',
        'Courier integration',
        'Orders + inventory dashboard',
        'Analytics and exports',
        'Dedicated support',
      ],
      ctaLabel: 'Get started',
      ctaHref: '/contact',
      order: 1,
    },
    {
      serviceSlug: 'e-commerce',
      name: 'Grow',
      priceBdt: 120000,
      startingFrom: true,
      period: 'For growing businesses that need a more powerful commerce platform.',
      features: [
        'Everything in Essential',
        'Unlimited products',
        'Unlimited orders',
        'Multiple staff accounts',
        'Multiple courier integrations',
        'Courier settlement reconciliation',
        'Inventory synchronization',
        'Advanced analytics',
        'Custom integrations',
        'Priority support',
      ],
      ctaLabel: 'Get started',
      ctaHref: '/contact',
      order: 2,
    },

    // --- one plan per remaining line ----------------------------------------
    {
      serviceSlug: 'website-app',
      name: 'Website / App',
      priceBdt: 120000,
      startingFrom: true,
      period: "Everything you need to look legit online. Nothing you don't.",
      features: [
        'Up to 6 custom pages',
        'Custom UI/UX',
        'Responsive across mobile, tablet, and desktop',
        'SEO-ready architecture',
        'Performance optimization',
        'Custom animations and interactions',
        'CMS integration when required',
        'API integrations',
        'Up to 5 rounds of revisions',
        '5–10 day initial turnaround',
        'Optional hosting',
        'Updates and maintenance available',
      ],
      ctaLabel: 'Get started',
      ctaHref: '/contact',
      order: 0,
    },
    {
      serviceSlug: 'landing-page',
      name: 'Landing Page',
      priceBdt: 69000,
      startingFrom: true,
      period: 'Stop losing leads to slow, boring pages. Go live in 5–10 days.',
      features: [
        'Conversion-focused design',
        'Copywriting assistance',
        'Responsive design',
        'Mobile-first experience',
        'SEO-ready structure',
        'High-performance implementation',
        'Custom animations',
        'Analytics integration',
        '5 rounds of revisions',
        '5–10 day turnaround',
        'Optional hosting',
        'Updates and maintenance',
      ],
      ctaLabel: 'Get started',
      ctaHref: '/contact',
      order: 0,
    },
    {
      serviceSlug: 'ai-agents-automation',
      name: 'AI Agents / Automation',
      priceBdt: 60000,
      startingFrom: true,
      period:
        'From one simple assistant to a full custom AI application — priced around what you actually need.',
      features: [
        'AI-powered business assistants',
        'Repetitive-task automation',
        'Customer support automation',
        'Lead qualification',
        'Data entry automation',
        'Email and WhatsApp automation',
        'Custom API integrations',
        'Business-specific knowledge base',
        'AI workflows',
        'Dashboard and monitoring',
        'Deployment and setup',
        'Ongoing maintenance',
        'Custom pricing based on requirements',
      ],
      ctaLabel: 'Get started',
      ctaHref: '/contact',
      order: 0,
    },
  ],
  'pricing.ts'
);
