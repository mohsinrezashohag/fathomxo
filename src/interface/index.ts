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

export interface FeatureCategory {
  features: string[];
  limit: number;
  checks: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  featured: boolean;
  ctaHref: string;
  ctaLabel?: string;
  featureCategories: FeatureCategory[];
}

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

// team markdown
export interface TeamMember {
  slug: string;
  content: string;
  name: string;
  role: string;
  image: string;
  heroImage?: string;
  email?: string;
  phone?: string;
  phoneHref?: string;
  order?: number;
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
