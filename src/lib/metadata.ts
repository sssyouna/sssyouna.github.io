import type {Metadata} from 'next';
import type {Locale} from '@/i18n/routing';

const siteUrl = 'https://younass.me';

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
      description
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  };
}
