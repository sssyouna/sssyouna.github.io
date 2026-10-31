import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {ProjectFilter} from '@/components/projects/project-filter';
import {Container} from '@/components/ui/container';
import {projects, projectCategories} from '@/content/projects';
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
  const t = await getTranslations('Projects');
  return localizedMetadata({
    locale,
    path: '/projects',
    title: t('metadataTitle'),
    description: t('metadataDescription')
  });
}

export default async function ProjectsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale as Locale);
  const t = await getTranslations('Projects');
  const filters = [
    {value: 'all' as const, label: t('allCategories')},
    ...projectCategories.map((value) => ({value, label: t(`categories.${value}`)}))
  ];

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
            <p className="mt-6 text-sm font-medium text-accent">
              {t('projectCount', {count: projects.length})}
            </p>
          </div>
        </Container>
      </section>
      <section className="section-space">
        <Container>
          <ProjectFilter
            projects={projects}
            filters={filters}
            allLabel={t('filterLabel')}
            emptyLabel={t('emptyFilter')}
            locale={locale as Locale}
          />
        </Container>
      </section>
    </main>
  );
}
