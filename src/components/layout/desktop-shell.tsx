'use client';

import {useEffect, useState, type ReactNode} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';

const shortcuts = [
  {href: '/', key: 'home', icon: '⌂'},
  {href: '/about', key: 'about', icon: '▣'},
  {href: '/experience', key: 'experience', icon: '▤'},
  {href: '/projects', key: 'projects', icon: '▧'},
  {href: '/achievements', key: 'achievements', icon: '★'},
  {href: '/contact', key: 'contact', icon: '✉'}
] as const;

export function DesktopShell({
  children,
  locale
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () =>
      setTime(new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: '2-digit'}).format(new Date()));
    updateTime();
    const timer = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(timer);
  }, [locale]);

  useEffect(() => {
    setMinimized(false);
    setStartMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!startMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setStartMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [startMenuOpen]);

  return (
    <>
      <nav className="desktop-icons" aria-label={t('desktopShortcuts')}>
        {shortcuts.map(({href, key, icon}) => (
          <Link key={href} href={href} className="desktop-icon-link" aria-current={pathname === href ? 'page' : undefined}>
            <span className="desktop-icon-glyph" aria-hidden="true">{icon}</span>
            <span>{t(key)}</span>
          </Link>
        ))}
      </nav>

      <div className={`portfolio-desktop-content${minimized ? ' portfolio-desktop-content-minimized' : ''}`}>
        {children}
      </div>

      <div className="desktop-taskbar">
        <button
          className={`desktop-start-button${startMenuOpen ? ' desktop-start-button-active' : ''}`}
          type="button"
          aria-expanded={startMenuOpen}
          aria-controls={startMenuOpen ? 'desktop-start-menu' : undefined}
          onClick={() => setStartMenuOpen((open) => !open)}
        >
          <span className="windows-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>{t('start')}</span>
        </button>

        <button
          className={`taskbar-window-button${minimized ? '' : ' taskbar-window-button-active'}`}
          type="button"
          aria-label={minimized ? t('restoreWindow') : t('minimizeWindow')}
          aria-pressed={!minimized}
          onClick={() => setMinimized((value) => !value)}
        >
          <span className="taskbar-window-glyph" aria-hidden="true">▣</span>
          <span>{t('portfolioWindow')}</span>
        </button>

        <div className="desktop-system-tray">
          <span className="tray-status" aria-hidden="true">▴</span>
          <time className="taskbar-clock" suppressHydrationWarning>{time}</time>
        </div>

        {startMenuOpen ? (
          <>
            <button className="start-menu-dismiss" type="button" aria-label={t('closeStartMenu')} onClick={() => setStartMenuOpen(false)} />
            <section className="desktop-start-menu" id="desktop-start-menu" aria-label={t('startMenu')}>
              <div className="desktop-start-menu-brand"><span>YOUNASS</span><b>.ME</b></div>
              <div className="desktop-start-menu-items">
                {shortcuts.map(({href, key, icon}) => (
                  <Link key={href} href={href} className="desktop-start-menu-item" onClick={() => setStartMenuOpen(false)}>
                    <span className="start-menu-glyph" aria-hidden="true">{icon}</span>
                    <span>{t(key)}</span>
                  </Link>
                ))}
              </div>
              <div className="desktop-start-menu-footer">{t('desktopPortfolio')}</div>
            </section>
          </>
        ) : null}
      </div>
    </>
  );
}
