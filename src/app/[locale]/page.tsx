import type {Metadata} from 'next';
import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
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
  const about = await getTranslations('About');
  const projectsText = await getTranslations('Projects');
  const desktop = await getTranslations('Desktop');
  const resumeAvailable = hasResume();
  const skills = [
    {title: about('offensiveSecurity'), description: about('offensiveSecurityItems')},
    {title: about('systemsNetwork'), description: about('systemsNetworkItems')},
    {title: about('securityEngineering'), description: about('securityEngineeringItems')}
  ];

  return (
    <>
      <header>
        <div className="window hero-window">
          <div className="window-header">
            <span>👤 YOUNASS.ME · {t('eyebrow')}</span>
            <div className="window-controls" aria-hidden="true">
              <span>_</span><span>□</span><span>×</span>
            </div>
          </div>
          <div className="menu-bar">
            <span><u>F</u>ile</span>
            <span><u>E</u>dit</span>
            <span><u>V</u>iew</span>
            <span><u>H</u>elp</span>
          </div>
          <div className="hero-content">
            <div className="profile-frame">
              <Image src="/images/profile-pixelated.png" alt={profile.name} width={928} height={1152} unoptimized className="profile-img" />
            </div>
            <div>
              <h1 className="hero-title">
                {profile.name}
                <br />
                {t('eyebrow')}
              </h1>
              <p className="hero-description">{t('introduction')}</p>
              <p className="hero-description">{t('interests')}</p>
              <div className="tag-container">
                <span className="tag">{t('disciplineOne')}</span>
                <span className="tag">{t('disciplineTwo')}</span>
                <span className="tag">{t('disciplineThree')}</span>
                <span className="tag">CompTIA Security+</span>
              </div>
              <div className="hero-actions">
                <Link href="/projects" className="button-retro">{t('projectsCta')} →</Link>
                <Link href="/contact" className="button-retro">{t('contactCta')} ↗</Link>
                {resumeAvailable ? (
                  <a href={portfolioFiles.resume} download className="button-retro">{t('downloadCv')} ↓</a>
                ) : null}
              </div>
            </div>
          </div>
          <div className="status-bar">
            <span>{t('availabilityPeriod')} · {t('availabilityLocation')}</span>
            <span className="blink">● {t('availabilityLabel')}</span>
          </div>
        </div>
      </header>

      <main className="main-container">
        <div className="window">
          <div className="window-header">
            <span>📁 {t('selectedWorkTitle')}</span>
            <div className="window-controls" aria-hidden="true">
              <span>_</span><span>□</span><span>×</span>
            </div>
          </div>
          <div className="project-grid">
            {projects.slice(0, 2).map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="project-card"
                style={{textDecoration: 'none', color: 'inherit'}}
              >
                <div className="project-img project-img-placeholder" role="img" aria-label={`${project.title[locale as Locale]}: ${desktop('previewUnavailable')}`}>
                  <span>{desktop('previewUnavailable')}</span>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title[locale as Locale]}</h3>
                  <div>
                    {project.technologies.slice(0, 3).map((technology) => (
                      <span className="tag" key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="status-bar">
            <span>{projectsText('projectCount', {count: 2})}</span>
            <Link href="/projects" className="inline-link">{t('allProjects')} ↗</Link>
          </div>
        </div>

        <div className="window">
          <div className="window-header">
            <span>💡 {about('eyebrow')}</span>
            <div className="window-controls" aria-hidden="true">
              <span>_</span><span>□</span><span>×</span>
            </div>
          </div>
          <div className="about-content">
            <h2 className="about-title">{about('academicTitle')}</h2>
            <p className="about-description">{about('introduction')}</p>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div className="skill-card" key={skill.title}>
                  <h3 className="skill-title">{['🔎', '🖧', '🛡️'][index]} {skill.title}</h3>
                  <p className="skill-description">{skill.description.split('|').join(' · ')}</p>
                </div>
              ))}
            </div>
            <div className="home-window-links">
              <Link href="/about" className="button-retro">{about('approachEyebrow')} →</Link>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-link">GitHub ↗</a>
            </div>
          </div>
          <div className="status-bar">
            <span>{about('credentials')}</span>
            <Link href="/achievements" className="inline-link">{t('credentialsLink')} ↗</Link>
          </div>
        </div>
      </main>
    </>
  );
}
