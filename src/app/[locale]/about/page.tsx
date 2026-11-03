import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {routing, type Locale} from '@/i18n/routing';
import {localizedMetadata} from '@/lib/metadata';

const skillGroups = [
  {title: 'offensiveSecurity', items: 'offensiveSecurityItems'},
  {title: 'systemsNetwork', items: 'systemsNetworkItems'},
  {title: 'securityEngineering', items: 'securityEngineeringItems'},
  {title: 'governance', items: 'governanceItems'},
  {title: 'programming', items: 'programmingItems'}
] as const;

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  setRequestLocale(locale);
  const t = await getTranslations('About');
  return localizedMetadata({
    locale,
    path: '/about',
    title: t('metadataTitle'),
    description: t('metadataDescription')
  });
}

export default async function AboutPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale as Locale);
  const t = await getTranslations('About');

  return (
    <main>
      <section data-background-section="education" className="section-space border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-8 text-lg leading-8 text-foreground-muted sm:text-xl">
              {t('introduction')}
            </p>
            <p className="mt-6 text-sm font-medium text-accent">{t('credentials')}</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t('academicEyebrow')}>
            {t('academicTitle')}
          </SectionHeading>
          <dl className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-foreground-muted">{t('institution')}</dt>
              <dd className="mt-2 text-lg font-medium text-foreground">{t('programme')}</dd>
            </div>
            <div>
              <dt className="text-sm text-foreground-muted">{t('cycle')}</dt>
              <dd className="mt-2 text-lg font-medium text-foreground">{t('graduation')}</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <SectionHeading eyebrow={t('domainsEyebrow')}>{t('domainsTitle')}</SectionHeading>
          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {skillGroups.map(({title, items}) => (
              <article key={title} className="bg-background p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground">{t(title)}</h3>
                <ul className="mt-5 space-y-3 text-foreground-muted">
                  {t(items).split('|').map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-foreground-muted">{t('skillNote')}</p>
        </Container>
      </section>
    </main>
  );
}
