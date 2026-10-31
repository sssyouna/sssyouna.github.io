import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {NavigationMenu} from './navigation-menu';

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({locale}: SiteHeaderProps) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="font-semibold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Younass.me
        </Link>
        <NavigationMenu locale={locale} />
      </div>
    </header>
  );
}
