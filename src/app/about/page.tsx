import AiBusiness from '@/src/components/about/ai-business';
import BornInfo from '@/src/components/about/born-info';
import AboutHero from '@/src/components/about/hero';
import Team from '@/src/components/about/team';
import WhyUs from '@/src/components/about/why-us';
import AboutFaq from '@/src/components/home/faq';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Studio - FathomXO',
  description:
    'Who FathomXO is: a small software studio in Dhaka building e-commerce, websites, apps and AI automation.',
};

const page = () => {
  return (
    <>
      <AboutHero />
      <BornInfo />
      <AiBusiness />
      <WhyUs />
      <Team />
      <AboutFaq />
      <CTA />
    </>
  );
};

export default page;
