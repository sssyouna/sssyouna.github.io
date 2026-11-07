'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {usePathname as useNextPathname} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {portfolioFiles} from '@/content/assets';

type NavigationMenuProps = {
  locale: Locale;
  hasResume: boolean;
};

const links = [
  {href: '/', key: 'home'},
  {href: '/about', key: 'about'},
  {href: '/experience', key: 'experience'},
  {href: '/projects', key: 'projects'},
  {href: '/achievements', key: 'achievements'},
  {href: '/contact', key: 'contact'}
] as const;

export function NavigationMenu({locale, hasResume}: NavigationMenuProps) {
  const t = useTranslations('Navigation');
  const localizedPathname = useNextPathname();
  const pathname = localizedPathname.replace(/^\/(?:en|fr)(?=\/|$)/, '') || '/';
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const languageLink = (className: string, onClick?: () => void) => (
    <Link
      href={pathname}
      locale={locale === 'en' ? 'fr' : 'en'}
      className={className}
      onClick={onClick}
    >
      {t('switchLanguage')}
    </Link>
  );

  const resumeLink = (className: string, mobile = false) =>
    hasResume ? (
      <a
        href={portfolioFiles.resume}
        download
        className={className}
        onClick={mobile ? () => setIsOpen(false) : undefined}
      >
        {t('downloadCv')}
        <span aria-hidden="true"> ↓</span>
      </a>
    ) : null;

  return (
    <>
      <nav aria-label={t('primary')} className="desktop-navigation">
        {links.map(({href, key}) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? 'page' : undefined}
            className={`nav-link ${isActive(href) ? 'nav-link-active' : ''}`}
          >
            {t(key)}
          </Link>
        ))}
        {languageLink('nav-link language-link')}
        {resumeLink('nav-cv-link')}
      </nav>

      <div className="mobile-menu-control">
        {languageLink('nav-link mobile-language-link')}
        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="menu-button"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">
            {isOpen ? t('closeMenu') : t('openMenu')}
          </span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="menu-icon">
            {isOpen ? (
              <path d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label={t('primary')}
        className="mobile-navigation"
        hidden={!isOpen}
      >
        {links.map(({href, key}) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? 'page' : undefined}
            className={`mobile-nav-link ${isActive(href) ? 'nav-link-active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            {t(key)}
          </Link>
        ))}
        {languageLink('mobile-nav-link border-t border-border pt-4', () => setIsOpen(false))}
        {resumeLink('mobile-nav-link mobile-cv-link', true)}
      </nav>
    </>
  );
}
