import ServicesHero from '@/src/components/services/hero';
import OurServices from '@/src/components/services/our-services';
import CTA from '@/src/components/shared/cta';
import Technologies from '@/src/components/shared/technologies';
import WhyChooseUs from '@/src/components/shared/why-choose-us';
import { services } from '@/src/data/services';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - FathomXO',
  description: 'Four lines: e-commerce, website and app, landing page, AI agents and automation.',
};

const page = async () => {
  return (
    <>
      <ServicesHero />
      <OurServices services={services} />
      <Technologies />
      <WhyChooseUs />
      <CTA />
    </>
  );
};

export default page;
