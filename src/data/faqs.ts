import { faqSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * The single source of FAQ content. Section 13 of the content brief supplies the
 * fifteen questions and one instruction about the answers: "short, direct, and
 * human. Avoid generic corporate wording." A few extra questions are added where
 * a real buyer would obviously ask one.
 *
 * Answers stay inside what the rest of the repo already commits to - the four
 * service lines, the published BDT prices, the 5-10 day landing page turnaround -
 * so the FAQ and the pricing tabs cannot contradict each other.
 *
 * `category` drives the rail on the FAQ page. Order is per category.
 */
export const faqs = parseContent(
  faqSchema,
  [
    // ---- About the studio -------------------------------------------------
    {
      category: 'About the studio',
      question: 'What makes FathomXO different from other software agencies?',
      answer:
        'Two things. We publish our prices, so you know roughly what a project costs before you talk to anyone. And we build software rather than reskin templates, which means the thing you get is shaped around how your business actually works instead of how a theme author assumed it would.',
      order: 0,
    },
    {
      category: 'About the studio',
      question: 'Who is behind FathomXO?',
      answer:
        'A small team in Dhaka. Small enough that the person who scopes your project is the person who builds it, and you are never handed off to someone who was not in the first conversation.',
      order: 1,
    },
    {
      category: 'About the studio',
      question: 'Do you work with startups and small businesses?',
      answer:
        'Most of our work is exactly that. The e-commerce line starts at a free tier for a reason: a shop doing twenty orders a week should be able to start today and grow into the bigger build later, not wait until it can afford one.',
      order: 2,
    },
    {
      category: 'About the studio',
      question: 'Do you work with clients outside Bangladesh?',
      answer:
        'Yes. We already do. Time zones matter more than borders, so we agree an overlap window at the start and keep the written trail complete enough that nothing waits on a call.',
      order: 3,
    },

    // ---- What we build ----------------------------------------------------
    {
      category: 'What we build',
      question: 'Can you build a completely custom website or application?',
      answer:
        'Yes, and that is the default. Custom UI, your own data model, your own integrations. No page builder deciding what is possible.',
      order: 0,
    },
    {
      category: 'What we build',
      question: 'Do you build e-commerce platforms?',
      answer:
        'Yes, and it is our largest service line. Storefront, checkout, inventory, courier integration and an orders dashboard, in three tiers depending on how much of that you need on day one.',
      order: 1,
    },
    {
      category: 'What we build',
      question: 'Why choose custom software over WordPress, Wix or Webflow?',
      answer:
        'For a brochure site, do not. Those tools are good and cheaper than us. Choose custom when the site has to do something specific: your own checkout rules, a workflow nobody sells a plugin for, an integration with the system you already run, or performance a plugin stack cannot reach. If a template genuinely fits, we will tell you.',
      order: 2,
    },
    {
      category: 'What we build',
      question: 'Can you integrate with our existing APIs and software?',
      answer:
        'Yes. Most builds we do talk to something that already exists: a POS, an ERP, a courier, a payment gateway, a spreadsheet somebody refuses to give up. If it has an API we will use it. If it does not, we will tell you what that costs before you commit.',
      order: 3,
    },
    {
      category: 'What we build',
      question: 'Can you work with an existing design?',
      answer:
        'Yes. Send the Figma, the XD file, or even the PDF a previous agency left you. We will tell you honestly what carries over, what needs redrawing for the web, and what will fight you on a phone before we start building it.',
      order: 4,
    },

    // ---- AI and automation ------------------------------------------------
    {
      category: 'AI and automation',
      question: 'Can you integrate AI into an existing business?',
      answer:
        'Yes, and the honest version is that most businesses need less of it than they expect. We look for the task your team repeats twenty times a day first. That is usually where an assistant pays for itself, not a general chatbot bolted onto a homepage.',
      order: 0,
    },
    {
      category: 'AI and automation',
      question: 'Can you automate repetitive business processes?',
      answer:
        'Yes. Order status replies, data moving between two systems that do not talk, reports someone rebuilds by hand every Sunday night. If it follows rules and someone is doing it manually, it is a candidate.',
      order: 1,
    },
    {
      category: 'AI and automation',
      question: 'Will an AI assistant make things up about my business?',
      answer:
        'Not if it is built properly. We wire assistants to your real data and give them a hard boundary: answer from what you can see, and hand anything else to a human with the conversation attached. An assistant that guesses is worse than no assistant.',
      order: 2,
    },

    // ---- Working together -------------------------------------------------
    {
      category: 'Working together',
      question: 'Do you offer discovery calls?',
      answer:
        'Yes, once there is something to discuss. Send the brief first - what you are building, roughly what you can spend, and when you need it live. Fifteen minutes on a call after that is worth more than an hour of introductions.',
      order: 0,
    },
    {
      category: 'Working together',
      question: 'Can you work with our existing developers or agency?',
      answer:
        'Yes. We take overflow work and specific pieces, and it is often the cheapest way to buy our time. It needs one thing agreed up front: who owns which part of the codebase. Shared ownership with no boundary is how two good teams ship one broken product.',
      order: 1,
    },
    {
      category: 'Working together',
      question: 'How involved do we need to be?',
      answer:
        'Less than you fear, more than zero. We need decisions, not management: someone who can answer a question within a day or so and has the authority to say yes. Projects stall on waiting for approval far more often than on engineering.',
      order: 2,
    },
    {
      category: 'Working together',
      question: 'Who owns the code and the content?',
      answer:
        'You do, on final payment. The repository, the design files, the domain, the accounts. We do not hold anything hostage, and you are not renting your own website from us.',
      order: 3,
    },

    // ---- Timelines and pricing --------------------------------------------
    {
      category: 'Timelines and pricing',
      question: 'How long does a typical project take?',
      answer:
        'A landing page goes live in five to ten days. A website or app is usually four to eight weeks. A full commerce platform depends almost entirely on how much of your catalogue and operations has to move with it, so we scope that one properly instead of guessing.',
      order: 0,
    },
    {
      category: 'Timelines and pricing',
      question: 'Why do your prices say "starting from"?',
      answer:
        'Because scope moves the number and pretending otherwise wastes both our time. The published figure is a real floor for a real build at that tier. What moves it is volume of content, integrations, and how much of the existing mess has to come along.',
      order: 1,
    },
    {
      category: 'Timelines and pricing',
      question: 'How do payments work?',
      answer:
        'Split across the project rather than all up front: a deposit to start, the rest at agreed milestones. You should never be more than one payment ahead of what has actually been delivered.',
      order: 2,
    },
    {
      category: 'Timelines and pricing',
      question: 'What if the scope changes halfway through?',
      answer:
        'It usually does, and that is fine. New work gets quoted before it starts, not discovered on the invoice. If something turns out to be cheaper than scoped, that goes the other way too.',
      order: 3,
    },

    // ---- After launch ------------------------------------------------------
    {
      category: 'After launch',
      question: 'Can you maintain the software after launch?',
      answer:
        'Yes, on a monthly plan: updates, fixes, small changes and keeping the thing running. It is optional. If you would rather take it in-house, we hand over a codebase someone else can actually read.',
      order: 0,
    },
    {
      category: 'After launch',
      question: 'Do you provide hosting and deployment?',
      answer:
        'Yes, and we will set it up in your accounts rather than ours where we can. Your business should not lose its website because a relationship ended.',
      order: 1,
    },
    {
      category: 'After launch',
      question: 'What happens if something breaks at 2am?',
      answer:
        'On a maintenance plan, there is a channel that reaches a person and an agreed response time for things that are genuinely down. Without one, we will still answer, but we will not pretend a same-night fix is guaranteed.',
      order: 2,
    },
    {
      category: 'After launch',
      question: 'How do I get started?',
      answer:
        'Send the brief. Tell us what you are building, the budget band you are working within, and when it needs to be live. You get a real number and a real timeline back, usually within a day.',
      order: 3,
    },
  ],
  'faqs.ts'
);

/** Rail order on the FAQ page. Listed rather than derived so it is a decision. */
export const faqCategories = [
  'About the studio',
  'What we build',
  'AI and automation',
  'Working together',
  'Timelines and pricing',
  'After launch',
] as const;

export const publishedFaqs = faqs.filter((faq) => faq.published);
