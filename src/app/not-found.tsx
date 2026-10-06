import NotFoundHero from '@/src/components/not-found/not-found-hero';
import { generateMetadata } from '@/src/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateMetadata(),
  title: 'Page not found - FathomXO',
};

const page = () => {
  return <NotFoundHero />;
};

export default page;
