'use client';

import {useCallback, useEffect, useState, type ReactNode} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {WindowFrame} from '@/components/desktop/window-frame';
import {DesktopWindowContext} from '@/components/desktop/window-context';
import {ProfilePortrait} from '@/components/profile/profile-portrait';
import {ContactLinks} from '@/components/profile/contact-links';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {profile} from '@/content/profile';
import type {CertificateAsset} from '@/content/certifications';
import {
  ExplorerWindow,
  explorerLocationTitle,
  parentExplorerLocation,
  type DesktopFolderId,
  type DesktopProject,
  type ExplorerLocation
} from '@/components/desktop/explorer-window';

type Theme = 'professional' | 'terminal';
type Wallpaper = 'classic' | 'animated' | 'solid';
type AnimationIntensity = 'off' | 'subtle' | 'normal';
type WindowKind = 'welcome' | 'explorer' | 'settings' | 'route';
type DesktopWindowState = {
  id: string;
  kind: WindowKind;
  minimized: boolean;
  maximized: boolean;
  location?: ExplorerLocation;
  history?: ExplorerLocation[];
  future?: ExplorerLocation[];
  title?: string;
  icon?: string;
};

type IconSpec = {
  id: string;
  labelKey: string;
  icon: string;
  folder?: DesktopFolderId;
  app?: 'computer' | 'settings';
};

const STORAGE_KEY = 'younass-desktop-theme';
const WALLPAPER_STORAGE_KEY = 'younass-desktop-wallpaper';
const ANIMATION_STORAGE_KEY = 'younass-desktop-animation';
const iconPath = (name: string) => `/images/windows-icons/${name}.png`;
const iconAsset = (name: string) => name.endsWith('.svg') ? `/images/windows-icons/${name}` : iconPath(name);

const desktopIcons: IconSpec[] = [
  {id: 'computer', labelKey: 'myComputer', icon: 'computer_explorer-5', app: 'computer'},
  {id: 'projects', labelKey: 'folders.projects', icon: 'directory_open_file_mydocs-4', folder: 'projects'},
  {id: 'profile', labelKey: 'folders.profile', icon: 'directory_open_file_mydocs-4', folder: 'profile'},
  {id: 'education', labelKey: 'folders.education', icon: 'directory_open_file_mydocs-4', folder: 'education'},
  {id: 'events', labelKey: 'folders.events', icon: 'help_book_big-0', folder: 'events'},
  {id: 'documents', labelKey: 'folders.documents', icon: 'html-0', folder: 'documents'},
  {id: 'experience', labelKey: 'folders.experience', icon: 'application_hourglass-0', folder: 'experience'},
  {id: 'settings', labelKey: 'settings.title', icon: 'settings_gear-0', app: 'settings'}
];

