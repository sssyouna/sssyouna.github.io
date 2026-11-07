import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {localizedMetadata} from '@/lib/metadata';
import {DesktopShell} from '@/components/layout/desktop-shell';
import {projects} from '@/content/projects';
import '../globals.css';
import '../windows98.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  setRequestLocale(locale);
  const t = await getTranslations('Metadata');

  return localizedMetadata({
    locale,
    path: '',
    title: t('title'),
    description: t('description')
  });
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider
          locale={locale}
          messages={{
            Navigation: messages.Navigation,
            Desktop: messages.Desktop,
            About: messages.About,
            Achievements: messages.Achievements
          }}
        >
          <DesktopShell
            locale={locale as Locale}
            projects={projects.map((project) => ({
              slug: project.slug,
              title: project.title[locale as Locale]
            }))}
          >
            {children}
          </DesktopShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
