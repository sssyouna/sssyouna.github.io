import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

const navigation = [
  {href: '/', key: 'home'},
  {href: '/about', key: 'about'},
  {href: '/experience', key: 'experience'},
  {href: '/projects', key: 'projects'},
  {href: '/achievements', key: 'achievements'},
  {href: '/contact', key: 'contact'}
] as const;

export function SiteFooter() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr] lg:px-10">
        <div>
          <Link href="/" className="font-semibold tracking-tight text-foreground">
            Younass.me
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-foreground-muted">
            {t('Footer.description')}
          </p>
          <p className="mt-4 text-sm text-foreground-muted">
            {t('Footer.socials')}
          </p>
        </div>
        <nav aria-label={t('Navigation.primary')} className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 md:grid-cols-2">
          {navigation.map(({href, key}) => (
            <Link key={href} href={href} className="nav-link">
              {t(`Navigation.${key}`)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-5 text-xs text-foreground-muted sm:px-8 lg:px-10">
          {t('Footer.copyright', {year})}
        </div>
      </div>
    </footer>
  );
}
