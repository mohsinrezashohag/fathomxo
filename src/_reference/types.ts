/* Types these reference files need, lifted from `src/interface` where features
   1a and 1b removed them once nothing live used them. Declared here so the
   folder keeps typechecking without re-adding dead types to the real barrel. */

// footer
export interface FooterLink {
  label: string;
  href: string;
}
export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}
export interface FooterSocialLink {
  name: string;
  href: string;
}
export interface FooterData {
  logo: {
    src: string;
    alt: string;
    href: string;
  };
  address: {
    label: string;
    text: string;
  };
  contact: {
    label: string;
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
  };
  social: FooterSocialLink[];
  linkGroups: FooterLinkGroup[];
  bottomBar: {
    links: FooterLink[];
  };
}
// blog markdown
export interface BlogPost {
  slug: string;
  content: string;
  title: string;
  titleItalic?: string;
  author: string;
  authorImage: string;
  category?: string;
  publishDate: string;
  readTime: string;
  thumbnail: string;
  heroImages?: string[];
  tags: string[];
  description?: string;
  showHomepage?: boolean;
  related?: string[];
  featured?: boolean;
  popular?: boolean;
  [key: string]: unknown;
}
