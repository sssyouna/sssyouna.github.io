'use client';

import {useTranslations} from 'next-intl';
import type {ReactNode} from 'react';

export type WindowState = {
  minimized: boolean;
  maximized: boolean;
};

export function WindowFrame({
  title, icon, state, focused, order, className = '', onFocus, onClose,
  onMinimize, onMaximize, children
}: {
  title: string;
  icon: ReactNode;
  state: WindowState;
  focused: boolean;
  order: number;
  className?: string;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: ReactNode;
}) {
  const t = useTranslations('Desktop');
  return (
    <section
      className={`window desktop-managed-window ${className}${state.maximized ? ' desktop-window-maximized' : ''}${focused ? ' desktop-window-focused' : ''}`}
      role="dialog"
      aria-label={title}
      aria-modal="false"
      data-active={focused}
      hidden={state.minimized}
      style={{zIndex: order + 100}}
      onPointerDownCapture={onFocus}
      onFocusCapture={onFocus}
    >
      <div className="window-header desktop-window-titlebar" onDoubleClick={(event) => {
        if (!(event.target as HTMLElement).closest('button, a')) onMaximize();
      }}>
        <span className="desktop-window-title">{icon}{title}</span>
        <div className="window-controls desktop-window-controls">
          <button type="button" aria-label={t('window.minimize')} title={t('window.minimize')} onClick={onMinimize}>_</button>
          <button type="button" aria-label={t(state.maximized ? 'window.restore' : 'window.maximize')} title={t(state.maximized ? 'window.restore' : 'window.maximize')} onClick={onMaximize}>{state.maximized ? '❐' : '□'}</button>
          <button type="button" aria-label={t('window.close')} title={t('window.close')} onClick={onClose}>×</button>
        </div>
      </div>
      {children}
    </section>
  );
}
