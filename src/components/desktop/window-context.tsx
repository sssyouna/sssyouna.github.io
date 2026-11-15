'use client';

import {createContext, useContext} from 'react';
import type {WindowState} from './window-frame';

type RouteWindow = WindowState & {id: string; title: string; icon: string};

export const DesktopWindowContext = createContext<{
  routeWindow?: RouteWindow;
  activeId: string;
  order: number;
  registerRoute: (id: string, title: string, icon: string) => void;
  focus: (id: string) => void;
  close: (id: string) => void;
  minimize: (id: string) => void;
  maximize: (id: string) => void;
} | null>(null);

export function useDesktopWindows() {
  const context = useContext(DesktopWindowContext);
  if (!context) throw new Error('Desktop windows must be inside DesktopShell');
  return context;
}
