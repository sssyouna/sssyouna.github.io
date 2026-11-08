'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export type DesktopFolderId = 'projects' | 'profile' | 'education' | 'events' | 'documents' | 'experience';

export type ExplorerLocation =
  | {type: 'computer'}
  | {type: 'drive'}
  | {type: 'folder'; folder: DesktopFolderId}
  | {type: 'project'; slug: string}
  | {type: 'content'; key: string};

export type DesktopProject = {
  slug: string;
  title: string;
  summary: string;
  technologies: string[];
  repository?: string;
  sections: {title: string; body: string}[];
};

type ExplorerWindowProps = {
  location: ExplorerLocation;
  projects: DesktopProject[];
  onNavigate: (location: ExplorerLocation) => void;
  onBack: () => void;
  onForward: () => void;
  onUp: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  onOpenCaseStudy?: (slug: string) => void;
};

type Entry = {
  id: string;
  label: string;
  description: string;
  icon: string;
  location: ExplorerLocation;
};

const folderIds: DesktopFolderId[] = ['projects', 'profile', 'education', 'events', 'documents', 'experience'];
const iconUrl = (name: string) => `/images/windows-icons/${name}.png`;

function folderLocation(folder: DesktopFolderId): ExplorerLocation {
  return {type: 'folder', folder};
}

export function explorerLocationTitle(location: ExplorerLocation, t: ReturnType<typeof useTranslations<'Desktop'>>) {
  if (location.type === 'computer') return t('myComputer');
  if (location.type === 'drive') return 'D:';
  if (location.type === 'folder') return t(`folders.${location.folder}`);
  if (location.type === 'project') return t('projectDetails');
  const [, key] = location.key.split(':');
  if (location.key.startsWith('profile:')) return t(`profile.files.${key}.title`);
  if (location.key.startsWith('education:')) return t(`education.items.${key}.title`);
  if (location.key.startsWith('event:')) return t(`events.items.${key}.title`);
  if (location.key.startsWith('document:')) return t(`documents.items.${key}.title`);
  if (location.key.startsWith('experience:')) return t(`experience.items.${key}.title`);
  return t('learningArchive');
}

export function parentExplorerLocation(location: ExplorerLocation): ExplorerLocation | null {
  if (location.type === 'computer') return null;
  if (location.type === 'drive') return {type: 'computer'};
  if (location.type === 'folder') return {type: 'drive'};
  if (location.type === 'project') return folderLocation('projects');
  if (location.key.startsWith('profile:')) return folderLocation('profile');
  if (location.key.startsWith('education:')) return folderLocation('education');
  if (location.key.startsWith('event:')) return folderLocation('events');
  if (location.key.startsWith('document:')) return folderLocation('documents');
  if (location.key.startsWith('experience:')) return folderLocation('experience');
  return folderLocation('education');
}

function DetailBlock({title, children}: {title?: string; children: React.ReactNode}) {
  return <section className="explorer-detail-block">{title ? <h3>{title}</h3> : null}{children}</section>;
}

