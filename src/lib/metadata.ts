import type {Metadata} from 'next';
import type {Locale} from '@/i18n/routing';

const siteUrl = 'https://www.younass.me';

export function localizedMetadata({
  locale,
  path,
  title,
  description,
  imagePath,
  imageAlt
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  imagePath?: string;
  imageAlt?: {en:string;fr:string};
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
      description,
      ...(imagePath ? {images:[{url:`${siteUrl}${imagePath}`,width:1200,height:630,alt:imageAlt?.[locale] ?? title}]} : {})
    },
    twitter: {
      card: imagePath ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(imagePath ? {images:[`${siteUrl}${imagePath}`]} : {})
    }
  };
}
