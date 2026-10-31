'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {usePathname as useNextPathname} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';

type NavigationMenuProps = {
  locale: Locale;
};

const links = [
  {href: '/', key: 'home'},
  {href: '/about', key: 'about'},
  {href: '/experience', key: 'experience'},
  {href: '/projects', key: 'projects'},
  {href: '/achievements', key: 'achievements'},
  {href: '/contact', key: 'contact'}
] as const;

export function NavigationMenu({locale}: NavigationMenuProps) {
  const t = useTranslations('Navigation');
  const localizedPathname = useNextPathname();
  const pathname =
    localizedPathname.replace(/^\/(?:en|fr)(?=\/|$)/, '') || '/';
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <nav aria-label={t('primary')} className="hidden items-center gap-6 md:flex">
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
        <Link
          href={pathname}
          locale={locale === 'en' ? 'fr' : 'en'}
          className="nav-link border-l border-border pl-6"
        >
          {t('switchLanguage')}
        </Link>
      </nav>

      <div className="flex items-center gap-4 md:hidden">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="menu-button"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">
            {isOpen ? t('closeMenu') : t('openMenu')}
          </span>
          <span aria-hidden="true" className="menu-icon">
            {isOpen ? '×' : '☰'}
          </span>
        </button>
      </div>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          aria-label={t('primary')}
          className="mobile-navigation"
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
          <Link
            href={pathname}
            locale={locale === 'en' ? 'fr' : 'en'}
            className="mobile-nav-link border-t border-border pt-4"
            onClick={() => setIsOpen(false)}
          >
            {t('switchLanguage')}
          </Link>
        </nav>
      ) : null}
    </>
  );
}