export function ExplorerWindow({
  location,
  projects,
  onNavigate,
  onBack,
  onForward,
  onUp,
  canGoBack,
  canGoForward,
  onOpenCaseStudy
}: ExplorerWindowProps) {
  const t = useTranslations('Desktop');
  const about = useTranslations('About');
  const contact = useTranslations('Contact');
  const experience = useTranslations('Experience');
  const achievements = useTranslations('Achievements');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lastTap, setLastTap] = useState<{id: string; at: number} | null>(null);

  const entries: Entry[] = location.type === 'drive'
    ? folderIds.map((folder) => ({
        id: folder,
        label: t(`folders.${folder}`),
        description: t(`folderDescriptions.${folder}`),
        icon: 'directory_open_file_mydocs-4',
        location: folderLocation(folder)
      }))
    : location.type === 'folder' && location.folder === 'projects'
      ? projects.map((project) => ({
          id: project.slug,
          label: project.title,
          description: project.summary,
          icon: 'html-0',
          location: {type: 'project', slug: project.slug}
        }))
      : location.type === 'folder' && location.folder === 'profile'
        ? (['introduction', 'about', 'interests', 'career', 'journey'] as const).map((key) => ({
            id: `profile:${key}`,
            label: t(`profile.files.${key}.title`),
            description: t(`profile.files.${key}.summary`),
            icon: 'html-0',
            location: {type: 'content', key: `profile:${key}`}
          }))
        : location.type === 'folder' && location.folder === 'education'
          ? (['highSchool', 'ensa', 'learningArchive'] as const).map((key) => ({
              id: `education:${key}`,
              label: t(`education.items.${key}.title`),
              description: t(`education.items.${key}.summary`),
              icon: 'directory_open_file_mydocs-4',
              location: {type: 'content', key: `education:${key}`}
            }))
          : location.type === 'folder' && location.folder === 'events'
            ? (['gitex', 'ctf', 'community'] as const).map((key) => ({
                id: `event:${key}`,
                label: t(`events.items.${key}.title`),
                description: t(`events.items.${key}.summary`),
                icon: 'help_book_big-0',
                location: {type: 'content', key: `event:${key}`}
              }))
            : location.type === 'folder' && location.folder === 'documents'
              ? (['securityPlus', 'jrPentester', 'securityEngineer', 'devSecOps', 'ctf', 'secOps'] as const).map((key) => ({
                  id: `document:${key}`,
                  label: achievements(`entries.${key === 'securityPlus' ? 'securityPlusTitle' : key === 'jrPentester' ? 'tryHackMeJrPentesterTitle' : key === 'securityEngineer' ? 'tryHackMePathsTitle' : key === 'devSecOps' ? 'tryHackMeDevSecOpsTitle' : key === 'ctf' ? 'ctfTitle' : 'clubTitle'}`),
                  description: t(`documents.items.${key}.summary`),
                  icon: 'html-0',
                  location: {type: 'content', key: `document:${key}`}
                }))
              : location.type === 'folder' && location.folder === 'experience'
                ? (['cimar', 'macobate'] as const).map((key) => ({
                    id: `experience:${key}`,
                    label: experience(`${key}Company`),
                    description: experience(`${key}Summary`),
                    icon: 'application_hourglass-0',
                    location: {type: 'content', key: `experience:${key}`}
                  }))
                : [];

  const openEntry = (entry: Entry) => {
    setSelectedId(entry.id);
    onNavigate(entry.location);
  };

  const selectEntry = (entry: Entry, at: number) => {
    setSelectedId(entry.id);
    if (lastTap?.id === entry.id && at - lastTap.at < 550) {
      onNavigate(entry.location);
      setLastTap(null);
    } else {
      setLastTap({id: entry.id, at});
    }
  };

  const renderEntries = (items: Entry[]) => (
    <div className="explorer-items" role="list">
      {items.map((entry) => (
        <button
          key={entry.id}
          type="button"
          role="listitem"
          className={`explorer-item${selectedId === entry.id ? ' explorer-item-selected' : ''}`}
          onClick={(event) => selectEntry(entry, event.timeStamp)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openEntry(entry);
            }
          }}
        >
          <Image src={iconUrl(entry.icon)} alt="" width={48} height={48} unoptimized />
          <span className="explorer-item-label">{entry.label}</span>
          <span className="explorer-item-description">{entry.description}</span>
        </button>
      ))}
    </div>
  );

  const currentProject = location.type === 'project' ? projects.find((project) => project.slug === location.slug) : undefined;
  const locationPath = location.type === 'computer'
    ? [t('myComputer')]
    : location.type === 'drive'
      ? [t('myComputer'), 'D:']
      : location.type === 'folder'
        ? [t('myComputer'), 'D:', t(`folders.${location.folder}`)]
        : [t('myComputer'), 'D:', t(`folders.${parentExplorerLocation(location)?.type === 'folder' ? (parentExplorerLocation(location) as {type: 'folder'; folder: DesktopFolderId}).folder : 'projects'}`), explorerLocationTitle(location, t)];

  return (
    <div className="explorer-app">
      <div className="explorer-toolbar">
        <button type="button" onClick={onBack} disabled={!canGoBack} aria-label={t('toolbar.back')}>←</button>
        <button type="button" onClick={onForward} disabled={!canGoForward} aria-label={t('toolbar.forward')}>→</button>
        <button type="button" onClick={onUp} disabled={location.type === 'computer'} aria-label={t('toolbar.up')}>↑</button>
        <div className="explorer-address" aria-label={t('toolbar.address')}>
          {locationPath.map((part, index) => <span key={`${part}-${index}`}>{index ? ' › ' : ''}{part}</span>)}
        </div>
      </div>

      <div className="explorer-content">
        {location.type === 'computer' ? (
          <>
            <h2 className="explorer-section-heading">{t('computer.drives')}</h2>
            <button className="drive-card" type="button" onClick={() => onNavigate({type: 'drive'})}>
              <Image src="/images/windows-icons/hard-drive.svg" alt="" width={56} height={56} unoptimized />
              <span><strong>D: {t('storage.driveName')}</strong><small>{t('storage.driveDescription')}</small></span>
              <span className="drive-meter" aria-label={t('storage.simulated')}><i /></span>
            </button>
          </>
        ) : null}

        {location.type === 'drive' ? (
          <>
            <div className="storage-summary">
              <div><h2>D: {t('storage.driveName')}</h2><p>{t('storage.simulated')}</p></div>
              <span>{t('storage.used')} · {t('storage.total')}</span>
              <div className="storage-track"><i /></div>
            </div>
            {renderEntries(entries)}
          </>
        ) : null}

        {location.type === 'folder' ? (
          <>
            <h2 className="explorer-section-heading">{t(`folders.${location.folder}`)}</h2>
            {location.folder === 'experience' ? <p className="explorer-folder-introduction">{experience('introduction')}</p> : null}
            {renderEntries(entries)}
          </>
        ) : null}

        {location.type === 'project' && currentProject ? (
          <article className="explorer-detail">
            <h2>{currentProject.title}</h2>
            <DetailBlock title={t('projectOverview')}><p>{currentProject.summary}</p></DetailBlock>
            <DetailBlock title={t('projectTechnologies')}>
              <div className="explorer-tags">{currentProject.technologies.map((technology) => <span className="explorer-tag" key={technology}>{technology}</span>)}</div>
            </DetailBlock>
            {currentProject.sections.map((section) => <DetailBlock title={section.title} key={section.title}><p>{section.body}</p></DetailBlock>)}
            <div className="explorer-detail-actions">
              <Link className="button-retro" href={`/projects/${currentProject.slug}`} onClick={() => onOpenCaseStudy?.(currentProject.slug)}>{t('openCaseStudy')} ↗</Link>
              {currentProject.repository ? <a className="button-retro" href={currentProject.repository} target="_blank" rel="noopener noreferrer">{t('repository')} ↗</a> : null}
            </div>
          </article>
        ) : null}

        {location.type === 'content' && location.key.startsWith('profile:') ? (
          <article className="explorer-detail">
            <h2>{explorerLocationTitle(location, t)}</h2>
            {location.key === 'profile:introduction' ? <DetailBlock><p>{about('introduction')}</p></DetailBlock> : null}
            {location.key === 'profile:about' ? <DetailBlock title={about('approachTitle')}><p>{about('approachDescription')}</p></DetailBlock> : null}
            {location.key === 'profile:interests' ? (
              <DetailBlock title={about('domainsTitle')}>
                <dl className="explorer-definition-list">
                  <div><dt>{about('offensiveSecurity')}</dt><dd>{about('offensiveSecurityItems').split('|').join(' · ')}</dd></div>
                  <div><dt>{about('systemsNetwork')}</dt><dd>{about('systemsNetworkItems').split('|').join(' · ')}</dd></div>
                  <div><dt>{about('securityEngineering')}</dt><dd>{about('securityEngineeringItems').split('|').join(' · ')}</dd></div>
                  <div><dt>{about('governance')}</dt><dd>{about('governanceItems').split('|').join(' · ')}</dd></div>
                  <div><dt>{about('programming')}</dt><dd>{about('programmingItems').split('|').join(' · ')}</dd></div>
                </dl>
                <p className="explorer-note">{about('skillNote')}</p>
              </DetailBlock>
            ) : null}
            {location.key === 'profile:career' ? <DetailBlock title={contact('availabilityTitle')}><p>{contact('introduction')}</p><p>{contact('availabilityDescription')}</p></DetailBlock> : null}
            {location.key === 'profile:journey' ? (
              <DetailBlock title={t('profile.journeyTitle')}>
                <ol className="explorer-timeline">
                  <li><strong>{about('institution')}</strong><span>{about('programme')} · {about('graduation')}</span></li>
                  <li><strong>{experience('macobateCompany')}</strong><span>{experience('macobateRole')} · {experience('macobatePeriod')}</span></li>
                  <li><strong>{experience('cimarCompany')}</strong><span>{experience('cimarRole')} · {experience('cimarPeriod')}</span></li>
                  <li><strong>TryHackMe</strong><span>{achievements('entries.tryHackMePathsDetail')}</span></li>
                </ol>
              </DetailBlock>
            ) : null}
          </article>
        ) : null}

        {location.type === 'content' && location.key.startsWith('education:') ? (
          <EducationDetail locationKey={location.key} t={t} about={about} />
        ) : null}

        {location.type === 'content' && location.key.startsWith('event:') ? (
          <EventDetail locationKey={location.key} t={t} achievements={achievements} />
        ) : null}

        {location.type === 'content' && location.key.startsWith('document:') ? (
          <DocumentDetail locationKey={location.key} t={t} achievements={achievements} />
        ) : null}

        {location.type === 'content' && location.key.startsWith('experience:') ? (
          <ExperienceDetail locationKey={location.key} experience={experience} />
        ) : null}
      </div>

      <div className="explorer-status-bar">
        <span>{location.type === 'folder' ? t('documentsCount', {count: entries.length}) : t('ready')}</span>
        <span>{locationPath[locationPath.length - 1]}</span>
      </div>
    </div>
  );
}

