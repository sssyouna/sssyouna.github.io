import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export function TemplateWindow({
  title,
  icon,
  statusLeft,
  statusRight,
  children
}: {
  title: string;
  icon: string;
  statusLeft: string;
  statusRight?: string;
  children: React.ReactNode;
}) {
  const t = useTranslations('Desktop');

  return (
    <div className="window template-route-window">
      <div className="window-header">
        <Link href="/" className="template-window-home">{icon} {title}</Link>
        <div className="window-controls" aria-hidden="true">
          <span>_</span><span>□</span><span>×</span>
        </div>
      </div>
      <div className="menu-bar">
        <span><u>{t('windowFile')[0]}</u>{t('windowFile').slice(1)}</span>
        <span><u>{t('windowEdit')[0]}</u>{t('windowEdit').slice(1)}</span>
        <span><u>{t('windowView')[0]}</u>{t('windowView').slice(1)}</span>
        <span><u>{t('windowHelp')[0]}</u>{t('windowHelp').slice(1)}</span>
      </div>
      <div className="window-content template-route-content">{children}</div>
      <div className="status-bar">
        <span>{statusLeft}</span>
        <span>{statusRight ?? t('ready')}</span>
      </div>
    </div>
  );
}
