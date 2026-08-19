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

// mobile menu
export interface MobileMenuSubItem {
  id: string;
  label: string;
  href: string;
}

export interface MobileMenuData {
  id: string;
  title: string;
  submenu: MobileMenuSubItem[];
}