function EducationDetail({locationKey, t, about}: {locationKey: string; t: ReturnType<typeof useTranslations<'Desktop'>>; about: ReturnType<typeof useTranslations<'About'>>}) {
  const key = locationKey.split(':')[1];
  if (key === 'highSchool') return <article className="explorer-detail"><h2>{t('education.items.highSchool.title')}</h2><p>{t('education.items.highSchool.notProvided')}</p></article>;
  if (key === 'learningArchive') return (
    <article className="explorer-detail">
      <h2>{t('education.items.learningArchive.title')}</h2>
      <p>{t('education.items.learningArchive.summary')}</p>
      <div className="archive-grid">
        {(['academicYear', 'semester', 'modules', 'courses', 'practicalWork', 'labs', 'projects', 'skills'] as const).map((item) => (
          <section className="archive-folder" key={item}><h3>{t(`education.archive.${item}`)}</h3><p>{t('education.archive.empty')}</p></section>
        ))}
      </div>
    </article>
  );
  return (
    <article className="explorer-detail">
      <h2>{about('institution')}</h2>
      <DetailBlock title={about('academicTitle')}>
        <dl className="explorer-definition-list">
          <div><dt>{t('education.institution')}</dt><dd>{about('institution')}</dd></div>
          <div><dt>{t('education.programme')}</dt><dd>{about('programme')}</dd></div>
          <div><dt>{t('education.cycle')}</dt><dd>{about('cycle')} · {about('graduation')}</dd></div>
        </dl>
      </DetailBlock>
      <DetailBlock title={t('education.learningArchive')}><p>{t('education.items.learningArchive.summary')}</p></DetailBlock>
      <a className="button-retro" href="https://www.ensaf.ac.ma/" target="_blank" rel="noopener noreferrer">{t('education.officialWebsite')} ↗</a>
    </article>
  );
}

