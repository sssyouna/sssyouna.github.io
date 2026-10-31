import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {AchievementEntry} from '@/components/achievements/achievement-entry';
import {achievements} from '@/content/achievements';
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
  const t = await getTranslations('Achievements');
  return localizedMetadata({
    locale,
    path: '/achievements',
    title: t('metadataTitle'),
    description: t('metadataDescription')
  });
}

export default async function AchievementsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale as Locale);
  const t = await getTranslations('Achievements');
  const byKind = (kind: (typeof achievements)[number]['kind']) =>
    achievements.find((achievement) => achievement.kind === kind);

  const certification = byKind('professional-certification');
  const learning = byKind('learning');
  const competition = byKind('competition');
  const community = byKind('community');

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

      <section className="section-space border-b border-border">
        <Container>
          <SectionHeading eyebrow={t('certificationsEyebrow')}>
            {t('certificationsTitle')}
          </SectionHeading>
          {certification ? (
            <div className="mt-10">
              <AchievementEntry
                title={t(`entries.${certification.titleKey}`)}
                detail={t(`entries.${certification.detailKey}`)}
                label={t('professionalCertification')}
                featured
              />
            </div>
          ) : null}
        </Container>
      </section>

      <section className="section-space border-b border-border">
        <Container>
          <SectionHeading eyebrow={t('learningEyebrow')}>{t('learningTitle')}</SectionHeading>
          {learning ? (
            <div className="mt-10">
              <AchievementEntry
                title={t(`entries.${learning.titleKey}`)}
                detail={t(`entries.${learning.detailKey}`)}
                label={t('practicalLearning')}
              />
            </div>
          ) : null}
        </Container>
      </section>

      <section className="section-space border-b border-border">
        <Container>
          <SectionHeading eyebrow={t('competitionEyebrow')}>{t('competitionTitle')}</SectionHeading>
          {competition ? (
            <div className="mt-10">
              <AchievementEntry
                title={t(`entries.${competition.titleKey}`)}
                detail={t(`entries.${competition.detailKey}`)}
                label={t('competition')}
              />
            </div>
          ) : null}
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <SectionHeading eyebrow={t('communityEyebrow')}>{t('communityTitle')}</SectionHeading>
          {community ? (
            <div className="mt-10">
              <AchievementEntry
                title={t(`entries.${community.titleKey}`)}
                detail={t(`entries.${community.detailKey}`)}
                label={t('communityInvolvement')}
              />
            </div>
          ) : null}
        </Container>
      </section>
    </main>
  );
}
