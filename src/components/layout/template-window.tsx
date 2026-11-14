'use client';

import {useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {usePathname} from '@/i18n/navigation';
import {WindowFrame} from '@/components/desktop/window-frame';
import {useDesktopWindows} from '@/components/desktop/window-context';

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
  const pathname = usePathname();
  const id = `route:${pathname}`;
  const {routeWindow, activeId, order, registerRoute, focus, close, minimize, maximize} = useDesktopWindows();

  useEffect(() => registerRoute(id, title, icon), [id, title, icon, registerRoute]);

  // Keep the server-rendered page content available before hydration.
  const state = routeWindow?.id === id ? routeWindow : {minimized: false, maximized: false};

  return (
    <WindowFrame title={title} icon={<span aria-hidden="true">{icon}</span>} state={state}
      className="template-route-window" focused={activeId === id} order={order}
      onFocus={() => focus(id)} onClose={() => close(id)}
      onMinimize={() => minimize(id)} onMaximize={() => maximize(id)}>
      <div className="menu-bar">
        <span><u>{t('windowFile')[0]}</u>{t('windowFile').slice(1)}</span>
        <span><u>{t('windowEdit')[0]}</u>{t('windowEdit').slice(1)}</span>
        <span><u>{t('windowView')[0]}</u>{t('windowView').slice(1)}</span>
        <span><u>{t('windowHelp')[0]}</u>{t('windowHelp').slice(1)}</span>
      </div>
      <div className="window-content template-route-content route-window-content">{children}</div>
      <div className="status-bar">
        <span>{statusLeft}</span>
        <span>{statusRight ?? t('ready')}</span>
      </div>
    </WindowFrame>
  );
}
