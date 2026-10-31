import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {ProjectCaseStudy} from '@/components/projects/project-case-study';
import {getProject, projects} from '@/content/projects';
import {routing, type Locale} from '@/i18n/routing';
import {localizedMetadata} from '@/lib/metadata';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({locale, slug: project.slug}))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const project = getProject(slug);
  if (!hasLocale(routing.locales, locale) || !project) return {};

  setRequestLocale(locale);
  const t = await getTranslations('Projects');
  return localizedMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${project.title[locale]} | ${t('metadataTitle')}`,
    description: project.summary[locale]
  });
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  const project = getProject(slug);
  if (!hasLocale(routing.locales, locale) || !project) notFound();

  setRequestLocale(locale as Locale);
  const t = await getTranslations('Projects');
  return (
    <ProjectCaseStudy
      project={project}
      locale={locale as Locale}
      backLabel={t('backToProjects')}
      categoryLabel={t(`categories.${project.category}`)}
      statusLabel={t(`statuses.${project.status}`)}
      technologiesLabel={t('technologies')}
    />
  );
}
