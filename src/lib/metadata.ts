import type {Metadata} from 'next';
import type {Locale} from '@/i18n/routing';

export const siteUrl = 'https://www.younass.me';

export function localizedMetadata({
  locale,
  path,
  title,
  description
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const localizedPath = `/${locale}${path}`;
  const englishPath = `/en${path}`;
  const frenchPath = `/fr${path}`;
  const image = {
    url: `${siteUrl}/images/og/portfolio.png`,
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: locale === 'fr'
      ? 'Younass Ibn Abdeslam — Portfolio cybersécurité, bureau interactif inspiré de Windows'
      : 'Younass Ibn Abdeslam — Cybersecurity portfolio, interactive Windows-inspired desktop'
  };

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        en: englishPath,
        fr: frenchPath,
        'x-default': englishPath
      }
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: localizedPath,
      siteName: 'Younass.me',
      title,
      description,
      images: [image]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{url: image.url, alt: image.alt}]
    }
  };
}
