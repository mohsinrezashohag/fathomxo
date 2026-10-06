import OurImpact from '@/src/components/home/our-impact';
import IncludeInEveryPlan from '@/src/components/pricing/include-in-every-plan';
import Pricing from '@/src/components/pricing/pricing';
import CTA from '@/src/components/shared/cta';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Pricing - FathomXO',
  description:
    'Published prices in BDT for e-commerce, websites and apps, landing pages and AI automation.',
};

const page = () => {
  return (
    <>
      <Pricing />
      <OurImpact />
      <IncludeInEveryPlan />
      <CTA />
    </>
  );
};

export default page;
