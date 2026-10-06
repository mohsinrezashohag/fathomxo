import EngagementModels from '@/src/components/home/engagement-models';
import SystemsWeBuild from '@/src/components/home/systems-we-build';
import FAQ from '@/src/components/home/faq';
import Hero from '@/src/components/home/hero';
import InnovativeSolutions from '@/src/components/home/innovative-solutions';
import HowWeWork from '@/src/components/home/how-we-work';
import Projects from '@/src/components/home/projects';
import Subscribe from '@/src/components/home/subscribe';
import Testimonial from '@/src/components/home/testimonial';
import Contact from '@/src/components/shared/contact';
import CTA from '@/src/components/shared/cta';
import Technologies from '@/src/components/shared/technologies';
import VideoModal from '@/src/components/shared/VideoModal';
import ModalProvider from '@/src/context/ModalContext';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'FathomXO - software studio in Dhaka',
};

const page = () => {
  return (
    <ModalProvider>
      <Hero />
      <HowWeWork />
      <SystemsWeBuild />
      <EngagementModels />
      <InnovativeSolutions />
      <Projects />
      <Testimonial />
      <Technologies />
      <FAQ />
      <Subscribe />
      <CTA />
      <Contact />
      <VideoModal />
    </ModalProvider>
  );
};

export default page;
