import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {routing, type Locale} from '@/i18n/routing';
import {localizedMetadata} from '@/lib/metadata';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  setRequestLocale(locale);
  const t = await getTranslations('Contact');
  return localizedMetadata({
    locale,
    path: '/contact',
    title: t('metadataTitle'),
    description: t('metadataDescription')
  });
}

export default async function ContactPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale as Locale);
  const t = await getTranslations('Contact');

  return (
    <main>
      <section data-background-section="contact" className="section-space border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-8 text-lg leading-8 text-foreground-muted sm:text-xl">
              {t('introduction')}
            </p>
          </div>
        </Container>
      </section>

      <section data-background-section="contact" className="section-space contact-section">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <SectionHeading eyebrow={t('availabilityEyebrow')}>
                {t('availabilityTitle')}
              </SectionHeading>
              <p className="mt-6 max-w-xl leading-7 text-foreground-muted">
                {t('availabilityDescription')}
              </p>
            </div>
            <dl className="grid gap-6 border-l border-border pl-6 sm:pl-8">
              <div>
                <dt className="text-sm text-foreground-muted">{t('periodLabel')}</dt>
                <dd className="mt-2 text-lg font-medium text-foreground">{t('period')}</dd>
              </div>
              <div>
                <dt className="text-sm text-foreground-muted">{t('locationLabel')}</dt>
                <dd className="mt-2 text-lg font-medium text-foreground">{t('location')}</dd>
              </div>
            </dl>
          </div>
          <p className="mt-12 border-t border-border pt-6 text-sm text-foreground-muted">
            {t('contactDetailsNote')}
          </p>
        </Container>
      </section>
    </main>
  );
}
