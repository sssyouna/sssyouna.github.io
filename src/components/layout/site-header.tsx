import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {NavigationMenu} from './navigation-menu';

type SiteHeaderProps = {
  locale: Locale;
  hasResume: boolean;
};

export function SiteHeader({locale, hasResume}: SiteHeaderProps) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label={locale === 'fr' ? 'Younass, accueil' : 'Younass, home'}
          className="font-semibold tracking-[0.18em] text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          YOUNASS
        </Link>
        <NavigationMenu locale={locale} hasResume={hasResume} />
      </div>
    </header>
  );
}
