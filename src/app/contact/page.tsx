import ContactHero from '@/src/components/contact/contact-hero';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Contact - FathomXO',
  description:
    'Tell us the scope, the budget band and the timeline. We reply with a real number inside 24 hours.',
};

const page = () => {
  return <ContactHero />;
};

export default page;
