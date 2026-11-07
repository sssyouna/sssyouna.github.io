import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {ProjectCard} from '@/components/projects/project-card';
import {MagneticLink} from '@/components/ui/magnetic-link';
import {projects} from '@/content/projects';
import {profile} from '@/content/profile';
import {portfolioFiles} from '@/content/assets';
import {routing, type Locale} from '@/i18n/routing';
import {localizedMetadata} from '@/lib/metadata';
import {hasResume} from '@/lib/assets';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  setRequestLocale(locale);
  const t = await getTranslations('Metadata');
  return localizedMetadata({
    locale,
    path: '',
    title: t('title'),
    description: t('description')
  });
}

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale as Locale);
  const t = await getTranslations('Home');
  const p = await getTranslations('Projects');
  const resumeAvailable = hasResume();

  return (
    <main>
      <section data-background-section="hero" className="hero-section border-b border-border">
        <Container className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h1 className="hero-title">{t('title')}</h1>
            <p className="hero-introduction">{t('introduction')}</p>
            <p className="hero-interests">{t('interests')}</p>
            <div className="hero-actions">
              <Link href="/projects" className="button button-primary">
                {t('projectsCta')} <span aria-hidden="true">↘</span>
              </Link>
              <MagneticLink>
                <Link href="/contact" className="button button-secondary">
                  {t('contactCta')} <span aria-hidden="true">↗</span>
                </Link>
              </MagneticLink>
              {resumeAvailable ? (
                <a href={portfolioFiles.resume} download className="button button-text">
                  {t('downloadCv')} <span aria-hidden="true">↓</span>
                </a>
              ) : null}
            </div>
          </div>

          <aside className="hero-aside" aria-label={t('profileSummaryLabel')}>
            <div className="hero-aside-topline">
              <span>{t('profileSummaryLabel')}</span>
              <span>01 / 04</span>
            </div>
            <p className="hero-aside-title">{t('profileSummaryTitle')}</p>
            <ul className="hero-disciplines">
              <li>{t('disciplineOne')}</li>
              <li>{t('disciplineTwo')}</li>
              <li>{t('disciplineThree')}</li>
            </ul>
            <div className="hero-credentials">
              <p>{t('credentials')}</p>
              <Link href="/achievements" className="inline-link">
                {t('credentialsLink')} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      <section data-background-section="education" className="availability-strip border-b border-border">
        <Container className="availability-layout">
          <p className="availability-status"><span aria-hidden="true" />{t('availabilityLabel')}</p>
          <p>{t('availabilityPeriod')}</p>
          <p>{t('availabilityLocation')}</p>
        </Container>
      </section>

      <section data-background-section="projects" className="section-space">
        <Container>
          <div className="section-heading-row">
            <SectionHeading eyebrow={t('selectedWorkEyebrow')}>{t('selectedWorkTitle')}</SectionHeading>
            <Link href="/projects" className="inline-link section-heading-link">
              {t('allProjects')} <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale as Locale}
                index={String(index + 1).padStart(2, '0')}
                readLabel={p('readCaseStudy')}
                repositoryLabel={p('repository')}
              />
            ))}
          </div>
        </Container>
      </section>

      <section data-background-section="cimar" className="editorial-band border-y border-border">
        <Container className="editorial-band-layout">
          <div>
            <p className="eyebrow">{t('experienceEyebrow')}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{t('experienceTitle')}</h2>
            <p className="mt-5 max-w-xl leading-7 text-foreground-muted">{t('experienceDescription')}</p>
          </div>
          <div className="experience-preview-list">
            <article className="experience-preview-item">
              <span className="experience-preview-date">2026</span>
              <div>
                <h3>{t('cimarRole')}</h3>
                <p>{t('cimarCompany')}</p>
              </div>
              <span className="experience-preview-arrow" aria-hidden="true">↗</span>
            </article>
            <article className="experience-preview-item">
              <span className="experience-preview-date">2025</span>
              <div>
                <h3>{t('macobateRole')}</h3>
                <p>{t('macobateCompany')}</p>
              </div>
              <span className="experience-preview-arrow" aria-hidden="true">↗</span>
            </article>
            <Link href="/experience" className="inline-link mt-4">
              {t('fullExperience')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      <section data-background-section="ctf" className="section-space">
        <Container>
          <div className="section-heading-row">
            <SectionHeading eyebrow={t('achievementsEyebrow')}>{t('achievementsTitle')}</SectionHeading>
            <Link href="/achievements" className="inline-link section-heading-link">
              {t('allAchievements')} <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="achievement-preview-grid mt-10">
            <article className="achievement-preview-item">
              <span className="achievement-index">01</span>
              <div><p>{t('securityPlusLabel')}</p><h3>{t('securityPlus')}</h3></div>
            </article>
            <article className="achievement-preview-item">
              <span className="achievement-index">02</span>
              <div><p>{t('learningLabel')}</p><h3>{t('tryHackMe')}</h3></div>
            </article>
            <article className="achievement-preview-item">
              <span className="achievement-index">03</span>
              <div><p>{t('competitionLabel')}</p><h3>{t('ctf')}</h3></div>
            </article>
          </div>
        </Container>
      </section>

      <section data-background-section="contact" className="home-contact border-t border-border">
        <Container className="home-contact-layout">
          <div>
            <p className="eyebrow">{t('contactEyebrow')}</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">{t('contactTitle')}</h2>
          </div>
          <div className="home-contact-actions">
            <MagneticLink>
              <Link href="/contact" className="button button-primary">
                {t('contactCta')} <span aria-hidden="true">↗</span>
              </Link>
            </MagneticLink>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-link">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
