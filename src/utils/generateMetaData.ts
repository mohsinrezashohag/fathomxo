import type { Metadata } from 'next';

/**
 * Site-wide metadata defaults. Every route spreads these and overrides only what
 * differs, so the studio name, OG card and canonical host are stated once.
 *
 * The host comes from NEXT_PUBLIC_SITE_URL, the env var the deployment plan
 * names, and falls back to the production apex so a local build still produces
 * absolute OG URLs rather than relative ones that no crawler can resolve.
 */
export const DEFAULT_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fathomxo.com';
export const SITE_NAME = 'FathomXO';
export const DEFAULT_TITLE = 'FathomXO - software studio in Dhaka';
export const DEFAULT_DESCRIPTION =
  'FathomXO builds e-commerce, websites, apps and AI automation for founders and teams. Published pricing, real timelines, work you can point at.';

/* TODO: feature 14 replaces this with the dynamic OG image route. Until then a
   card is better than none, and the app icon is the only brand art that exists
   at the right aspect. */
export const DEFAULT_IMAGE_URL = '/images/logo/app-icon-512.png';

const defaultMetadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: DEFAULT_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_IMAGE_URL, width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE_URL],
  },
};

const generateMetadata = (
  title?: string,
  description?: string,
  canonicaUrl?: string,
  imageUrl?: string
): Metadata => {
  return {
    ...defaultMetadata,
    title: title ?? defaultMetadata.title,
    description: description ?? defaultMetadata.description,
    alternates: {
      canonical: canonicaUrl,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title ?? defaultMetadata.openGraph?.title,
      description: description ?? defaultMetadata.openGraph?.description,
      url: canonicaUrl ?? defaultMetadata.openGraph?.url,
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630 }]
        : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title ?? defaultMetadata.twitter?.title,
      description: description ?? defaultMetadata.twitter?.description,
      images: imageUrl ? [imageUrl] : defaultMetadata.twitter?.images,
    },
  };
};

export { generateMetadata };
