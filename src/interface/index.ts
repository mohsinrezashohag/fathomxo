import { z } from 'zod';

/* ============================================================================
   Content schemas. The overview's Data model section is the source; these make
   it executable. Types are inferred, never hand-written beside a schema, so the
   two cannot drift. `.strict()` throughout, so a typo in a content file is an
   error rather than a silently dropped key.
   ========================================================================= */

export const clientSchema = z
  .object({
    name: z.string().min(1),
    /** One-line what-we-did, shown beside the name in the roster. */
    descriptor: z.string().min(1),
    industry: z.string().min(1),
    order: z.number().int().min(0),
    published: z.boolean().default(true),
    /** Not a real client. Nothing with this true may ship to production. */
    placeholder: z.boolean().default(false),
  })
  .strict();

export type Client = z.infer<typeof clientSchema>;

/** The four service lines. A fifth is a plan change, not a data edit. */
export const serviceSlugs = [
  'e-commerce',
  'website-app',
  'landing-page',
  'ai-agents-automation',
] as const;

export const serviceSchema = z
  .object({
    slug: z.enum(serviceSlugs),
    name: z.string().min(1),
    tagline: z.string().min(1),
    description: z.string().min(1),
    deliverables: z.array(z.string().min(1)).min(1),
    iconKey: z.string().min(1),
    order: z.number().int().min(0),
  })
  .strict();

export type Service = z.infer<typeof serviceSchema>;

/**
 * A service line carries 1..n plans: e-commerce has three tiers, the other
 * lines one. A single-plan line is not a special case, so nothing here assumes
 * tiers exist.
 */
export const pricingPlanSchema = z
  .object({
    serviceSlug: z.enum(serviceSlugs),
    name: z.string().min(1),
    /** 0 is the free Starter tier, not a missing price. */
    priceBdt: z.number().int().min(0),
    /** Renders the + in BDT 60,000+, because scope moves the final number. */
    startingFrom: z.boolean().default(false),
    period: z.string().min(1),
    recommended: z.boolean().default(false),
    features: z.array(z.string().min(1)).min(1),
    ctaLabel: z.string().min(1),
    ctaHref: z.string().min(1),
    order: z.number().int().min(0),
  })
  .strict();

export type PricingPlan = z.infer<typeof pricingPlanSchema>;

export const technologySchema = z
  .object({
    name: z.string().min(1),
    category: z.string().min(1),
    order: z.number().int().min(0),
  })
  .strict();

export type Technology = z.infer<typeof technologySchema>;

export const projectSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    /** Long-form. 2c migrates the markdown bodies into these three. */
    problem: z.string().min(1),
    approach: z.string().min(1),
    outcome: z.string().min(1),
    stack: z.array(z.string().min(1)),
    serviceSlug: z.enum(serviceSlugs),
    clientName: z.string().min(1),
    cover: z.string().min(1),
    gallery: z.array(z.string().min(1)).default([]),
    date: z.string().min(1),
    showHomepage: z.boolean().default(false),
    published: z.boolean().default(true),
    /** Template copy carried forward by 2c until feature 6 replaces it. */
    placeholder: z.boolean().default(false),
  })
  .strict();

export type Project = z.infer<typeof projectSchema>;

export const faqSchema = z
  .object({
    category: z.string().min(1),
    question: z.string().min(1),
    answer: z.string().min(1),
    order: z.number().int().min(0),
    published: z.boolean().default(true),
  })
  .strict();

export type Faq = z.infer<typeof faqSchema>;

export const campaignSchema = z
  .object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    /** ISO date string; the countdown parses it client-side. */
    targetDate: z.string().min(1),
    ctaLabel: z.string().min(1),
    ctaHref: z.string().min(1),
    active: z.boolean().default(false),
  })
  .strict();

export type Campaign = z.infer<typeof campaignSchema>;

export const testimonialSchema = z
  .object({
    quote: z.string().min(1),
    authorName: z.string().min(1),
    authorRole: z.string().min(1),
    /** Optional: template entries carry an author and role but no company. */
    clientName: z.string().min(1).optional(),
    avatar: z.string().min(1).optional(),
    avatarAlt: z.string().min(1).optional(),
  })
  .strict();

export type Testimonial = z.infer<typeof testimonialSchema>;

export const teamMemberSchema = z
  .object({
    slug: z.string().min(1),
    name: z.string().min(1),
    role: z.string().min(1),
    title: z.string().min(1),
    photo: z.string().min(1),
    bio: z.string().default(''),
    socials: z
      .array(z.object({ name: z.string().min(1), href: z.string().min(1) }).strict())
      .default([]),
    order: z.number().int().min(0),
    published: z.boolean().default(true),
    /** Template copy carried forward by 2c until feature 11 replaces it. */
    placeholder: z.boolean().default(false),
  })
  .strict();

export type TeamMember = z.infer<typeof teamMemberSchema>;

// navigation
export interface NavLink {
  label: string;
  href: string;
  /** Present only on items that open a dropdown. */
  children?: NavLink[];
}

// footer
export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

export interface FooterSocialLink {
  /** Must match a key in socialIconsMap. */
  name: string;
  href: string;
  /** No real handle yet; must be false before launch. */
  placeholder?: boolean;
}

// pricing

// services markdown
export interface ServicePost {
  slug: string;
  content: string;
  title: string;
  titleItalic?: string;
  description: string;
  icon: string;
  heroImage?: string;
  whatItDoes?: string[];
  whoItsFor?: string[];
  contentImages?: string[];
  related?: string[];
  ctaText?: string;
  ctaHref?: string;
  [key: string]: unknown;
}

// project markdown
export interface ProjectDetails {
  client: string;
  year: string;
  services: string;
  location: string;
  duration: string;
}

export interface ProjectTestimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany?: string;
  avatar: string;
}

export interface ProjectPost {
  slug: string;
  content: string;
  title: string;
  titleItalic?: string;
  excerpt: string;
  heroImage: string;
  details: ProjectDetails;
  before: string[];
  after: string[];
  testimonial: ProjectTestimonial;
  closingParagraph?: string;
  showHomepage?: boolean;
  [key: string]: unknown;
}
