import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({locale}: SiteHeaderProps) {
  const t = useTranslations('Navigation');

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="font-semibold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Younass.me
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          <Link href="/about" className="nav-link">{t('about')}</Link>
          <Link href="/experience" className="nav-link">{t('experience')}</Link>
          <Link href="/projects" className="nav-link">{t('projects')}</Link>
          <Link href="/achievements" className="nav-link">{t('achievements')}</Link>
          <Link href="/contact" className="nav-link">{t('contact')}</Link>
        </nav>
        <Link
          href="/"
          locale={locale === 'en' ? 'fr' : 'en'}
          className="nav-link"
        >
          {t('switchLanguage')}
        </Link>
      </div>
    </header>
  );
}