function DesktopIcon({
  spec,
  label,
  selected,
  onSelect,
  onOpen
}: {
  spec: IconSpec;
  label: string;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}) {
  const [lastTapAt, setLastTapAt] = useState(0);
  return (
    <button
      className={`icon-item${selected ? ' desktop-icon-selected' : ''}`}
      type="button"
      aria-label={label}
      aria-pressed={selected}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
        if (event.detail === 0 || ('pointerType' in event.nativeEvent && event.nativeEvent.pointerType === 'touch')) {
          onOpen();
          return;
        }
        const now = Date.now();
        if (now - lastTapAt < 550) {
          onOpen();
          setLastTapAt(0);
        } else {
          setLastTapAt(now);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <Image src={iconPath(spec.icon)} alt="" width={48} height={48} unoptimized />
      <span>{label}</span>
    </button>
  );
}

function windowTitle(window: DesktopWindowState, desktop: ReturnType<typeof useTranslations<'Desktop'>>, projects: DesktopProject[]) {
  if (window.kind === 'route') return window.title ?? '';
  if (window.kind === 'welcome') return desktop('welcome.title');
  if (window.kind === 'settings') return desktop('settings.title');
  if (window.location?.type === 'project') {
    const slug = window.location.slug;
    const project = projects.find((project) => project.slug === slug);
    return project ? `${project.title} · ${desktop('projectDetails')}` : desktop('projectDetails');
  }
  return window.location ? explorerLocationTitle(window.location, desktop) : desktop('myComputer');
}

function windowIcon(window: DesktopWindowState) {
  if (window.kind === 'welcome') return 'windows-0';
  if (window.kind === 'settings') return 'settings_gear-0';
  if (window.location?.type === 'computer') return 'computer_explorer-5';
  if (window.location?.type === 'drive') return 'hard-drive.svg';
  if (window.location?.type === 'folder') return 'directory_open_file_mydocs-4';
  if (window.location?.type === 'project') return 'html-0';
  return 'help_book_big-0';
}

export function DesktopShell({
  children,
  locale,
  certificates,
  projects
}: {
  children: ReactNode;
  locale: Locale;
  certificates: CertificateAsset[];
  projects: DesktopProject[];
}) {
  const navigation = useTranslations('Navigation');
  const desktop = useTranslations('Desktop');
  const home = useTranslations('Home');
  const about = useTranslations('About');
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>('professional');
  const [wallpaper, setWallpaper] = useState<Wallpaper>('animated');
  const [animationIntensity, setAnimationIntensity] = useState<AnimationIntensity>('subtle');
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isShutdown, setIsShutdown] = useState(false);
  const [windows, setWindows] = useState<DesktopWindowState[]>(() => pathname === '/'
    ? [{id: 'welcome', kind: 'welcome', minimized: false, maximized: false}]
    : []);
  const windowList = windows.filter((item) => item.kind !== 'route' || item.id === `route:${pathname}`);
  const activeWindowId = windowList.filter((item) => !item.minimized).at(-1)?.id ?? '';
  const routeWindow = windowList.find((item) => item.kind === 'route');
  const currentLocale = locale === 'en' ? 'en' : 'fr';

  useEffect(() => {
    let stored: string | null = null;
    let storedWallpaper: string | null = null;
    let storedAnimation: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
      storedWallpaper = window.localStorage.getItem(WALLPAPER_STORAGE_KEY);
      storedAnimation = window.localStorage.getItem(ANIMATION_STORAGE_KEY);
    } catch { /* Storage can be disabled. */ }
    queueMicrotask(() => {
      if (stored === 'terminal' || stored === 'dark') setTheme('terminal');
      else setTheme('professional');
      if (storedWallpaper === 'classic' || storedWallpaper === 'original') setWallpaper('classic');
      else if (storedWallpaper === 'animated' || storedWallpaper === 'solid') setWallpaper(storedWallpaper);
      if (storedAnimation === 'off' || storedAnimation === 'subtle' || storedAnimation === 'normal') setAnimationIntensity(storedAnimation);
      setThemeLoaded(true);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.start-btn') && !target.closest('.start-menu')) setIsStartMenuOpen(false);
      if (!target.closest('.icon-item')) setSelectedIcon(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const updateVisibility = () => document.documentElement.dataset.wallpaperTabVisible = document.visibilityState === 'visible' ? 'true' : 'false';
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  const setThemePreference = (nextTheme: Theme) => {
    setTheme(nextTheme);
    try { window.localStorage.setItem(STORAGE_KEY, nextTheme); } catch { /* Keep the in-memory preference. */ }
  };

  const setWallpaperPreference = (nextWallpaper: Wallpaper) => {
    setWallpaper(nextWallpaper);
    try { window.localStorage.setItem(WALLPAPER_STORAGE_KEY, nextWallpaper); } catch { /* Keep the in-memory preference. */ }
  };

  const setAnimationPreference = (nextIntensity: AnimationIntensity) => {
    setAnimationIntensity(nextIntensity);
    try { window.localStorage.setItem(ANIMATION_STORAGE_KEY, nextIntensity); } catch { /* Keep the in-memory preference. */ }
  };

  const bringToFront = useCallback((id: string) => {
    setWindows((current) => {
      const found = current.find((item) => item.id === id);
      if (!found || (current.at(-1)?.id === id && !found.minimized)) return current;
      return [...current.filter((item) => item.id !== id), {...found, minimized: false}];
    });
  }, []);

  const openExplorer = useCallback((location: ExplorerLocation) => {
    const id = location.type === 'project' ? `project:${location.slug}`
      : location.type === 'content' ? `content:${location.key}`
      : location.type === 'folder' ? `folder:${location.folder}` : `explorer:${location.type}`;
    setWindows((current) => {
      const existing = current.find((item) => item.id === id);
      const next: DesktopWindowState = existing
        ? {...existing, minimized: false, location,
          history: JSON.stringify(existing.location) === JSON.stringify(location)
            ? existing.history : [...(existing.history ?? []), ...(existing.location ? [existing.location] : [])],
          future: JSON.stringify(existing.location) === JSON.stringify(location) ? existing.future : []}
        : {id, kind: 'explorer', location, history: [], future: [], minimized: false, maximized: false};
      return [...current.filter((item) => item.id !== id), next];
    });
    setIsStartMenuOpen(false);
  }, []);

  const registerRoute = useCallback((id: string, title: string, icon: string) => {
    setWindows((current) => {
      const existing = current.find((item) => item.id === id);
      return [...current.filter((item) => item.kind !== 'route'),
        {id, kind: 'route', title, icon, minimized: false, maximized: existing?.maximized ?? false}];
    });
    setIsStartMenuOpen(false);
  }, []);

  const openSettings = useCallback(() => {
    setWindows((current) => {
      const existing = current.find((item) => item.id === 'settings');
      const next = existing ? {...existing, minimized: false} : {id: 'settings', kind: 'settings' as const, minimized: false, maximized: false};
      return [...current.filter((item) => item.id !== 'settings'), next];
    });
    setIsStartMenuOpen(false);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((current) => current.filter((item) => item.id !== id));
    if (id.startsWith('route:')) router.push('/');
  }, [router]);

  const prepareRouteNavigation = useCallback(() => {
    setIsStartMenuOpen(false);
  }, []);

  const minimizeWindow = (id: string) => {
    setWindows((current) => current.map((item) => item.id === id ? {...item, minimized: true} : item));
  };

  const toggleMaximize = (id: string) => {
    setWindows((current) => current.map((item) => item.id === id ? {...item, maximized: !item.maximized} : item));
  };

  const navigateExplorer = (id: string, nextLocation: ExplorerLocation) => {
    if (nextLocation.type === 'project' || nextLocation.type === 'content') {
      openExplorer(nextLocation);
      return;
    }
    setWindows((current) => current.map((item) => item.id === id && item.location
      ? {...item, history: [...(item.history ?? []), item.location], future: [], location: nextLocation}
      : item));
  };

  const goBack = (id: string) => {
    setWindows((current) => current.map((item) => {
      if (item.id !== id || !item.location || !item.history?.length) return item;
      const history = [...item.history];
      const location = history.pop()!;
      return {...item, location, history, future: [item.location, ...(item.future ?? [])]};
    }));
  };

  const goForward = (id: string) => {
    setWindows((current) => current.map((item) => {
      if (item.id !== id || !item.location || !item.future?.length) return item;
      const [location, ...future] = item.future;
      return {...item, location, future, history: [...(item.history ?? []), item.location]};
    }));
  };

  const goUp = (id: string) => {
    const target = windows.find((item) => item.id === id);
    if (!target?.location) return;
    const parent = parentExplorerLocation(target.location);
    if (parent) navigateExplorer(id, parent);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      event.preventDefault();
      if (isStartMenuOpen) {
        setIsStartMenuOpen(false);
        return;
      }
      if (activeWindowId) closeWindow(activeWindowId);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeWindowId, closeWindow, isStartMenuOpen]);

  const openDesktopIcon = (spec: IconSpec) => {
    setSelectedIcon(spec.id);
    if (spec.app === 'computer') openExplorer({type: 'computer'});
    else if (spec.app === 'settings') openSettings();
    else if (spec.folder) openExplorer({type: 'folder', folder: spec.folder});
  };


  return (
    <DesktopWindowContext.Provider value={{
      routeWindow: routeWindow ? {...routeWindow, title: routeWindow.title ?? '', icon: routeWindow.icon ?? ''} : undefined,
      activeId: activeWindowId, order: routeWindow ? windowList.indexOf(routeWindow) : 0,
      registerRoute, focus: bringToFront, close: closeWindow, minimize: minimizeWindow, maximize: toggleMaximize
    }}>
    <div className="portfolio-desktop" data-theme={theme} data-wallpaper={wallpaper} data-animation={animationIntensity} data-theme-ready={themeLoaded} onClick={(event) => {
      if (event.target === event.currentTarget) {
        setSelectedIcon(null);
        setIsStartMenuOpen(false);
      }
    }}>
      <div className="desktop-wallpaper" aria-hidden="true">
        <span className="terminal-character-rain terminal-character-rain-a">0101&nbsp;&nbsp;7F</span>
        <span className="terminal-character-rain terminal-character-rain-b">AUTH&nbsp;&nbsp;A3</span>
        <span className="terminal-character-rain terminal-character-rain-c">SYS&nbsp;&nbsp;0001</span>
      </div>

      <nav className="desktop-icons" aria-label={navigation('desktopShortcuts')}>
        {desktopIcons.map((spec) => (
          <DesktopIcon
            key={spec.id}
            spec={spec}
            label={desktop(spec.labelKey)}
            selected={selectedIcon === spec.id}
            onSelect={() => setSelectedIcon(spec.id)}
            onOpen={() => openDesktopIcon(spec)}
          />
        ))}
      </nav>

      <div className="desktop-route-layer" hidden={isShutdown}>{children}</div>

      {!isShutdown ? (
        <div className="desktop-window-layer">
          {windowList.filter((item) => item.kind !== 'route').map((item) => {
            const focused = item.id === activeWindowId;
            const title = windowTitle(item, desktop, projects);
            const icon = windowIcon(item);
            return (
              <WindowFrame key={item.id} title={title}
                icon={<Image src={iconAsset(icon)} alt="" width={18} height={18} unoptimized />}
                state={item} focused={focused} order={windowList.indexOf(item)}
                onFocus={() => bringToFront(item.id)} onClose={() => closeWindow(item.id)}
                onMinimize={() => minimizeWindow(item.id)} onMaximize={() => toggleMaximize(item.id)}>
                {item.kind === 'explorer' && item.location ? (
                  <ExplorerWindow
                    certificates={certificates}
                    location={item.location}
                    projects={projects}
                    onNavigate={(location) => navigateExplorer(item.id, location)}
                    onBack={() => goBack(item.id)}
                    onForward={() => goForward(item.id)}
                    onUp={() => goUp(item.id)}
                    canGoBack={Boolean(item.history?.length)}
                    canGoForward={Boolean(item.future?.length)}
                    onOpenCaseStudy={prepareRouteNavigation}
                  />
                ) : null}

                {item.kind === 'welcome' ? (
                  <div className="welcome-app">
                    <div className="welcome-profile">
                      <ProfilePortrait />
                      <div>
                        <p className="welcome-eyebrow">{home('eyebrow')}</p>
                        <h1>{profile.name}</h1>
                        <p>{home('introduction')}</p>
                        <p>{home('interests')}</p>
                        <p className="welcome-focus">{home('profileSummaryTitle')} · {home('disciplineOne')} · {home('disciplineTwo')} · {home('disciplineThree')}</p>
                        <p className="welcome-availability">● {home('availabilityLabel')} · {home('availabilityPeriod')} · {home('availabilityLocation')}</p>
                        <ContactLinks />
                      </div>
                    </div>
                    <div className="welcome-actions">
                      <button type="button" className="button-retro" onClick={() => openExplorer({type: 'computer'})}>{desktop('welcome.openComputer')} →</button>
                      <button type="button" className="button-retro" onClick={() => openExplorer({type: 'folder', folder: 'profile'})}>{desktop('folders.profile')} →</button>
                    </div>
                    <div className="status-bar"><span>{desktop('welcome.tagline')}</span><span>{about('credentials')}</span></div>
                  </div>
                ) : null}

                {item.kind === 'settings' ? (
                  <div className="settings-app">
                    <section className="settings-section">
                      <h2>{desktop('settings.language')}</h2>
                      <p>{desktop('settings.languageDescription')}</p>
                      <div className="settings-options">
                        <Link href={pathname} locale="en" className="button-retro" aria-current={currentLocale === 'en' ? 'page' : undefined}>{desktop('settings.english')}</Link>
                        <Link href={pathname} locale="fr" className="button-retro" aria-current={currentLocale === 'fr' ? 'page' : undefined}>{desktop('settings.french')}</Link>
                      </div>
                    </section>
                    <section className="settings-section">
                      <h2>{desktop('settings.theme')}</h2>
                      <p>{desktop('settings.themeDescription')}</p>
                      <div className="settings-options theme-options">
                        {(['professional', 'terminal'] as const).map((choice) => (
                          <button key={choice} type="button" className={`theme-choice theme-choice-${choice}`} aria-pressed={theme === choice} onClick={() => setThemePreference(choice)}>
                            <span className="theme-preview" aria-hidden="true" />
                            <span>{desktop(`settings.themes.${choice}`)}</span>
                            {theme === choice ? <small>{desktop('settings.selected')}</small> : null}
                          </button>
                        ))}
                      </div>
                    </section>
                    <section className="settings-section">
                      <h2>{desktop('settings.wallpaper')}</h2>
                      <p>{desktop('settings.wallpaperDescription')}</p>
                      <div className="settings-options wallpaper-options">
                        {(['classic', 'animated', 'solid'] as const).map((choice) => (
                          <button key={choice} type="button" className={`appearance-choice wallpaper-choice-${choice}`} aria-pressed={wallpaper === choice} onClick={() => setWallpaperPreference(choice)}>
                            <span className="wallpaper-preview" aria-hidden="true" />
                            <span>{desktop(`settings.wallpapers.${choice}`)}</span>
                            {wallpaper === choice ? <small>{desktop('settings.selected')}</small> : null}
                          </button>
                        ))}
                      </div>
                    </section>
                    <section className="settings-section">
                      <h2>{desktop('settings.animation')}</h2>
                      <p>{desktop('settings.animationDescription')}</p>
                      <div className="settings-options animation-options">
                        {(['off', 'subtle', 'normal'] as const).map((choice) => (
                          <button key={choice} type="button" className="appearance-choice" aria-pressed={animationIntensity === choice} onClick={() => setAnimationPreference(choice)}>
                            <span>{desktop(`settings.animations.${choice}`)}</span>
                            {animationIntensity === choice ? <small>{desktop('settings.selected')}</small> : null}
                          </button>
                        ))}
                      </div>
                      <p className="settings-footnote">{desktop('settings.preferencesSaved')}</p>
                    </section>
                  </div>
                ) : null}
              </WindowFrame>
            );
          })}
        </div>
      ) : null}

      {!isShutdown ? (
        <>
          <div className="taskbar desktop-taskbar">
            <button className={`start-btn${isStartMenuOpen ? ' start-btn-open' : ''}`} type="button" aria-label={navigation('start')} aria-expanded={isStartMenuOpen} onClick={() => setIsStartMenuOpen((open) => !open)}>
              <Image src={iconPath('windows-0')} alt="" width={24} height={24} unoptimized />
              <span className="start-text">{navigation('start')}</span>
            </button>

            <div className="taskbar-windows" aria-label={desktop('taskbar.openWindows')}>
              {windowList.map((item) => (
                <button key={item.id} aria-label={windowTitle(item, desktop, projects)} title={windowTitle(item, desktop, projects)} className={`taskbar-window-button${item.id === activeWindowId && !item.minimized ? ' taskbar-window-button-active' : ''}`} type="button" aria-pressed={item.id === activeWindowId && !item.minimized} onClick={() => bringToFront(item.id)}>
                  <Image src={iconAsset(windowIcon(item))} alt="" width={18} height={18} unoptimized />
                  <span>{windowTitle(item, desktop, projects)}</span>
                </button>
              ))}
            </div>

            {isStartMenuOpen ? (
              <section className="start-menu" aria-label={navigation('startMenu')}>
                <div className="start-menu-header"><span className="windows-logo">Windows</span><span className="windows-version">XP</span></div>
                <div className="start-menu-items">
                  <a className="start-menu-item" href={profile.github} target="_blank" rel="noopener noreferrer"><Image src={iconPath('computer_explorer-5')} alt="" width={32} height={32} unoptimized /><span>{desktop('startLinks.github')}</span></a>
                  <a className="start-menu-item" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Image src={iconPath('help_book_big-0')} alt="" width={32} height={32} unoptimized /><span>{desktop('startLinks.linkedin')}</span></a>
                  <a className="start-menu-item" href={`mailto:${profile.email}`}><Image src={iconPath('html-0')} alt="" width={32} height={32} unoptimized /><span>{desktop('startLinks.email')}</span></a>
                  <a className="start-menu-item" href={`tel:${profile.phone}`}><Image src={iconPath('help_book_big-0')} alt="" width={32} height={32} unoptimized /><span>{desktop('startLinks.phone')}</span></a>
                  <Link className="start-menu-item" href="/" onClick={prepareRouteNavigation}><Image src={iconPath('windows-0')} alt="" width={32} height={32} unoptimized /><span>{desktop('startLinks.website')}</span></Link>
                  <Link className="start-menu-item" href="/about" onClick={prepareRouteNavigation}><Image src={iconPath('directory_open_file_mydocs-4')} alt="" width={32} height={32} unoptimized /><span>{navigation('about')}</span></Link>
                  <Link className="start-menu-item" href="/projects" onClick={prepareRouteNavigation}><Image src={iconPath('html-0')} alt="" width={32} height={32} unoptimized /><span>{navigation('projects')}</span></Link>
                  <Link className="start-menu-item" href="/experience" onClick={prepareRouteNavigation}><Image src={iconPath('application_hourglass-0')} alt="" width={32} height={32} unoptimized /><span>{navigation('experience')}</span></Link>
                  <Link className="start-menu-item" href="/achievements" onClick={prepareRouteNavigation}><Image src={iconPath('help_book_big-0')} alt="" width={32} height={32} unoptimized /><span>{navigation('achievements')}</span></Link>
                  <Link className="start-menu-item" href="/contact" onClick={prepareRouteNavigation}><Image src={iconPath('computer_explorer-5')} alt="" width={32} height={32} unoptimized /><span>{navigation('contact')}</span></Link>
                  <a className="start-menu-item" href="https://www.ensaf.ac.ma/" target="_blank" rel="noopener noreferrer"><Image src={iconPath('directory_open_file_mydocs-4')} alt="" width={32} height={32} unoptimized /><span>{desktop('startLinks.ensa')}</span></a>
                  <a className="start-menu-item" href={profile.tryHackMe} target="_blank" rel="noopener noreferrer"><Image src={iconPath('help_book_big-0')} alt="" width={32} height={32} unoptimized /><span>{desktop('startLinks.tryHackMe')}</span></a>
                  <button className="start-menu-item" type="button" onClick={openSettings}><Image src={iconPath('settings_gear-0')} alt="" width={32} height={32} unoptimized /><span>{desktop('settings.title')}</span></button>
                  <div className="start-menu-separator" />
                  <button className="start-menu-item start-menu-shutdown" type="button" onClick={() => {setIsStartMenuOpen(false); setIsShutdown(true);}}><Image src={iconPath('shut_down_with_computer-0')} alt="" width={32} height={32} unoptimized /><span>{desktop('startLinks.shutdown')}</span></button>
                </div>
              </section>
            ) : null}

            <div className="taskbar-time" aria-label={desktop('taskbar.systemTray')}>
              <Image src={iconPath('loudspeaker_muted-0')} alt="" width={16} height={16} unoptimized title={desktop('audioUnavailable')} />
              <span className="time-text" suppressHydrationWarning>{new Intl.DateTimeFormat(currentLocale === 'fr' ? 'fr-FR' : 'en-US', {hour: '2-digit', minute: '2-digit'}).format(new Date())}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="shutdown-screen">
          <Image src={iconPath('shut_down_with_computer-0')} alt="" width={64} height={64} unoptimized />
          <p>{desktop('startLinks.shutdownMessage')}</p>
          <button type="button" className="button-retro" onClick={() => setIsShutdown(false)}>{desktop('startLinks.restart')}</button>
        </div>
      )}
    </div>
    </DesktopWindowContext.Provider>
  );
}
