import { projectSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * Case studies. Three are the studio's real clients; four are demo work that
 * exists so the projects grid and the home page are not empty while the real
 * write-ups are gathered.
 *
 * **Every entry is `placeholder: true` and none may ship.** The three client
 * entries are real companies, but their problem, approach and outcome are
 * inferred from what each live site demonstrably is, not from the engagement
 * itself, so they need confirming or rewriting. The four demo entries are
 * invented scenarios with invented client names, written to be plausible for
 * this market rather than impressive: no metric anyone would have to defend,
 * and no result FathomXO has not produced.
 *
 * Covers are the brand SVGs in `public/images/covers`, one per service line.
 * They are around 1.3 KB each and replace the starter's grey 1000x999
 * dimension placeholders; a real screenshot per project replaces them in
 * feature 6.
 */
/** Real client screenshots, cropped to 16:9 and served as WebP. */
const SHOT = (slug: string) => `/images/work/${slug}.webp`;

const COVER = {
  'e-commerce': '/images/covers/e-commerce.svg',
  'website-app': '/images/covers/website-app.svg',
  /* X-Factor is a website-app build too, but its case is published pricing, so
     it gets the pricing-table variant rather than a second identical tile. */
  'website-app-pricing': '/images/covers/website-app-alt.svg',
  'landing-page': '/images/covers/landing-page.svg',
  'ai-agents-automation': '/images/covers/ai-agents-automation.svg',
} as const;

export const projects = parseContent(
  projectSchema,
  [
    {
      slug: 'redwave-marketing-site',
      title: 'Two audiences, one site',
      summary:
        'A marketing site for a Canadian field-sales agency that has to win brand partnerships and recruit sales reps at the same time.',
      problem:
        'Redwave sells two things to two completely different people. Brands are shopping for a partner who can run face-to-face campaigns across Canadian cities. Sales reps are looking for a job. A single homepage that tries to talk to both convinces neither, and the recruiting pitch drags down the credibility of the partnership pitch.',
      approach:
        'We split the paths at the top of the site rather than the bottom. The homepage leads with the growth argument and the two calls to action sit side by side, so a brand and a candidate diverge in the first screen. Partnerships and Services carry the commercial case; Careers is a separate intake with its own form. FAQ absorbs the questions that were costing the team email round trips.',
      outcome:
        'Both audiences have a route through the site that does not fight the other, and applications arrive through a structured intake instead of a generic contact form.',
      stack: ['Next.js', 'Tailwind CSS', 'Responsive layout', 'Careers intake'],
      serviceSlug: 'website-app',
      clientName: 'Redwave Marketing',
      cover: SHOT('redwave-marketing-site'),
      date: '2025',
      showHomepage: true,
      placeholder: true,
    },
    {
      slug: 'x-factor-academic-platform',
      title: 'Pricing in the open',
      summary:
        'An academic services platform that publishes what a check costs instead of making every student ask.',
      problem:
        'Academic support is a market where nobody publishes a price, so every enquiry starts with a negotiation and most students never send the first message. X-Factor also serves students worldwide across many fields, which makes a single service page read as either too vague to trust or too long to finish.',
      approach:
        'Checks and pricing became a first-class section rather than a hidden quote. The service list is grouped so a student finds their own case fast, How it works removes the guesswork about turnaround, and the quote flow hands off to WhatsApp because that is where this audience actually replies.',
      outcome:
        'A student can price a Turnitin or AI check, understand the process, and open a conversation without filling in a form and waiting.',
      stack: ['Next.js', 'Tailwind CSS', 'Quote flow', 'WhatsApp handoff'],
      serviceSlug: 'website-app',
      clientName: 'X-Factor Academic Solutions',
      cover: SHOT('x-factor-academic-platform'),
      date: '2025',
      showHomepage: false,
      placeholder: true,
    },
    {
      slug: 'boichitro-bd-marketplace',
      title: 'Fifteen categories, many sellers',
      summary:
        'A multivendor electronics marketplace where every seller runs its own catalogue and the buyer still sees one shop.',
      problem:
        'Boichitro has sold computers and electronics since 2016, across fifteen categories from motherboards to home appliances. Orders arrived by phone, which caps the business at how many calls a day the team can take, and every seller added to the operation multiplied the stock and pricing that one person had to keep straight. Buyers of components also do not buy the way buyers of clothes do: they compare specifications and prices side by side before committing, and a catalogue that cannot support that loses them to whoever can.',
      approach:
        'A multivendor catalogue where each seller owns its own listings, stock and orders, presented to the buyer as a single storefront rather than fifteen sub-shops. Search is scoped by category because a query for "monitor" means something different under Gaming than under Office Equipment. Compare and wishlist are first-class rather than afterthoughts, since that is how this category is actually shopped. Checkout runs through SSLCommerz, and phone and WhatsApp stay on every page: the audience still wants to talk to someone before spending on a build.',
      outcome:
        'Sellers manage their own listings without going through one person, and a buyer can compare parts and check out without picking up the phone. The phone is still there for the ones who want it.',
      stack: [
        'Multivendor catalogue',
        'Category-scoped search',
        'Compare and wishlist',
        'SSLCommerz',
        'WhatsApp support',
      ],
      serviceSlug: 'e-commerce',
      clientName: 'Boichitro BD',
      cover: SHOT('boichitro-bd-marketplace'),
      date: '2025',
      showHomepage: true,
      placeholder: true,
    },
    {
      slug: 'rongdhonu-threads-storefront',
      title: 'Off Facebook, onto a storefront',
      summary:
        'DEMO. A Dhaka menswear label moving from comment-and-inbox selling to a storefront with cash on delivery and courier pickup.',
      problem:
        'Orders arrived as Facebook comments and inbox messages. Stock lived in one head rather than a system, the same panjabi sold twice on a good day, and every delivery meant retyping an address into a courier panel. Growth made all three worse rather than better.',
      approach:
        'A storefront with real inventory behind it, cash on delivery as the default rather than an afterthought, and courier booking wired in so an order becomes a consignment without a copy-paste. The admin view answers the only two questions the team asks: what came in today, and what has not shipped.',
      outcome:
        'Orders land in one place with stock attached, and dispatch stops depending on whoever remembers.',
      stack: ['Next.js', 'PostgreSQL', 'bKash', 'Cash on delivery', 'Courier API'],
      serviceSlug: 'e-commerce',
      clientName: 'Rongdhonu Threads',
      cover: COVER['e-commerce'],
      date: '2025',
      showHomepage: false,
      placeholder: true,
    },
    {
      slug: 'shifa-diagnostics-booking',
      title: 'Booking without the phone queue',
      summary:
        'DEMO. A diagnostic centre where appointments and report delivery moved off the front desk phone.',
      problem:
        'Every test booking went through one phone line, which meant a queue in the morning and missed calls for the rest of the day. Reports were collected in person even when the patient only needed a PDF, so the counter stayed busy with people who did not need to be there.',
      approach:
        'Slot-based booking per test with the prep instructions attached, so patients arrive ready. Reports are delivered through a link tied to the booking rather than an account nobody would create. The front desk keeps a view of the day that matches what it used to keep on paper.',
      outcome:
        'The morning queue is for tests, not for asking about tests, and collecting a report stops being a trip.',
      stack: ['Next.js', 'PostgreSQL', 'SMS notifications', 'Role-based access'],
      serviceSlug: 'website-app',
      clientName: 'Shifa Diagnostics',
      cover: COVER['website-app'],
      date: '2025',
      showHomepage: false,
      placeholder: true,
    },
    {
      slug: 'shikhi-academy-launch',
      title: 'A launch page that holds a waitlist',
      summary:
        'DEMO. One page for a course launch, built to turn a social audience into a waitlist before the product existed.',
      problem:
        'The course was six weeks from release and the entire audience lived on Facebook and Instagram. The link in bio pointed at nothing, so interest from every post evaporated. Whatever went up had to load fast on mobile data and make the offer clear in one screen.',
      approach:
        'A single page: what the course is, who it is for, what it costs, and one thing to do. Waitlist capture at the top and the bottom, curriculum in between for the people who read. Built mobile-first because that is the entire audience, and kept under budget so it opens before anyone leaves.',
      outcome:
        'Every post points somewhere that captures intent instead of a bio link that goes nowhere.',
      stack: ['Next.js', 'Tailwind CSS', 'Waitlist capture', 'Analytics'],
      serviceSlug: 'landing-page',
      clientName: 'Shikhi Academy',
      cover: COVER['landing-page'],
      date: '2025',
      showHomepage: false,
      placeholder: true,
    },
    {
      slug: 'taja-bazar-order-assistant',
      title: 'The where-is-my-order bot',
      summary:
        'DEMO. An online grocer whose support inbox was mostly one question, answered by an assistant instead of two people.',
      problem:
        'Most messages to the grocer were the same question: where is my order. Two people answered it all day by looking up an order id and typing the same sentence, which meant the messages that actually needed a human waited behind the ones that did not.',
      approach:
        'An assistant on the channels customers already use, wired to the order system so it answers from real status rather than a script. Anything it cannot answer, and anything about a refund, goes to a person with the conversation attached. It never guesses a delivery time it cannot see.',
      outcome:
        'Routine status questions resolve without a person, and the queue that reaches the team is the part that needed them.',
      stack: ['Next.js', 'WhatsApp Business API', 'Order status integration', 'Human handoff'],
      serviceSlug: 'ai-agents-automation',
      clientName: 'Taja Bazar',
      cover: COVER['ai-agents-automation'],
      date: '2025',
      showHomepage: true,
      placeholder: true,
    },
  ],
  'projects.ts'
);
