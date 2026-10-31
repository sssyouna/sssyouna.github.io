import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Container} from '@/components/ui/container';
import {routing, type Locale} from '@/i18n/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  setRequestLocale(locale);
  const t = await getTranslations('Experience');
  return {
    title: t('metadataTitle'),
    description: t('metadataDescription')
  };
}

export default async function ExperiencePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale as Locale);
  const t = await getTranslations('Experience');

  return (
    <main>
      <section className="section-space border-b border-border">
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

      <section className="section-space">
        <Container>
          <div className="relative space-y-14 border-l border-border pl-6 sm:pl-10">
            <article className="relative">
              <span className="timeline-dot" aria-hidden="true" />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <p className="eyebrow">{t('internship')}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-foreground">{t('cimarCompany')}</h2>
                  <p className="mt-1 text-lg text-accent">{t('cimarRole')}</p>
                </div>
                <p className="text-sm text-foreground-muted">{t('cimarPeriod')}</p>
              </div>
              <p className="mt-6 max-w-3xl leading-7 text-foreground-muted">{t('cimarSummary')}</p>
              <dl className="mt-8 grid max-w-3xl gap-7">
                <div>
                  <dt className="font-semibold text-foreground">{t('cimarAssessmentTitle')}</dt>
                  <dd className="mt-2 leading-7 text-foreground-muted">{t('cimarAssessment')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">{t('cimarToolsTitle')}</dt>
                  <dd className="mt-2 leading-7 text-foreground-muted">{t('cimarTools')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">{t('cimarGovernanceTitle')}</dt>
                  <dd className="mt-2 leading-7 text-foreground-muted">{t('cimarGovernance')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">{t('cimarResultsTitle')}</dt>
                  <dd className="mt-2 leading-7 text-foreground-muted">{t('cimarResults')}</dd>
                </div>
              </dl>
              <p className="mt-8 max-w-3xl border-t border-border pt-5 text-sm leading-6 text-foreground-muted">
                {t('cimarScopeNote')}
              </p>
            </article>

            <article className="relative">
              <span className="timeline-dot" aria-hidden="true" />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <p className="eyebrow">{t('internship')}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-foreground">{t('macobateCompany')}</h2>
                  <p className="mt-1 text-lg text-accent">{t('macobateRole')}</p>
                </div>
                <p className="text-sm text-foreground-muted">{t('macobatePeriod')}</p>
              </div>
              <p className="mt-2 text-sm text-foreground-muted">{t('macobateLocation')}</p>
              <p className="mt-6 max-w-3xl leading-7 text-foreground-muted">{t('macobateSummary')}</p>
              <dl className="mt-8 max-w-3xl">
                <div>
                  <dt className="font-semibold text-foreground">{t('macobateDetailsTitle')}</dt>
                  <dd className="mt-2 leading-7 text-foreground-muted">{t('macobateDetails')}</dd>
                </div>
              </dl>
              <p className="mt-8 max-w-3xl border-t border-border pt-5 text-sm leading-6 text-foreground-muted">
                {t('macobateScopeNote')}
              </p>
            </article>
          </div>
        </Container>
      </section>
    </main>
  );
}