function EventDetail({locationKey, t, achievements}: {locationKey: string; t: ReturnType<typeof useTranslations<'Desktop'>>; achievements: ReturnType<typeof useTranslations<'Achievements'>>}) {
  const key = locationKey.split(':')[1];
  const eventKey = key === 'gitex' ? 'gitex' : key === 'ctf' ? 'ctf' : 'community';
  const detail = key === 'ctf' ? achievements('entries.ctfDetail') : key === 'community' ? achievements('entries.clubDetail') : t('events.items.gitex.detail');
  return (
    <article className="explorer-detail">
      <h2>{t(`events.items.${eventKey}.title`)}</h2>
      <DetailBlock><p>{detail}</p><p>{t(`events.items.${eventKey}.details`)}</p></DetailBlock>
      <div className="event-photo-placeholder" role="img" aria-label={t('events.noPhotos')}>
        <Image src={iconUrl('help_book_big-0')} alt="" width={48} height={48} unoptimized />
        <span>{t('events.noPhotos')}</span>
      </div>
    </article>
  );
}

function DocumentDetail({locationKey, t, achievements}: {locationKey: string; t: ReturnType<typeof useTranslations<'Desktop'>>; achievements: ReturnType<typeof useTranslations<'Achievements'>>}) {
  const key = locationKey.split(':')[1];
  const titles: Record<string, string> = {
    securityPlus: achievements('entries.securityPlusTitle'),
    jrPentester: achievements('entries.tryHackMeJrPentesterTitle'),
    securityEngineer: t('documents.items.securityEngineer.title'),
    devSecOps: achievements('entries.tryHackMeDevSecOpsTitle'),
    ctf: achievements('entries.ctfTitle'),
    secOps: achievements('entries.clubTitle')
  };
  const isTryHackMe = ['jrPentester', 'securityEngineer', 'devSecOps'].includes(key);
  const detail = key === 'securityPlus'
    ? achievements('entries.securityPlusDetail')
    : isTryHackMe
      ? achievements('entries.tryHackMePathsDetail')
      : key === 'ctf'
        ? achievements('entries.ctfDetail')
        : key === 'secOps'
          ? achievements('entries.clubDetail')
          : '';
  const issuer = key === 'securityPlus' ? 'CompTIA' : isTryHackMe ? 'TryHackMe' : key === 'ctf' ? 'ENSA Fès CTF' : 'SecOps Club · ENSA Fès';
  const date = isTryHackMe ? t('documents.tryHackMeDates') : t('documents.dateNotProvided');
  return (
    <article className="explorer-detail">
      <h2>{titles[key] ?? t('documents.notProvided')}</h2>
      <dl className="explorer-definition-list metadata-list">
        <div><dt>{t('documents.issuer')}</dt><dd>{issuer}</dd></div>
        <div><dt>{t('documents.date')}</dt><dd>{date}</dd></div>
        <div><dt>{t('documents.verification')}</dt><dd>{t('documents.verificationNotProvided')}</dd></div>
      </dl>
      <DetailBlock><p>{detail}</p><p className="explorer-note">{t('documents.fileNotAvailable')}</p></DetailBlock>
    </article>
  );
}

