'use client';

import type React from 'react';
import {useRef} from 'react';

export function MagneticLink({children, className = ''}: {children: React.ReactNode; className?: string}) {
  const ref = useRef<HTMLSpanElement>(null);

  function handleMove(event: React.PointerEvent<HTMLSpanElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const element = ref.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
    element.style.setProperty('--magnetic-x', `${x}px`);
    element.style.setProperty('--magnetic-y', `${y}px`);
  }

  return (
    <span ref={ref} className={`magnetic-link ${className}`} onPointerMove={handleMove} onPointerLeave={() => {
      ref.current?.style.setProperty('--magnetic-x', '0px');
      ref.current?.style.setProperty('--magnetic-y', '0px');
    }}>
      {children}
    </span>
  );
}
