'use client';

import {useEffect, useState, type ReactNode} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {usePathname as useNextPathname} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {achievements} from '@/content/achievements';

type WindowType = 'computer' | 'documents' | 'recycle' | null;

type DesktopProject = {
  slug: string;
  title: string;
};

function WindowMenuBar({t}: {t: ReturnType<typeof useTranslations<'Desktop'>>}) {
  return (
    <div className="menu-bar">
      <span><u>{t('windowFile')[0]}</u>{t('windowFile').slice(1)}</span>
      <span><u>{t('windowEdit')[0]}</u>{t('windowEdit').slice(1)}</span>
      <span><u>{t('windowView')[0]}</u>{t('windowView').slice(1)}</span>
      <span><u>{t('windowHelp')[0]}</u>{t('windowHelp').slice(1)}</span>
    </div>
  );
}

function WindowControls({onClose, closeLabel}: {onClose?: () => void; closeLabel?: string}) {
  return (
    <div className="window-controls">
      <span aria-hidden="true">_</span>
      <span aria-hidden="true">□</span>
      {onClose ? (
        <button type="button" className="close-window-button" aria-label={closeLabel} onClick={onClose}>×</button>
      ) : (
        <span aria-hidden="true">×</span>
      )}
    </div>
  );
}

export function DesktopShell({
  children,
  locale,
  projects
}: {
  children: ReactNode;
  locale: Locale;
  projects: DesktopProject[];
}) {
  const navigation = useTranslations('Navigation');
  const desktop = useTranslations('Desktop');
  const about = useTranslations('About');
  const achievementText = useTranslations('Achievements');
  const localizedPathname = useNextPathname();
  const pathname = localizedPathname.replace(/^\/(?:en|fr)(?=\/|$)/, '') || '/';
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [openWindow, setOpenWindow] = useState<WindowType>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.start-btn') && !target.closest('.start-menu')) {
        setIsStartMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!openWindow) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenWindow(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [openWindow]);

  const openWindowHandler = (windowType: Exclude<WindowType, null>) => {
    setOpenWindow(windowType);
    setIsStartMenuOpen(false);
  };
  const closeWindowHandler = () => setOpenWindow(null);
  const iconPath = (name: string) => `/images/windows-icons/${name}.png`;

  return (
    <>
      <div className="desktop-icons">
        <button onClick={() => openWindowHandler('computer')} className="icon-item" type="button">
          <Image src={iconPath('computer_explorer-5')} alt="" width={48} height={48} unoptimized />
          <span>{desktop('myComputer')}</span>
        </button>
        <button onClick={() => openWindowHandler('documents')} className="icon-item" type="button">
          <Image src={iconPath('directory_open_file_mydocs-4')} alt="" width={48} height={48} unoptimized />
          <span>{desktop('myDocuments')}</span>
        </button>
        <button onClick={() => openWindowHandler('recycle')} className="icon-item" type="button">
          <Image src={iconPath('recycle_bin_full-4')} alt="" width={48} height={48} unoptimized />
          <span>{desktop('achievementsShortcut')}</span>
        </button>
      </div>

      {openWindow ? (
        <div className="modal-overlay" onClick={closeWindowHandler}>
          <div
            className="modal-window"
            role="dialog"
            aria-modal="true"
            aria-label={openWindow === 'computer' ? desktop('myComputer') : openWindow === 'documents' ? desktop('myDocuments') : navigation('achievements')}
            onClick={(event) => event.stopPropagation()}
          >
            {openWindow === 'computer' ? (
              <div className="window">
                <div className="window-header">
                  <span>💻 {desktop('myComputer')}</span>
                  <WindowControls onClose={closeWindowHandler} closeLabel={navigation('closeWindow')} />
                </div>
                <WindowMenuBar t={desktop} />
                <div className="window-content">
                  <div className="computer-drives">
                    <div className="drive-item">
                      <Image src={iconPath('cd_drive-4')} alt="" width={16} height={16} unoptimized />
                      <div>
                        <div className="drive-label">(C:) {desktop('profileDrive')}</div>
                        <div className="drive-name">{desktop('profileDriveName')}</div>
                      </div>
                    </div>
                    <div className="drive-item">
                      <Image src={iconPath('cd_drive-4')} alt="" width={16} height={16} unoptimized />
                      <div>
                        <div className="drive-label">(D:) {desktop('educationDrive')}</div>
                        <div className="drive-name">{about('programme')}</div>
                      </div>
                    </div>
                    <div className="drive-item">
                      <Image src={iconPath('cd_drive-4')} alt="" width={16} height={16} unoptimized />
                      <div>
                        <div className="drive-label">(A:) {desktop('credentialsDrive')}</div>
                        <div className="drive-name">{desktop('credentialDriveName')}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-bar">
                  <span>{desktop('computerCount', {count: 3})}</span>
                  <span>{desktop('myComputer')}</span>
                </div>
              </div>
            ) : null}

            {openWindow === 'documents' ? (
              <div className="window">
                <div className="window-header">
                  <span>📁 {desktop('myDocuments')}</span>
                  <WindowControls onClose={closeWindowHandler} closeLabel={navigation('closeWindow')} />
                </div>
                <WindowMenuBar t={desktop} />
                <div className="window-content">
                  <div className="folder-list">
                    {projects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="folder-item"
                        style={{textDecoration: 'none', color: 'inherit', padding: '4px 8px'}}
                        onClick={closeWindowHandler}
                      >
                        <Image src={iconPath('html-0')} alt="" width={16} height={16} unoptimized />
                        <span>{project.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="status-bar">
                  <span>{desktop('documentsCount', {count: projects.length})}</span>
                  <span>{desktop('myDocuments')}</span>
                </div>
              </div>
            ) : null}

            {openWindow === 'recycle' ? (
              <div className="window">
                <div className="window-header">
                  <span>🏆 {navigation('achievements')}</span>
                  <WindowControls onClose={closeWindowHandler} closeLabel={navigation('closeWindow')} />
                </div>
                <WindowMenuBar t={desktop} />
                <div className="window-content">
                  <div className="achievement-window-list">
                    {achievements.map((achievement) => (
                      <article className="achievement-window-item" key={achievement.id}>
                        <h3>{achievementText(`entries.${achievement.titleKey}`)}</h3>
                        <p>{achievementText(`entries.${achievement.detailKey}`)}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="status-bar">
                  <span>{desktop('achievementCount', {count: achievements.length})}</span>
                  <span>{navigation('achievements')}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {children}

      <div className="taskbar">
        <button className="start-btn" type="button" aria-expanded={isStartMenuOpen} onClick={() => setIsStartMenuOpen((open) => !open)}>
          <Image src={iconPath('windows-0')} alt="" width={32} height={32} unoptimized />
          <span className="start-text">{navigation('start')}</span>
        </button>

        {isStartMenuOpen ? (
          <div className="start-menu">
            <div className="start-menu-header">
              <span className="windows-logo">{desktop('startMenuTitle')}</span>
              <span className="windows-version">{desktop('startMenuVersion')}</span>
            </div>
            <div className="start-menu-items">
              <button onClick={() => openWindowHandler('documents')} className="start-menu-item" type="button">
                <Image src={iconPath('directory_open_file_mydocs-4')} alt="" width={32} height={32} unoptimized />
                <span>{desktop('myDocuments')}</span>
              </button>
              <button onClick={() => openWindowHandler('computer')} className="start-menu-item" type="button">
                <Image src={iconPath('computer_explorer-5')} alt="" width={32} height={32} unoptimized />
                <span>{desktop('myComputer')}</span>
              </button>
              <Link href="/experience" className="start-menu-item" onClick={() => setIsStartMenuOpen(false)}>
                <Image src={iconPath('settings_gear-0')} alt="" width={32} height={32} unoptimized />
                <span>{navigation('experience')}</span>
              </Link>
              <Link href="/projects" className="start-menu-item" onClick={() => setIsStartMenuOpen(false)}>
                <Image src={iconPath('search_file-2')} alt="" width={16} height={16} unoptimized />
                <span>{navigation('projects')}</span>
              </Link>
              <Link href="/achievements" className="start-menu-item" onClick={() => setIsStartMenuOpen(false)}>
                <Image src={iconPath('help_book_big-0')} alt="" width={32} height={32} unoptimized />
                <span>{navigation('achievements')}</span>
              </Link>
              <Link href="/contact" className="start-menu-item" onClick={() => setIsStartMenuOpen(false)}>
                <Image src={iconPath('application_hourglass-0')} alt="" width={32} height={32} unoptimized />
                <span>{navigation('contact')}</span>
              </Link>
              <div className="start-menu-separator" />
              <Link
                href={pathname}
                locale={locale === 'en' ? 'fr' : 'en'}
                className="start-menu-item"
                onClick={() => setIsStartMenuOpen(false)}
              >
                <Image src={iconPath('shut_down_with_computer-0')} alt="" width={32} height={32} unoptimized />
                <span>{navigation('switchLanguage')}</span>
              </Link>
            </div>
          </div>
        ) : null}

        <div className="taskbar-time">
          <Image
            src={iconPath('loudspeaker_rays-0')}
            alt=""
            width={32}
            height={32}
            unoptimized
            className="taskbar-icon"
            title={desktop('audioUnavailable')}
          />
          <span className="time-text">12:00 PM</span>
        </div>
      </div>
    </>
  );
}
