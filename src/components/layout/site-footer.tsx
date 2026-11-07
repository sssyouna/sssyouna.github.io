import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {profile} from '@/content/profile';

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
    <footer className="retro-footer">
      <div className="footer-layout mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <div>
          <Link href="/" className="retro-footer-brand">
            YOUNASS
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-foreground-muted">
            {t('Footer.description')}
          </p>
          <a className="inline-link mt-5" href={profile.github} target="_blank" rel="noreferrer">
            {t('Footer.github')} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <nav aria-label={t('Navigation.primary')} className="footer-navigation">
          {navigation.map(({href, key}) => (
            <Link key={href} href={href} className="nav-link">
              {t(`Navigation.${key}`)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="footer-copyright retro-statusbar mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
          {t('Footer.copyright', {year})}
        </div>
      </div>
    </footer>
  );
}
