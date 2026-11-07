import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {NavigationMenu} from './navigation-menu';

type SiteHeaderProps = {
  locale: Locale;
  hasResume: boolean;
};

export function SiteHeader({locale, hasResume}: SiteHeaderProps) {
  return (
    <header className="retro-header">
      <div className="retro-window retro-header-window">
        <div className="retro-titlebar">
          <Link
            href="/"
            aria-label={locale === 'fr' ? 'Younass, accueil' : 'Younass, home'}
            className="retro-brand"
          >
            YOUNASS.ME
          </Link>
          <div className="retro-window-controls" aria-hidden="true">
            <span>_</span><span>□</span><span>×</span>
          </div>
        </div>
        <div className="retro-menu-bar">
          <span><u>F</u>ile</span>
          <span><u>V</u>iew</span>
          <span><u>H</u>elp</span>
        </div>
      </div>
      <div className="retro-nav-wrap">
        <Link
          href="/"
          aria-label={locale === 'fr' ? 'Younass, accueil' : 'Younass, home'}
          className="retro-nav-brand"
        >
          YOUNASS
        </Link>
        <NavigationMenu locale={locale} hasResume={hasResume} />
      </div>
    </header>
  );
}
