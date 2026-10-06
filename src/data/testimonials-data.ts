import { testimonialSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * Validated at module load, so a malformed entry fails `bun run build` rather
 * than rendering a broken card for a visitor.
 */
export const testimonialsData = parseContent(
  testimonialSchema,
  [
    {
      quote:
        'Committed, innovative, and results-oriented—exactly what we needed. Their creative strategies consistently introduce new concepts. With a deep dedication to quality.',
      authorName: 'Lena Torres',
      authorRole: 'CMO',
      avatar: '/images/opai-avatar-img-01.png',
      avatarAlt: 'Lena Torres',
    },
    {
      quote:
        "The team's expertise and hands-on approach made the entire integration seamless and surprisingly fast. Highly recommend!",
      authorName: 'Maya Chen',
      authorRole: 'CTO, Fintech Innovators',
      avatar: '/images/opai-avatar-img-02.png',
      avatarAlt: 'Maya Chen',
    },
    {
      quote:
        'From day one, FathomXO felt like an extension of our internal team. Their tools and support are truly next-level.',
      authorName: 'Derek Singh',
      authorRole: 'Head of Product, E-commerce Platform',
      avatar: '/images/opai-avatar-img-03.png',
      avatarAlt: 'Derek Singh',
    },
    {
      quote:
        'We went from idea to execution in weeks—not months. The automation is saving us countless hours every month.',
      authorName: 'Laura Fernandez',
      authorRole: 'Operations Lead, SaaS Company',
      avatar: '/images/opai-avatar-img-04.png',
      avatarAlt: 'Laura Fernandez',
    },
    {
      quote:
        'What impressed me most was the flexibility. FathomXO adapted to our workflow instead of forcing us to change.',
      authorName: 'Jonas Müller',
      authorRole: 'Growth Manager, Logistics Startup',
      avatar: '/images/opai-avatar-img-05.png',
      avatarAlt: 'Jonas Müller',
    },
  ],
  'testimonials-data.ts'
);