function ExperienceDetail({locationKey, experience}: {locationKey: string; experience: ReturnType<typeof useTranslations<'Experience'>>}) {
  const key = locationKey.split(':')[1] as 'cimar' | 'macobate';
  if (key === 'macobate') {
    return <article className="explorer-detail"><h2>{experience('macobateCompany')}</h2><p className="explorer-subtitle">{experience('macobateRole')} · {experience('macobatePeriod')}</p><DetailBlock title={experience('macobateDetailsTitle')}><p>{experience('macobateSummary')}</p><p>{experience('macobateDetails')}</p></DetailBlock><p className="explorer-note">{experience('macobateScopeNote')}</p></article>;
  }
  return <article className="explorer-detail"><h2>{experience('cimarCompany')}</h2><p className="explorer-subtitle">{experience('cimarRole')} · {experience('cimarPeriod')}</p><DetailBlock title={experience('cimarAssessmentTitle')}><p>{experience('cimarSummary')}</p><p>{experience('cimarAssessment')}</p></DetailBlock><DetailBlock title={experience('cimarToolsTitle')}><p>{experience('cimarTools')}</p></DetailBlock><DetailBlock title={experience('cimarGovernanceTitle')}><p>{experience('cimarGovernance')}</p></DetailBlock><DetailBlock title={experience('cimarResultsTitle')}><p>{experience('cimarResults')}</p></DetailBlock><p className="explorer-note">{experience('cimarScopeNote')}</p></article>;
}
