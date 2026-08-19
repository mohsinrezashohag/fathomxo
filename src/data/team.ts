import { teamMemberSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * Team members, migrated from the starter's markdown so the pipeline could be
 * removed. This is template copy - the names, roles and bios are not FathomXO
 * staff - so every entry is `placeholder: true` and feature 11 replaces it with
 * the real team and the photos already in `src/assets/images/team`.
 *
 * Mapping: `title` to `name`, `description` to `title`, `imageSrc` to `photo`,
 * `socialLinks` to `socials`, and the markdown body to `bio` with its headings
 * stripped.
 */
export const teamMembers = parseContent(
  teamMemberSchema,
  [
    {
      slug: 'alex-morgan',
      name: 'Alex Morgan',
      role: 'Tone & Voice Lead',
      title: 'Tone and voice product lead.',
      photo: '/images/opai-avatar-img-285.jpg',
      bio: '2007 – 2011 Bachelor of Arts in Creative Writing and Film. Focus on narrative structure, voice, and adaptation. Published short fiction and essays. Worked on student film and digital media projects as writer and editor. 2012 – 2018 Staff writer and later senior editor for culture and identity. Developed voice and tone guidelines for multiple brands. Led workshops on inclusive language and audience-aware storytelling. Built editorial workflows for SEO and social. 2019 – present Leads product design for tone, voice, and style features. Defines how users set and refine “your tone” across emails, ',
      socials: [
        { name: 'LinkedIn', href: 'https://linkedin.com/in/alex-morgan' },
        { name: 'X', href: 'https://x.com/alexmorgan' },
      ],
      order: 0,
      placeholder: true,
    },
    {
      slug: 'david-okonkwo',
      name: 'David Okonkwo',
      role: 'Simplification Lead',
      title: 'Simplification and summarization lead.',
      photo: '/images/opai-avatar-img-286.jpg',
      bio: '2006 – 2010 Bachelor of Science in Mathematics and minor in Science, Technology, and Society. Research in science communication and public understanding of technical topics. Teaching assistant for introductory calculus and writing for engineers. 2011 – 2019 Editor and then senior editor for Nature Communications and outreach content. Commissioned and edited explainers, summaries, and policy pieces. Trained researchers and journalists on plain-language summaries and accessibility standards. 2020 – present Heads product and content for simplification and summarization tools. Ensures outputs are ',
      socials: [
        { name: 'LinkedIn', href: 'https://linkedin.com/in/david-okonkwo' },
        { name: 'X', href: 'https://x.com/davidokonkwo' },
      ],
      order: 1,
      placeholder: true,
    },
    {
      slug: 'emma-rodriguez',
      name: 'Emma Rodriguez',
      role: 'Content Strategy Lead',
      title: 'Content and campaign strategy lead.',
      photo: '/images/opai-avatar-img-283.jpg',
      bio: '2008 – 2012 Bachelor of Science in Marketing and Media, Culture, and Communications. Emphasis on digital marketing, copywriting, and brand strategy. Capstone project on content performance and audience engagement for a nonprofit brand. 2013 – 2019 Content marketing manager for the blog and resource library. Grew organic traffic and lead generation through SEO, editorial calendars, and repurposing. Built workflows for A/B testing headlines, CTAs, and landing pages. 2020 – present Leads content and campaign strategy for AI-powered marketing tools. Designs prompts and workflows for ads, social co',
      socials: [
        { name: 'LinkedIn', href: 'https://linkedin.com/in/emma-rodriguez' },
        { name: 'X', href: 'https://x.com/emmarodriguez' },
      ],
      order: 2,
      placeholder: true,
    },
    {
      slug: 'james-mitchell',
      name: 'James Mitchell',
      role: 'Professional Communication Lead',
      title: 'Professional communication and product lead.',
      photo: '/images/opai-avatar-img-282.jpg',
      bio: '2006 – 2010 Bachelor of Science in Business Administration with a minor in Professional Writing. Coursework in business communication, technical writing, and cross-cultural communication. Internship with corporate communications at a Fortune 500 company. 2011 – 2018 Consultant and later manager in communications and change management. Supported C-suite and executive teams with internal and external messaging, board materials, and stakeholder communications. Led workshops on clear, concise business writing. 2019 – present Heads product and content strategy for professional email and business wr',
      socials: [
        { name: 'LinkedIn', href: 'https://linkedin.com/in/james-mitchell' },
        { name: 'X', href: 'https://x.com/jmitchell' },
      ],
      order: 3,
      placeholder: true,
    },
    {
      slug: 'sarah-chen',
      name: 'Sarah Chen',
      role: 'Academic Writing Lead',
      title: 'Academic writing and learning design lead.',
      photo: '/images/opai-avatar-img-281.jpg',
      bio: '2007 – 2011 Bachelor of Arts in English and Comparative Literature. Focus on composition pedagogy and digital literacy. Thesis on peer review practices in first-year writing programs. Teaching assistant for introductory rhetoric and academic writing courses. 2012 – 2017 Senior content developer for higher-ed writing and grammar products. Led curriculum design for online writing labs and adaptive learning modules. Collaborated with faculty and assessment teams to align content with learning outcomes and accreditation standards. 2019 – present Leading product design for academic writing tools an',
      socials: [
        { name: 'LinkedIn', href: 'https://linkedin.com/in/sarah-chen' },
        { name: 'X', href: 'https://x.com/sarahchen' },
      ],
      order: 4,
      placeholder: true,
    },
    {
      slug: 'yuki-tanaka',
      name: 'Yuki Tanaka',
      role: 'Language Product Lead',
      title: 'Rephrasing and language product lead.',
      photo: '/images/opai-avatar-img-284.jpg',
      bio: '2009 – 2013 Bachelor of Arts in Linguistics and English Language Teaching. Study abroad at University of Edinburgh in applied linguistics. Research on second-language writing and error correction. Certified ESL instructor (CELTA). 2014 – 2020 Senior learning scientist and content designer for English learning paths. Designed exercises for grammar, vocabulary, and writing at multiple proficiency levels. Led localization and tone adaptation for Japanese and other learner markets. 2021 – present Owns product and content for rephrasing, tone adjustment, and language-level features. Ensures outputs',
      socials: [
        { name: 'LinkedIn', href: 'https://linkedin.com/in/yuki-tanaka' },
        { name: 'X', href: 'https://x.com/yukitanaka' },
      ],
      order: 5,
      placeholder: true,
    },
  ],
  'team.ts'
);
